import { getLatestNews } from '@/lib/rss';
import NewsCard from '@/components/NewsCard/NewsCard';
import styles from '../page.module.css';

export const revalidate = 60;

export default async function SearchPage({ searchParams }) {
    const news = await getLatestNews();
    const query = searchParams?.q || '';

    const filteredNews = news.filter(n => {
        if (!query) return false;
        const lowerQuery = query.toLowerCase();
        return n.title.toLowerCase().includes(lowerQuery) ||
            n.tags.some(t => t.toLowerCase() === lowerQuery) ||
            n.source.toLowerCase().includes(lowerQuery);
    });

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <h1 className={styles.sectionTitle}>
                    "{query}" 검색 결과 ({filteredNews.length})
                </h1>
                {filteredNews.length > 0 ? (
                    <div className={styles.grid}>
                        {filteredNews.map(item => <NewsCard key={item.id} news={item} />)}
                    </div>
                ) : (
                    <p style={{ color: '#888', textAlign: 'center', padding: '50px' }}>검색 결과가 없습니다.</p>
                )}
            </div>
        </main>
    );
}
