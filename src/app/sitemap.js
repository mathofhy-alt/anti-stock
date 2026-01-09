import { getLatestNews } from '@/lib/rss';
import { STOCK_DATA } from '@/data/stocks';
import { MONEY_LONGTAIL_DATA } from '@/data/moneyLongtailData';

export default async function sitemap() {
  let news = [];
  try {
    const fetchedNews = await getLatestNews();
    if (Array.isArray(fetchedNews)) {
      news = fetchedNews;
    } else {
      console.error("⚠️ Sitemap News Data Invalid (Not Array):", fetchedNews);
    }
  } catch (error) {
    console.error("⚠️ Sitemap News Fetch Failed (Build continues):", error);
  }

  const baseUrl = 'https://info.stac100.com';

  // 0. SEO Target Pages (Automated from Data Factory)
  const seoPages = [];

  try {
    Object.entries(MONEY_LONGTAIL_DATA ?? {}).forEach(([category, slugs]) => {
      // slugs is an object { key: { ...data } }
      if (!slugs) return;
      Object.entries(slugs).forEach(([slug, data]) => {
        let priority = 0.8;
        let changeFrequency = 'monthly';

        // Commercial Intent Logic
        if (data.commercialIntent === 'high') {
          priority = 1.0;
          changeFrequency = 'weekly';
        } else if (data.commercialIntent === 'mid') {
          priority = 0.9;
          changeFrequency = 'weekly';
        } else {
          // Category Fallback
          if (['us-stocks', 'dividend'].includes(category)) priority = 0.8;
        }

        seoPages.push({
          url: `${baseUrl}/money/${category}/${slug}`,
          lastModified: new Date(),
          changeFrequency,
          priority,
        });
      });
    });
  } catch (err) {
    console.error("⚠️ Sitemap Money Data Process Error:", err);
  }

  // Calculate stats
  const highValueCount = seoPages.filter(p => p.priority === 1.0).length;
  console.log(`✅ [Sitemap] Money Pages: ${seoPages.length} (Priority 1.0: ${highValueCount})`);

  // 1. Static Routes
  const staticRoutes = ['', '/news', '/topic', '/stock', '/domestic', '/overseas', '/guide', '/about', '/privacy', '/disclaimer'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.9,
  }));

  // 2. Stock Hub Routes (High Priority)
  const stockKeys = Object.keys(STOCK_DATA || {});
  const stockRoutes = stockKeys.map((symbol) => ({
    url: `${baseUrl}/stock/${symbol}`,
    lastModified: new Date(),
    changeFrequency: 'hourly',
    priority: 1.0,
  }));

  console.log(`✅ [Sitemap] Stock Pages: ${stockRoutes.length}`);

  // 3. News Routes
  const newsRoutes = news.map((item) => ({
    url: `${baseUrl}/news/${item.id}`,
    lastModified: item.pubDate ? new Date(item.pubDate) : new Date(),
    changeFrequency: 'never', // News doesn't change after publish
    priority: 0.7,
  }));

  console.log(`✅ [Sitemap] News Pages: ${newsRoutes.length}`);
  console.log(`✅ [Sitemap] Total URLs: ${seoPages.length + staticRoutes.length + stockRoutes.length + newsRoutes.length}`);

  return [...seoPages, ...staticRoutes, ...stockRoutes, ...newsRoutes];
}
