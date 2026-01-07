import { getLatestNews } from '@/lib/rss';
import NewsCard from '@/components/NewsCard/NewsCard';
import styles from '../page.module.css';

export const revalidate = 60;

export default async function OverseasPage() {
    const news = await getLatestNews();
    const overseasNews = news.filter(n => n.category === 'Overseas');

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>해외 증시 뉴스</h2>
                    {overseasNews.length > 0 ? (
                        <div className={styles.grid}>
                            {overseasNews.map((item) => (
                                <NewsCard key={item.id} news={item} />
                            ))}
                        </div>
                    ) : (
                        <p style={{ color: '#888' }}>최신 해외 증시 뉴스가 없습니다.</p>
                    )}
                </section>
            </div>
        </main>
    );
}
