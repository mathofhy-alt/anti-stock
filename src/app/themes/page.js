import { getLatestNews } from '@/lib/rss';
import NewsCard from '@/components/NewsCard/NewsCard';
import { THEMES } from '@/lib/keywords';
import styles from '../page.module.css';

export const revalidate = 60;

export default async function ThemesPage() {
    const news = await getLatestNews();
    const themeNews = {};

    // Group news by theme
    Object.keys(THEMES).forEach(theme => {
        themeNews[theme] = news.filter(n => n.themes && n.themes.includes(theme));
    });

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <h1 className={styles.sectionTitle}>테마별 뉴스 (Theme Watch)</h1>

                {Object.entries(themeNews).map(([theme, items]) => (
                    items.length > 0 && (
                        <section key={theme} className={styles.section}>
                            <h2 style={{ color: '#fff', borderBottom: '1px solid #333', paddingBottom: '10px' }}>{theme}</h2>
                            <div className={styles.grid}>
                                {items.slice(0, 4).map((item) => (
                                    <NewsCard key={item.id} news={item} />
                                ))}
                            </div>
                        </section>
                    )
                ))}

                {Object.keys(themeNews).every(k => themeNews[k].length === 0) && (
                    <p>현재 집계된 테마 뉴스가 없습니다.</p>
                )}
            </div>
        </main>
    );
}
