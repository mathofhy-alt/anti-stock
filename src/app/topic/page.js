import { getLatestNews } from '@/lib/rss';
import Link from 'next/link';
import styles from '../page.module.css';

export const revalidate = 60;

export default async function TopicListPage() {
    const news = await getLatestNews();

    // Extract unique tags from news
    const allTags = new Set();
    news.forEach(item => {
        if (item.tags) {
            item.tags.forEach(tag => allTags.add(tag));
        }
    });

    const sortedTags = Array.from(allTags).sort();

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>📈 실시간 트렌드 키워드 [DEBUG:TOPIC_LOADED]</h2>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '20px' }}>
                        {sortedTags.map(tag => (
                            <Link
                                key={tag}
                                href={`/topic/${tag}`}
                                style={{
                                    padding: '10px 20px',
                                    background: '#222',
                                    borderRadius: '25px',
                                    border: '1px solid #333',
                                    color: '#fff',
                                    textDecoration: 'none',
                                    transition: 'all 0.2s'
                                }}
                            >
                                #{tag}
                            </Link>
                        ))}
                    </div>
                    {sortedTags.length === 0 && (
                        <p style={{ color: '#888', marginTop: '20px' }}>현재 분석된 트렌드 키워드가 없습니다.</p>
                    )}
                </section>
            </div>
        </main>
    );
}
