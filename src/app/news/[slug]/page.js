import { getNewsById, getRelatedNews, getLatestNews } from '@/lib/rss';
import NewsCard from '@/components/NewsCard/NewsCard';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import styles from './page.module.css';
import { STOCK_DATA } from '@/data/stocks';
import AdSenseSlot from '@/components/AdSenseSlot/AdSenseSlot';
import ScrollTrigger from '@/components/ScrollTrigger/ScrollTrigger';
import { getContextualMoneyPages } from '@/lib/money-factory';
import ContextualMoneyBlock from '@/components/News/ContextualMoneyBlock';

// Force static generation for these params
export async function generateStaticParams() {
    try {
        const news = await getLatestNews();
        return news.map((item) => ({
            slug: item.id,
        }));
    } catch (err) {
        console.error("⚠️ News Static Generation Failed (Runtime fallback enabled):", err);
        return [];
    }
}

// Revalidate every 60 seconds (ISR) if we want incremental updates
export const revalidate = 60;
export const dynamicParams = true;

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const news = await getNewsById(slug);
    if (!news) return { title: 'News Not Found' };

    // SEO: Meta Description & OG Tags
    const shortSummary = news.summary.slice(0, 160);
    const canonicalUrl = `https://info.stac100.com/news/${news.id}`;

    return {
        title: `${news.title} - 안티-주식`,
        description: shortSummary,
        openGraph: {
            title: news.title,
            description: shortSummary,
            url: canonicalUrl,
            type: 'article',
            siteName: '안티-주식',
            publishedTime: news.pubDate,
            authors: [news.source || 'Anit-Stock AI'],
        },
        alternates: {
            canonical: canonicalUrl,
        }
    };
}

export default async function NewsDetail({ params }) {
    const { slug } = await params;
    const news = await getNewsById(slug);
    const popularNews = await getLatestNews();

    if (!news) {
        // Warning: Debug usage only. Do not deploy to prod long term without styling.
        const allNews = await getLatestNews();
        console.log(`❌ Fail: Slug "${slug}" not found. DB Size: ${allNews.length}`);
        return (
            <div style={{ padding: '50px', color: 'white', textAlign: 'center' }}>
                <h1 style={{ color: 'red' }}>News Data Not Found</h1>
                <p>Requested Slug: <strong>{slug}</strong></p>
                <div style={{ textAlign: 'left', margin: '20px auto', maxWidth: '600px', background: '#333', padding: '20px' }}>
                    <p>Total News in DB: {allNews.length}</p>
                </div>
                <Link href="/" style={{ color: '#00dbbd' }}>Go Home</Link>
            </div>
        );
    }

    const relatedNews = await getRelatedNews(news);
    const shortSummary = news.summary.slice(0, 160);
    const canonicalUrl = `https://info.stac100.com/news/${news.id}`;

    // Contextual Money Guides
    const contextualGuides = getContextualMoneyPages(news.title + " " + (news.content || news.summary));

    // JSON-LD: NewsArticle
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        headline: news.title,
        description: shortSummary,
        datePublished: news.pubDate || new Date().toISOString(),
        dateModified: news.pubDate || new Date().toISOString(),
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': canonicalUrl
        },
        author: {
            '@type': 'Organization',
            name: news.source || '안티-주식'
        },
        publisher: {
            '@type': 'Organization',
            name: '안티-주식',
            logo: {
                '@type': 'ImageObject',
                url: 'https://info.stac100.com/logo.png'
            }
        },
        image: news.imageUrl ? [news.imageUrl] : []
    };

    // Auto-Comment Logic
    const getAutoComment = () => {
        if (news.sentiment === 'positive') return "📈 시장 기대감이 반영된 긍정적인 뉴스입니다. 관련 섹터의 흐름을 주목하세요.";
        if (news.sentiment === 'negative') return "📉 리스크 관리가 필요한 소식입니다. 시장의 변동성에 유의하세요.";
        return "⚖️ 시장에 영향을 줄 수 있는 중립적인 뉴스입니다. 추가적인 분석이 필요합니다.";
    };

    // Match Logic: Check intersection of News Tags & Stock Keywords
    let matchedSymbol = null;
    const newsKeywords = [...(news.tags || []), ...news.title.split(' ')];

    // Find first matching stock
    for (const [symbol, data] of Object.entries(STOCK_DATA)) {
        if (data.keywords.some(k => newsKeywords.some(nk => nk.toLowerCase().includes(k.toLowerCase())))) {
            matchedSymbol = symbol;
            break;
        }
    }

    return (
        <main className={styles.container}>
            {/* JSON-LD Script */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Auto Ads Top - Removed hardcoded, inserted structurally below title as requested */}

            <article className={styles.article}>
                {/* Header: Title & Meta */}
                <div className={styles.header}>
                    <div className={styles.meta}>
                        <span className={styles.source}>{news.source}</span>
                        <span className={styles.date}>
                            {news.pubDate ? formatDistanceToNow(new Date(news.pubDate), { addSuffix: true, locale: ko }) : ''}
                        </span>
                    </div>
                    <h1 className={styles.title}>{news.title}</h1>
                    <AdSenseSlot id="ad-slot-top" />

                    {/* Clickable Tags */}
                    <div className={styles.tags}>
                        {news.tags && news.tags.length > 0 ? (
                            news.tags.map(tag => (
                                <Link key={tag} href={`/topic/${tag}`} className={styles.tag}>
                                    #{tag}
                                </Link>
                            ))
                        ) : (
                            <span className={styles.noTag}>#시장종합</span>
                        )}
                    </div>
                </div>

                {/* AI Insight Box */}
                <div className={styles.insightBox} style={{ background: '#1a2f26', padding: '20px', borderRadius: '12px', marginBottom: '20px', borderLeft: '4px solid #00dbbd' }}>
                    <h3 style={{ margin: '0 0 10px 0', fontSize: '1.1rem', color: '#00dbbd' }}>💡 오늘 이 뉴스가 중요한 이유</h3>
                    <p style={{ margin: 0, lineHeight: 1.6, color: '#e0e0e0', marginBottom: '10px' }}>{getAutoComment()}</p>
                    <div style={{ background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '4px', fontSize: '0.9rem', color: '#88dbbd' }}>
                        ⚡ <strong>한 줄 요약:</strong> {news.title} 이슈 체크 필요
                    </div>
                </div>

                {/* Auto Summary */}
                <div className={styles.summaryBox}>
                    <h3>📝 3줄 자동 요약</h3>
                    <p className={styles.summaryText}>
                        {news.fullDescription || news.summary}
                    </p>
                </div>

                {/* Auto Ads Middle - Replaced with #ad-slot-mid */}
                <AdSenseSlot id="ad-slot-mid" />

                {/* [Contextual Link] Go to Stock Hub - Moved for RPM Optimization */}
                {matchedSymbol && (
                    <div style={{ margin: '20px 0', padding: '15px', background: '#1e1e1e', borderLeft: '4px solid #00dbbd', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <span style={{ color: '#888', fontSize: '0.8rem', display: 'block', marginBottom: '4px' }}>관련 기업 정보</span>
                            <strong style={{ color: '#fff', fontSize: '1rem' }}>{STOCK_DATA[matchedSymbol].name} ({matchedSymbol})</strong>
                        </div>
                        <Link href={`/stock/${matchedSymbol}`} style={{ padding: '8px 16px', background: '#00dbbd', color: '#000', fontWeight: 'bold', borderRadius: '20px', fontSize: '0.9rem' }}>
                            투자 정보 ❯
                        </Link>
                    </div>
                )}

                {/* Content & Link */}
                <div className={styles.content}>
                    <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '20px' }}>
                        * 위 요약은 AI 알고리즘에 의해 자동 생성되었습니다. 상세 내용은 원문을 확인하세요.
                    </p>
                    <a href={news.originalLink} target="_blank" rel="noopener noreferrer" className={styles.outboundButton}>
                        원문 기사 전체보기 🔗
                    </a>

                    {/* [Retention Block] FAQ & Candidates */}
                    <div style={{ marginTop: '40px', borderTop: '1px solid #333', paddingTop: '30px' }}>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '15px' }}>🙋‍♂️ 주식 초보가 많이 묻는 질문</h3>
                        <div style={{ background: '#1e1e1e', padding: '15px', borderRadius: '8px', marginBottom: '10px' }}>
                            <strong style={{ display: 'block', marginBottom: '5px', color: '#fff' }}>Q. 이 뉴스 호재인가요?</strong>
                            <p style={{ margin: 0, fontSize: '0.9rem', color: '#aaa' }}>시장 상황에 따라 다르지만, 일반적으로 실적 개선이나 기술 혁신과 관련된 내용은 호재로 인식됩니다. 단, 이미 주가에 반영되었는지 확인이 필요합니다.</p>
                        </div>
                    </div>

                    <div style={{ marginTop: '30px' }}>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '15px' }}>📈 이 뉴스로 움직일 종목 후보</h3>
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                            {Object.entries(STOCK_DATA).slice(0, 3).map(([key, stock]) => (
                                <Link key={key} href={`/stock/${key}`} style={{ flex: '1 1 150px', background: '#222', padding: '10px', borderRadius: '8px', textAlign: 'center', border: '1px solid #333' }}>
                                    <div style={{ fontSize: '0.9rem', color: '#fff' }}>{stock.name}</div>
                                    <div style={{ fontSize: '0.8rem', color: '#00dbbd' }}>{stock.symbol}</div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </article>

            {/* Auto Ads Bottom - Replaced with #ad-slot-related (Above Related News) */}
            <AdSenseSlot id="ad-slot-related" />

            {/* [Next Content Section] Structural Trap */}
            <section className={styles.related} style={{ background: '#111', padding: '20px 0' }}>

                {/* 1. Related Stock Hubs */}
                <div style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '1.3rem', marginBottom: '20px', borderLeft: '4px solid #00dbbd', paddingLeft: '10px' }}>👀 지금 이 뉴스와 관련된 종목</h2>
                    <div className={styles.grid}>
                        {matchedSymbol && STOCK_DATA[matchedSymbol] && (
                            <Link href={`/stock/${matchedSymbol}`} style={{ display: 'block', background: '#1e1e1e', padding: '20px', borderRadius: '12px', border: '1px solid #333' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                    <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{STOCK_DATA[matchedSymbol].name}</span>
                                    <span style={{ color: '#00dbbd' }}>전체 흐름 보기 →</span>
                                </div>
                                <p style={{ margin: 0, fontSize: '0.9rem', color: '#888' }}>{STOCK_DATA[matchedSymbol].description.slice(0, 50)}...</p>
                            </Link>
                        )}
                        <Link href="/stock/samsung" style={{ display: 'block', background: '#1e1e1e', padding: '20px', borderRadius: '12px', border: '1px solid #333' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>삼성전자</span>
                                <span style={{ color: '#00dbbd' }}>전체 흐름 보기 →</span>
                            </div>
                            <p style={{ margin: 0, fontSize: '0.9rem', color: '#888' }}>대한민국 대표 반도체 기업...</p>
                        </Link>
                    </div>
                </div>

                {/* 2. People Also Read */}
                <div style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '1.3rem', marginBottom: '20px', borderLeft: '4px solid #e0e0e0', paddingLeft: '10px' }}>🔥 사람들이 이 뉴스 다음으로 많이 보는 기사</h2>
                    <div className={styles.grid}>
                        {popularNews.slice(0, 4).map(item => (
                            <NewsCard key={item.id} news={item} />
                        ))}
                    </div>
                </div>

                {/* 3. Theme Cards */}
                <div>
                    <h2 style={{ fontSize: '1.3rem', marginBottom: '20px', borderLeft: '4px solid #ff0055', paddingLeft: '10px' }}>📚 같은 테마 심화 읽기</h2>
                    <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '10px' }}>
                        {['반도체', '2차전지', 'AI', '금리'].map(theme => (
                            <Link key={theme} href={`/topic/${theme}`} style={{ flex: '0 0 auto', padding: '10px 20px', background: '#222', borderRadius: '20px', border: '1px solid #444', color: '#fff' }}>
                                #{theme}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* 4. [REVENUE] Contextual Money Block (Dynamic) */}
                <ContextualMoneyBlock guides={contextualGuides} />

            </section>

            <ScrollTrigger type="slide" />

            {/* Page Bottom Ad */}
            <AdSenseSlot id="ad-slot-bottom" />
        </main >
    );
}
