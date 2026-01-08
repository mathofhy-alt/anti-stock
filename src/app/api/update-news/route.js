import { supabaseAdmin } from '@/lib/supabase-admin';
import Parser from 'rss-parser';
import slugify from 'slugify';
import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';
import crypto from 'crypto';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const maxDuration = 60; // Extend timeout for scraping & AI
export const dynamic = 'force-dynamic';

// Constants
const GOOGLE_NEWS_KR = "https://news.google.com/rss?hl=ko&gl=KR&ceid=KR:ko";
const DOMESTIC_FEEDS = [
    { name: '매일경제', url: 'https://www.mk.co.kr/rss/30000001/' },
    { name: 'JTBC', url: 'https://fs.jtbc.co.kr/RSS/newsflash.xml' },
    { name: '한경', url: 'https://rss.hankyung.com/feed/market.xml' },
    { name: '머니투데이', url: 'https://rss.mt.co.kr/mt_section.xml?cid=stock' },
    { name: '이데일리', url: 'https://rss.edaily.co.kr/stock_news.xml' },
    { name: '지디넷', url: 'https://zdnet.co.kr/rss/zdnet.xml' },
    { name: '전자신문', url: 'https://rss.etnews.com/Section902.xml' }
];

// Helper: SHA256 Hash
function generateHash(str) {
    return crypto.createHash('sha256').update(str).digest('hex');
}

// Helper: Fetch Full Content
async function fetchArticleContent(url) {
    try {
        const res = await fetch(url, {
            headers: { 'User-Agent': 'Mozilla/5.0 (compatible; AntiStockBot/1.0;)' },
            next: { revalidate: 3600 }
        });
        if (!res.ok) return null;
        const html = await res.text();
        const $ = cheerio.load(html);

        // Remove unwanted elements
        $('script, style, nav, footer, header, advertisement, .ad, .advertisement').remove();

        // Strategy: Look for common article body containers
        let content = '';
        const selectors = [
            'article', '[itemprop="articleBody"]', '.article-body', '.news_body', '#articleBody',
            '.news_view', '#newsView', '.art_body', '.read_body'
        ];

        for (const selector of selectors) {
            const el = $(selector);
            if (el.length > 0) {
                el.find('p').each((i, p) => {
                    const text = $(p).text().trim();
                    if (text.length > 20) content += `<p>${text}</p>\n`;
                });
                break;
            }
        }

        // Fallback
        if (content.length < 100) {
            $('body p').each((i, p) => {
                const text = $(p).text().trim();
                if (text.length > 40) content += `<p>${text}</p>\n`;
            });
        }

        return content.length > 100 ? content : null;
    } catch (e) {
        console.warn(`Scrape failed for ${url}:`, e.message);
        return null; // Fallback to summary
    }
}

// Helper: Generate AI Commentary
async function generateAICommentary(newsItem) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return null;

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
        You are an expert investment analyst. Analyze the following news content and provide a structured summary for investors.
        
        News Title: ${newsItem.title}
        Content: ${newsItem.content?.slice(0, 3000) || newsItem.summary}

        Output format (Markdown):
        ## 한줄 요약
        (One sentence conclusion from an investor's perspective)

        ## 왜 중요한가?
        (3-4 sentences explaining the market impact)

        ## 투자자 체크리스트
        - (Actionable item 1)
        - (Actionable item 2)
        - (Actionable item 3)

        ## 리스크 요인
        - (Risk 1)
        - (Risk 2)

        ## 관련 키워드
        #Keyword1 #Keyword2 #Keyword3
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (e) {
        console.error("Gemini Gen Error:", e);
        return null;
    }
}

// Helper: Send Telegram Message
async function sendTelegramMessage(item, summary) {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) return;

    try {
        const oneLine = summary.match(/한줄 요약\n(.*)/)?.[1] || item.title;
        // Clean markdown/html from summary if needed, but here we just take the line
        // Telegram supports basic HTML: b, i, a, code, pre
        const cleanOneLine = oneLine.replace(/[*_`]/g, '').trim();

        const message = `
🚨 <b>[${item.source}] 속보 알림</b>

📰 <b>${item.title}</b>

💡 <b>AI 한줄 요약</b>:
${cleanOneLine}

👉 <a href="https://info.stac100.com/news/${item.slug}">자세히 보기 (AI 분석 전문)</a>
        `.trim();

        await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'HTML',
                disable_web_page_preview: false
            })
        });
    } catch (e) {
        console.error('Telegram Send Error:', e);
    }
}

export async function GET(request) {
    // 1. Verify Secret
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');
    if (secret !== process.env.UPDATE_NEWS_SECRET) {
        if (process.env.NODE_ENV !== 'development') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
    }

    const parser = new Parser();
    let insertedCount = 0;
    let skippedCount = 0;
    let generatedCount = 0;
    const errors = [];

    // Helper: Analyze content
    const analyzeNews = (text) => {
        let region = 'Domestic';
        if (text.match(/미국|나스닥|다우|s&p|연준|테슬라|엔비디아|애플|마소/i)) region = 'Overseas';

        const tags = [];
        if (text.match(/반도체|삼성전자|sk하이닉스|hbm/i)) tags.push('반도체');
        if (text.match(/2차전지|배터리|에코프로|lges/i)) tags.push('2차전지');
        if (text.match(/자동차|현대차|기아/i)) tags.push('자동차');
        if (text.match(/바이오|셀트리온|hlb/i)) tags.push('바이오');
        if (text.match(/ai|인공지능|로봇|llm/i)) tags.push('AI');
        if (text.match(/금융|은행|금리|환율/i)) tags.push('금융');

        let sentiment = 'neutral';
        if (text.match(/상승|급등|호조|개선|최고|기대|매수/)) sentiment = 'positive';
        if (text.match(/하락|급락|우려|침체|위기|손실|매도/)) sentiment = 'negative';

        return { region, tags, sentiment };
    };

    try {
        // === Phase 1: Ingestion ===
        const allFeeds = [{ name: '구글뉴스', url: GOOGLE_NEWS_KR }, ...DOMESTIC_FEEDS];

        for (const feed of allFeeds) {
            try {
                const feedData = await parser.parseURL(feed.url);
                const recentItems = feedData.items.slice(0, 5);

                for (const item of recentItems) {
                    if (!item.link) continue;

                    const hash = generateHash(item.link);
                    const { data: existing } = await supabaseAdmin
                        .from('news')
                        .select('id')
                        .eq('hash', hash)
                        .single();

                    if (existing) {
                        skippedCount++;
                        continue;
                    }

                    const fullContent = await fetchArticleContent(item.link);
                    const finalContent = fullContent || item.content || item.contentSnippet || "";

                    const analysisText = (item.title + " " + (item.contentSnippet || "") + " " + finalContent).toLowerCase();
                    const { region, tags, sentiment } = analyzeNews(analysisText);

                    let rawSlug = `${feed.name}-${item.isoDate || new Date().toISOString()}-${item.title}`;
                    const safeSlug = slugify(rawSlug, { lower: true, strict: true, remove: /[*+~.()'"!:@]/g }).slice(0, 100);

                    const { error } = await supabaseAdmin
                        .from('news')
                        .insert({
                            slug: safeSlug,
                            title: item.title,
                            url: item.link,
                            hash: hash,
                            source: feed.name,
                            region: region,
                            tags: tags,
                            sector: tags[0] || null,
                            summary: item.contentSnippet?.slice(0, 500) || '',
                            content: finalContent,
                            importance: sentiment,
                            published_at: item.isoDate ? new Date(item.isoDate) : new Date(),
                            ai_generated: false
                        });

                    if (error) {
                        if (error.code === '23505') {
                            skippedCount++;
                        } else {
                            console.error('Insert Error:', error);
                            errors.push(error.message);
                        }
                    } else {
                        insertedCount++;
                    }
                }
            } catch (err) {
                console.error(`Feed Error (${feed.name}):`, err);
                errors.push(`${feed.name}: ${err.message}`);
            }
        }

        // === Phase 2: AI Generation ===
        if (process.env.GEMINI_API_KEY) {
            const { data: pendingItems } = await supabaseAdmin
                .from('news')
                .select('*')
                .eq('ai_generated', false)
                .not('content', 'is', null)
                .limit(5);

            if (pendingItems && pendingItems.length > 0) {
                for (const item of pendingItems) {
                    const commentary = await generateAICommentary(item);
                    if (commentary) {
                        await supabaseAdmin
                            .from('news')
                            .update({
                                summary: commentary,
                                ai_generated: true
                            })
                            .eq('id', item.id);

                        // Telegram Broadcast
                        await sendTelegramMessage(item, commentary);

                        generatedCount++;
                    }
                }
            }
        }

        return NextResponse.json({
            success: true,
            inserted: insertedCount,
            skipped: skippedCount,
            generated: generatedCount,
            errors: errors
        });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
