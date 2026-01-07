const Parser = require('rss-parser');
const slugify = require('slugify');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// --- Configuration ---
const DATA_DIR = path.join(process.cwd(), 'src/data');
const DB_PATH = path.join(DATA_DIR, 'news.json');

const NEWS_FEEDS = [
    { url: 'https://rss.hankyung.com/feed/market.xml', type: 'Domestic', source: '한국경제' },
    { url: 'https://mk.co.kr/rss/30100041/', type: 'Domestic', source: '매일경제' },
    { url: 'https://fs.jtbc.joins.com/RSS/economy.xml', type: 'Domestic', source: 'JTBC' },
    { url: 'https://news.google.com/rss/search?q=%EC%A3%BC%EC%8B%9D&hl=ko&gl=KR&ceid=KR%3Ako', type: 'Overseas', source: '구글뉴스' }
];

const SECTORS = {
    '반도체': ['삼성전자', '하이닉스', '반도체', 'D램', '낸드', '파운드리', 'TSMC', '엔비디아', 'HBM'],
    '2차전지': ['LG에너지솔루션', '에코프로', '2차전지', '배터리', '리튬', '양극재', '전기차', '테슬라'],
    '바이오': ['삼성바이오로직스', '셀트리온', '바이오', '임상', 'HLB', '알테오젠', '신약'],
    '금융': ['KB금융', '신한지주', '은행', '금리', '보험', '증권', '밸류업'],
    '에너지': ['유가', '정유', '태양광', '풍력', '원전', '두산에너빌리티', '천연가스'],
    '소비재': ['화장품', '면세점', '여행', '항공', '음식료', 'CJ', '농심']
};

const THEMES = {
    '고배당': ['배당', '금융지주', '리츠', '통신'],
    'IPO': ['공모주', '청약', '상장', '따상'],
    '정책수혜': ['지원', '규제', '정부', '대책', '발표'],
    '실적발표': ['어닝', '영업이익', '매출', '흑자', '적자', '잠정'],
    '거시경제': ['CPI', 'GDP', 'FOMC', '환율', '국채', '인플레이션']
};

const SENTIMENT = {
    positive: ['상승', '급등', '최고', '호조', '성장', '개선', '돌파', '매수', '긍정', '기대', '수혜'],
    negative: ['하락', '급락', '최저', '부진', '적자', '우려', '감소', '위기', '충격', '매도', '불안']
};

// --- Helpers ---
function ensureDirectoryExistence(filePath) {
    const dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
        return true;
    }
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
}

function processItem(item, feedConfig) {
    const title = item.title || "";
    const rawDescription = item.contentSnippet || item.content || item.description || "";
    const cleanDesc = rawDescription.replace(/<[^>]*>?/gm, '').trim();
    const fullText = (title + " " + cleanDesc).toLowerCase();

    // 1. Slug Generation: source-date-title
    // Format Date: YYYYMMDD
    const dateObj = item.pubDate ? new Date(item.pubDate) : new Date();
    const dateStr = dateObj.toISOString().slice(0, 10).replace(/-/g, '');

    // Clean Title for Slug
    const safeTitle = slugify(title, {
        lower: true,
        strict: true,
        locale: 'ko',
        trim: true
    });

    // Source Map
    const sourceMap = { '한국경제': 'hankyung', '매일경제': 'mk', 'JTBC': 'jtbc', '구글뉴스': 'google' };
    const sourceSlug = sourceMap[feedConfig.source] || 'news';

    const newsId = `${sourceSlug}-${dateStr}-${safeTitle}`.slice(0, 100); // Limit length

    // 2. Classification
    let category = feedConfig.type;

    // 3. Tags
    const tags = [];
    [...Object.entries(SECTORS), ...Object.entries(THEMES)].forEach(([key, keywords]) => {
        if (keywords.some(k => fullText.includes(k.toLowerCase()))) {
            tags.push(key);
        }
    });

    // 4. Sentiment
    let score = 0;
    SENTIMENT.positive.forEach(w => { if (fullText.includes(w)) score += 1; });
    SENTIMENT.negative.forEach(w => { if (fullText.includes(w)) score -= 1; });
    const sentiment = score > 0 ? 'positive' : score < 0 ? 'negative' : 'neutral';

    const summary = cleanDesc.length > 500 ? cleanDesc.substring(0, 500) + '...' : cleanDesc;

    return {
        id: newsId, // This is the SLUG
        title: item.title,
        originalLink: item.link,
        pubDate: item.pubDate,
        summary,
        fullDescription: cleanDesc,
        category,
        tags: [...new Set(tags)],
        themes: [...new Set(tags)], // Simplify for now
        sentiment,
        source: feedConfig.source,
        imageUrl: item['media:content']?.['$']?.['url'] || item['media:thumbnail']?.['$']?.['url'] || null
    };
}

async function run() {
    console.log('🔄 Fetching latest news...');
    const parser = new Parser({
        customFields: {
            item: ['media:content', 'media:thumbnail', 'enclosure', 'content:encoded', 'description'],
        },
    });

    // Load existing DB
    let existingNews = [];
    if (fs.existsSync(DB_PATH)) {
        const rawData = fs.readFileSync(DB_PATH);
        existingNews = JSON.parse(rawData);
        console.log(`📦 Loaded ${existingNews.length} existing items.`);
    } else {
        ensureDirectoryExistence(DB_PATH);
    }

    const newItems = [];

    for (const feed of NEWS_FEEDS) {
        try {
            const parsed = await parser.parseURL(feed.url);
            console.log(`✅ Fetched: ${feed.source} (${parsed.items.length})`);

            parsed.items.forEach(item => {
                const processed = processItem(item, feed);
                // Check duplication by ID (Slug) AND Original Link
                const exists = existingNews.some(n => n.id === processed.id) ||
                    existingNews.some(n => n.originalLink === processed.originalLink);

                if (!exists) {
                    newItems.push(processed);
                }
            });
        } catch (e) {
            console.error(`❌ Error fetching ${feed.source}:`, e.message);
        }
    }

    if (newItems.length > 0) {
        // Add new items to front
        const updatedNews = [...newItems, ...existingNews];
        // Sort by date (desc) just in case
        updatedNews.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

        // Write back
        fs.writeFileSync(DB_PATH, JSON.stringify(updatedNews, null, 2));
        console.log(`💾 Saved ${newItems.length} new items. Total: ${updatedNews.length}`);
    } else {
        console.log('😴 No new news found.');
    }
}

run();
