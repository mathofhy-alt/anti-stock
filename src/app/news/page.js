import { getLatestNews } from '@/lib/rss';
import NewsCard from '@/components/NewsCard/NewsCard';
import Link from 'next/link';
import styles from '../page.module.css';

export const revalidate = 60;

export default async function NewsPage() {
    const news = await getLatestNews();

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <section className={styles.section}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                        <h2 className={styles.sectionTitle}>📰 실시간 뉴스 스트림 [DEBUG:NEWS_LOADED]</h2>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <Link href="/domestic" style={{ padding: '8px 16px', borderRadius: '20px', background: '#333', color: '#fff', fontSize: '0.9rem' }}>국내뉴스</Link>
                            <Link href="/overseas" style={{ padding: '8px 16px', borderRadius: '20px', background: '#333', color: '#fff', fontSize: '0.9rem' }}>해외뉴스</Link>
                        </div>
                    </div>

                    {news.length > 0 ? (
                        <div className={styles.grid}>
                            {news.map((item) => (
                                <NewsCard key={item.id} news={item} />
                            ))}
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '100px 0', color: '#888' }}>
                            <p>실시간 뉴스를 불러오는 중이거나 데이터가 없습니다.</p>
                            <Link href="/" style={{ color: '#00dbbd', marginTop: '20px', display: 'inline-block' }}>홈으로 돌아가기</Link>
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}
