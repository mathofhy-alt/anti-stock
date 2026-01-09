
const Parser = require('rss-parser');
const parser = new Parser();

const FEEDS = [
    { name: '구글뉴스', url: "https://news.google.com/rss?hl=ko&gl=KR&ceid=KR:ko" },
    { name: '매일경제', url: 'https://www.mk.co.kr/rss/30000001/' },
    { name: 'JTBC', url: 'https://fs.jtbc.joins.com/RSS/newsflash.xml' },
    { name: '한국경제', url: 'https://www.hankyung.com/feed/finance' },
    { name: '머니투데이', url: 'http://rss.moneytoday.co.kr/mt_news.xml' },
    { name: '이데일리', url: 'http://rss.edaily.co.kr/stock_news.xml' },
    { name: '지디넷', url: 'http://feeds.feedburner.com/zdkorea' },
    { name: '전자신문', url: 'https://rss.etnews.com/Section902.xml' }
];

async function testFeeds() {
    const parser = new Parser({
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' },
        customFields: {
            item: [
                ['media:content', 'media:content', { keepArray: true }],
                ['media:thumbnail', 'media:thumbnail'],
                ['enclosure', 'enclosure'],
                ['image', 'image'],
            ]
        }
    });

    for (const feed of FEEDS) {
        try {
            console.log(`\n--- Fetching: ${feed.name} (${feed.url}) ---`);
            const feedData = await parser.parseURL(feed.url);
            console.log(`Title: ${feedData.title}`);

            feedData.items.slice(0, 3).forEach(item => {
                let img = null;
                if (item['media:content']) {
                    const media = Array.isArray(item['media:content']) ? item['media:content'][0] : item['media:content'];
                    img = media.$?.url || media.url;
                } else if (item.enclosure?.url) {
                    img = item.enclosure.url;
                } else if (item['media:thumbnail'] || item.image) {
                    const thumb = item['media:thumbnail'] || item.image;
                    img = thumb.$?.url || thumb.url || (typeof thumb === 'string' ? thumb : null);
                }

                if (!img) {
                    const content = item['content:encoded'] || item.content || item.description || "";
                    const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
                    if (imgMatch && imgMatch[1].startsWith('http')) img = imgMatch[1];
                }

                console.log(`- [${item.isoDate}] ${item.title}`);
                if (img) console.log(`  📸 Image: ${img}`);
            });
        } catch (e) {
            console.error(`Error: ${e.message}`);
        }
    }
}

testFeeds();
