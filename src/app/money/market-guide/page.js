import Link from 'next/link';
import { getLatestNews } from '@/lib/rss';
import AdSenseSlot from '@/components/AdSenseSlot/AdSenseSlot';
import NewsCard from '@/components/NewsCard/NewsCard';
import { MONEY_CONTENT } from '@/data/moneyContent';
import { MONEY_LONGTAIL_DATA } from '@/data/moneyLongtailData';
import styles from '@/app/page.module.css';

// Revalidate Daily
export const revalidate = 3600;

export const metadata = {
    title: MONEY_CONTENT.market_guide.title,
    description: MONEY_CONTENT.market_guide.description,
    alternates: { canonical: 'https://info.stac100.com/money/market-guide' }
};

export default async function MarketGuidePage() {
    const data = MONEY_CONTENT.market_guide;
    const allNews = await getLatestNews();

    // Filter news related to Macro/Policies
    const relatedNews = allNews.filter(n =>
        n.title.includes('금리') || n.title.includes('환율') || n.title.includes('CPI') || n.title.includes('FOMC')
    ).slice(0, 8);

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: data.faqs.map(f => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a }
        }))
    };

    return (
        <main className={styles.container}>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            <header style={{ textAlign: 'center', marginBottom: '40px', paddingTop: '40px' }}>
                <h1 style={{ fontSize: '2.2rem', marginBottom: '20px', color: '#fff' }}>{data.title.split('|')[0]}</h1>
                <p style={{ color: '#aaa', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
                    {data.description}
                </p>
                <div style={{ marginTop: '20px' }}>
                    {data.keywords.map(k => (
                        <span key={k} style={{ display: 'inline-block', padding: '5px 12px', margin: '5px', background: '#222', borderRadius: '15px', fontSize: '0.85rem', color: '#00dbbd' }}>#{k}</span>
                    ))}
                </div>
            </header>

            <AdSenseSlot id="money-guide-top" />

            {/* Concept Intro */}
            <section style={{ background: '#1e1e1e', padding: '30px', borderRadius: '12px', marginBottom: '40px' }}>
                <h2 style={{ color: '#00dbbd', marginBottom: '20px' }}>💡 경제 지표 읽는 법</h2>
                {data.intro.map((p, i) => (
                    <p key={i} style={{ marginBottom: '10px', color: '#ddd' }}>• {p}</p>
                ))}
            </section>

            {/* Links to Keyword Pages */}
            <section style={{ marginBottom: '50px' }}>
                <h2 className={styles.blockTitle}>📚 주요 투자 키워드 학습</h2>
                <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                    {['금리', '환율', 'CPI', 'FOMC', '엔비디아', '비트코인'].map(k => (
                        <Link key={k} href={`/topic/${k}`} style={{ background: '#333', padding: '15px 25px', borderRadius: '30px', color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>
                            #{k}
                        </Link>
                    ))}
                </div>
            </section>

            <AdSenseSlot id="money-guide-mid" />

            {/* [New] Long-tail Page Links */}
            <section style={{ marginBottom: '50px' }}>
                <h2 className={styles.blockTitle}>📚 경제 심화 학습 (Deep Dive)</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '15px' }}>
                    {MONEY_LONGTAIL_DATA['market-guide'] && Object.entries(MONEY_LONGTAIL_DATA['market-guide']).map(([slug, item]) => (
                        <Link key={slug} href={`/money/market-guide/${slug}`} style={{ background: '#222', padding: '20px', borderRadius: '12px', border: '1px solid #333', display: 'block' }}>
                            <strong style={{ display: 'block', fontSize: '1.1rem', marginBottom: '8px', color: '#00dbbd' }}>{item.title}</strong>
                            <p style={{ margin: 0, fontSize: '0.9rem', color: '#888', lineHeight: '1.5' }}>{item.intro.slice(0, 60)}...</p>
                        </Link>
                    ))}
                </div>
            </section>

            {/* News Feed */}
            <section style={{ marginBottom: '50px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h2 className={styles.blockTitle}>🌏 글로벌 경제 주요 뉴스</h2>
                </div>
                <div className={styles.grid}>
                    {relatedNews.length > 0 ? (
                        relatedNews.map(item => <NewsCard key={item.id} news={item} />)
                    ) : (
                        <p style={{ color: '#666' }}>관련된 최신 뉴스가 없습니다.</p>
                    )}
                </div>
            </section>

            {/* FAQ Section */}
            <section style={{ marginBottom: '50px' }}>
                <h2 className={styles.blockTitle}>🙋‍♂️ 경제 용어 FAQ</h2>
                <div style={{ display: 'grid', gap: '15px' }}>
                    {data.faqs.map((f, i) => (
                        <div key={i} style={{ background: '#222', padding: '20px', borderRadius: '8px' }}>
                            <strong style={{ display: 'block', color: '#fff', marginBottom: '8px' }}>Q. {f.q}</strong>
                            <p style={{ margin: 0, color: '#aaa', fontSize: '0.95rem' }}>A. {f.a}</p>
                        </div>
                    ))}
                </div>
            </section>

            <AdSenseSlot id="money-guide-bottom" />
        </main>
    );
}
