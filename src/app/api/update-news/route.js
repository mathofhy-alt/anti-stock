import { supabaseAdmin } from '@/lib/supabase-admin';
import Parser from 'rss-parser';
import slugify from 'slugify';
import { NextResponse } from 'next/server';

// Constants
const GOOGLE_NEWS_KR = "https://news.google.com/rss?hl=ko&gl=KR&ceid=KR:ko";
const DOMESTIC_FEEDS = [
    { name: '매일경제', url: 'https://www.mk.co.kr/rss/30000001/' },
    { name: 'JTBC', url: 'https://fs.jtbc.co.kr/RSS/newsflash.xml' },
];

export async function GET(request) {
    // 1. Verify Secret
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');
    if (secret !== process.env.UPDATE_NEWS_SECRET) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const parser = new Parser();
    let insertedCount = 0;
    let skippedCount = 0;
    const errors = [];

    // Helper: Analyze content
    const analyzeNews = (item) => {
        const text = (item.title + " " + (item.contentSnippet || "")).toLowerCase();
        let region = 'Domestic';
        if (text.match(/미국|나스닥|다우|s&p|연준|테슬라|엔비디아/)) region = 'Overseas';

        const tags = [];
        if (text.match(/반도체|삼성전자|sk하이닉스/)) tags.push('반도체');
        if (text.match(/2차전지|배터리|에코프로/)) tags.push('2차전지');
        if (text.match(/자동차|현대차|기아/)) tags.push('자동차');
        if (text.match(/바이오|셀트리온/)) tags.push('바이오');
        if (text.match(/ai|인공지능|로봇/)) tags.push('AI');
        if (text.match(/금융|은행|금리/)) tags.push('금융');

        // Sentiment Logic (Simple heuristic)
        let sentiment = 'neutral';
        if (text.match(/상승|급등|호조|개선|최고|기대/)) sentiment = 'positive';
        if (text.match(/하락|급락|우려|침체|위기|손실/)) sentiment = 'negative';

        return { region, tags, sentiment };
    };

    // 2. Fetch Cron Logic
    try {
        const allFeeds = [{ name: '구글뉴스', url: GOOGLE_NEWS_KR }, ...DOMESTIC_FEEDS];

        for (const feed of allFeeds) {
            try {
                const feedData = await parser.parseURL(feed.url);
                for (const item of feedData.items) {
                    // Slug Generation
                    let rawSlug = `${feed.name}-${item.isoDate || new Date().toISOString()}-${item.title}`;
                    const safeSlug = slugify(rawSlug, { lower: true, strict: true, remove: /[*+~.()'"!:@]/g });

                    // Classify
                    const { region, tags, sentiment } = analyzeNews(item);

                    // Skip low quality
                    if (!item.title || item.title.length < 5) continue;

                    // Supabase Upsert
                    const { error } = await supabaseAdmin
                        .from('news')
                        .upsert({
                            slug: safeSlug,
                            title: item.title,
                            url: item.link,
                            source: feed.name,
                            region: region, // Maps to 'category' in old JSON
                            tags: tags,
                            summary: item.contentSnippet?.slice(0, 300) || '',
                            importance: sentiment, // Storing sentiment in 'importance' column for now
                            published_at: item.isoDate ? new Date(item.isoDate) : new Date(),
                            sector: tags[0] || null,
                        }, { onConflict: 'url', ignoreDuplicates: true }); // Ignore if URL exists (don't overwrite)

                    if (error) {
                        // console.error('Upsert Error:', error);
                        // Often means URL collision which is fine
                        skippedCount++;
                    } else {
                        insertedCount++;
                    }
                }
            } catch (err) {
                console.error(`Feed Error (${feed.name}):`, err);
                errors.push(`${feed.name}: ${err.message}`);
            }
        }

        return NextResponse.json({
            success: true,
            inserted: insertedCount,
            skipped: skippedCount,
            errors: errors
        });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
