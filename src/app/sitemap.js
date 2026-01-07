import { getLatestNews } from '@/lib/rss';
import { STOCK_DATA } from '@/data/stocks';
import { MONEY_LONGTAIL_DATA } from '@/data/moneyLongtailData';

export default async function sitemap() {
    let news = [];
    try {
        news = await getLatestNews();
    } catch (error) {
        console.error("⚠️ Sitemap News Fetch Failed (Build continues):", error);
    }
    const baseUrl = 'https://info.stac100.com';

// 0. SEO Target Pages (Automated from Data Factory)
const seoPages = [];

Object.entries(MONEY_LONGTAIL_DATA ?? {}).forEach(([category, slugs]) => {
  const slugList = Array.isArray(slugs)
    ? slugs
    : Object.keys(slugs ?? {});

  slugList.forEach((slug) => {
    let priority = 0.8;
    if (['us-stocks', 'dividend'].includes(category)) priority = 1.0;
    else if (['etf', 'forecast'].includes(category)) priority = 0.9;

    seoPages.push({
      url: `${baseUrl}/money/${category}/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority,
    });
  });
});

console.log(`✅ Sitemap: Added ${seoPages.length} SEO priority pages.`);
console.log(`✅ Sitemap money sample:`, seoPages.slice(0, 5).map(x => x.url));


    // 1. Static Routes
    const staticRoutes = ['', '/stock', '/domestic', '/overseas', '/guide', '/about', '/privacy', '/disclaimer'].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
    }));

    // 2. Stock Hub Routes (High Priority)
    const stockRoutes = Object.keys(STOCK_DATA).map((symbol) => ({
        url: `${baseUrl}/stock/${symbol}`,
        lastModified: new Date(),
        changeFrequency: 'hourly',
        priority: 1.0,
    }));

    // 3. News Routes
    const newsRoutes = news.map((item) => ({
        url: `${baseUrl}/news/${item.id}`,
        lastModified: new Date(item.pubDate),
        changeFrequency: 'never', // News doesn't change after publish
        priority: 0.7,
    }));

    return [...seoPages, ...staticRoutes, ...stockRoutes, ...newsRoutes];
}

