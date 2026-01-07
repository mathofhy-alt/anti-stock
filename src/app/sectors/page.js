import { getLatestNews } from '@/lib/rss';
import NewsCard from '@/components/NewsCard/NewsCard';
import { SECTORS } from '@/lib/keywords';
import styles from '../page.module.css';

export const revalidate = 60;

export default async function SectorsPage() {
    const news = await getLatestNews();
    const sectorNews = {};

    // Group news by sector
    Object.keys(SECTORS).forEach(sector => {
        sectorNews[sector] = news.filter(n => n.tags && n.tags.includes(sector));
    });

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <h1 className={styles.sectionTitle}>섹터별 뉴스 (Sector Watch)</h1>

                {Object.entries(sectorNews).map(([sector, items]) => (
                    items.length > 0 && (
                        <section key={sector} className={styles.section}>
                            <h2 style={{ color: '#fff', borderBottom: '1px solid #333', paddingBottom: '10px' }}>{sector}</h2>
                            <div className={styles.grid}>
                                {items.slice(0, 4).map((item) => (
                                    <NewsCard key={item.id} news={item} />
                                ))}
                            </div>
                        </section>
                    )
                ))}
            </div>
        </main>
    );
}
