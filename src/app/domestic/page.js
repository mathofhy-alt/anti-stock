import { getLatestNews } from '@/lib/rss';
import NewsCard from '@/components/NewsCard/NewsCard';
import styles from '../page.module.css';

export const revalidate = 60;

export default async function DomesticPage() {
    const news = await getLatestNews();
    const domesticNews = news.filter(n => n.category === 'Domestic');

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>국내 증시 뉴스</h2>
                    {domesticNews.length > 0 ? (
                        <div className={styles.grid}>
                            {domesticNews.map((item) => (
                                <NewsCard key={item.id} news={item} />
                            ))}
                        </div>
                    ) : (
                        <p style={{ color: '#888' }}>최신 국내 증시 뉴스가 없습니다.</p>
                    )}
                </section>
            </div>
        </main>
    );
}
