
const Parser = require('rss-parser');
const parser = new Parser();

const FEEDS = [
    "https://news.google.com/rss?hl=ko&gl=KR&ceid=KR:ko",
    "https://www.mk.co.kr/rss/30000001/",
    "https://fs.jtbc.co.kr/RSS/newsflash.xml",
    "https://rss.hankyung.com/feed/market.xml"
];

async function testFeeds() {
    for (const url of FEEDS) {
        try {
            console.log(`\n--- Fetching: ${url} ---`);
            const feed = await parser.parseURL(url);
            console.log(`Title: ${feed.title}`);
            feed.items.slice(0, 3).forEach(item => {
                console.log(`- [${item.isoDate}] ${item.title}`);
            });
        } catch (e) {
            console.error(`Error: ${e.message}`);
        }
    }
}

testFeeds();
