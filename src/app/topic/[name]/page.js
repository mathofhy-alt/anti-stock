import { getLatestNews } from '@/lib/rss';
import NewsCard from '@/components/NewsCard/NewsCard';
import Link from 'next/link';
import styles from './page.module.css';

export const revalidate = 60;
export const dynamicParams = true;

// Fix: Corrected generateStaticParams syntax
export async function generateStaticParams() {
    const news = await getLatestNews();
    const tags = new Set();
    news.forEach(n => {
        if (n.tags) n.tags.forEach(t => tags.add(t));
    });
    return Array.from(tags).map(name => ({
        name: name
    }));
}

export async function generateMetadata({ params }) {
    const resolvedParams = await params;
    const { name } = resolvedParams;
    const decodedName = name ? decodeURIComponent(name) : '토픽';

    return {
        title: `${decodedName} 관련 주식 뉴스 모음 - 안티-주식`,
        description: `${decodedName} 관련 최신 증시 뉴스와 테마 분석 정보를 한눈에 확인하세요.`,
        openGraph: {
            title: `${decodedName} 주식 뉴스 Hub`,
            description: `실시간 ${decodedName} 관련 시장 반응과 핵심 뉴스를 제공합니다.`,
            url: `https://anti-stock-v2.vercel.app/topic/${name}`,
        },
    };
}

export default async function TopicPage({ params }) {
    // 1. Await Params (Next.js 15+)
    const resolvedParams = await params;

    // Debug: Force log to Vercel console
    console.log('[TopicPage Debug] Resolved Params:', JSON.stringify(resolvedParams));

    // Validate param existence
    if (!resolvedParams || !resolvedParams.name) {
        return (
            <main className={styles.container}>
                <h1>Error: Topic Name Missing</h1>
                <p>Params: {JSON.stringify(resolvedParams)}</p>
                <Link href="/">홈으로 가기</Link>
            </main>
        );
    }

    const { name } = resolvedParams;

    // 2. Decode
    const decodedName = decodeURIComponent(name);
    console.log('[TopicPage] Decoded Name:', decodedName);

    // 3. Fetch Data
    const news = await getLatestNews();

    // 4. Filtering Logic
    const tagNews = news.filter(n => {
        if (!n) return false;
        const target = decodedName.toLowerCase();

        // Check Tags
        if (n.tags && n.tags.some(t => t.toLowerCase() === target)) return true;
        // Check Themes
        if (n.themes && n.themes.some(t => t.toLowerCase() === target)) return true;
        // Check Title
        if (n.title && n.title.toLowerCase().includes(target)) return true;
        // Check Description/Summary (Optional)
        if (n.summary && n.summary.toLowerCase().includes(target)) return true;

        return false;
    });

    // 5. Popularity Sort
    const popularNews = [...tagNews]
        .sort((a, b) => {
            const scoreA = (a.summary ? a.summary.length : 0) + (a.imageUrl ? 100 : 0);
            const scoreB = (b.summary ? b.summary.length : 0) + (b.imageUrl ? 100 : 0);
            return scoreB - scoreA;
        })
        .slice(0, 3);

    // 6. Related Tags
    const relatedTagsCounts = {};
    tagNews.forEach(n => {
        if (n.tags) {
            n.tags.forEach(t => {
                if (t !== decodedName) relatedTagsCounts[t] = (relatedTagsCounts[t] || 0) + 1;
            });
        }
    });
    const relatedTags = Object.entries(relatedTagsCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8)
        .map(([t]) => t);

    return (
        <main className={styles.container}>
            {/* Header Section */}
            <section className={styles.header}>
                <div className={styles.label}>Topic Hub</div>
                <h1 className={styles.title}>#{decodedName}</h1>
                <p className={styles.description}>
                    '<strong>{decodedName}</strong>' 키워드는 현재 시장에서 중요한 변수로 작용하고 있습니다.<br />
                    관련된 최신 투자 정보와 시장 반응을 종합적으로 확인해보세요.
                </p>
            </section>

            {/* Popular News Section */}
            {popularNews.length > 0 && (
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>🔥 {decodedName} BEST 뉴스</h2>
                    <div className={styles.grid}>
                        {popularNews.map(item => (
                            <NewsCard key={`pop-${item.id}`} news={item} />
                        ))}
                    </div>
                </section>
            )}

            {/* Auto Ads Middle */}
            <div className="ad-container" style={{ width: '100%', height: '150px', background: '#222', margin: '40px 0', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#444' }}>
                <span>Advertisement</span>
            </div>

            {/* Latest News Section */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>🕒 실시간 타임라인</h2>
                {tagNews.length > 0 ? (
                    <div className={styles.grid}>
                        {tagNews.map(item => (
                            <NewsCard key={item.id} news={item} />
                        ))}
                    </div>
                ) : (
                    <p style={{ textAlign: 'center', color: '#666', padding: '40px' }}>
                        아직 집계된 '{decodedName}' 관련 뉴스가 없습니다.
                    </p>
                )}
            </section>

            {/* Related Tags & Footer */}
            <section className={styles.footerSection}>
                <h3>🔗 연관된 키워드</h3>
                <div className={styles.tagCloud}>
                    {relatedTags.map(t => (
                        <Link key={t} href={`/topic/${t}`} className={styles.tagChip}>
                            #{t}
                        </Link>
                    ))}
                </div>

                <div className={styles.backLink}>
                    <Link href="/">🏠 홈으로 돌아가기</Link>
                </div>
            </section>
        </main>
    );
}
