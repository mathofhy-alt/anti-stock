import Link from 'next/link';
import styles from './NewsCard.module.css';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

export default function NewsCard({ news }) {
    const isPositive = news.sentiment === 'positive';
    const isNegative = news.sentiment === 'negative';

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <span className={styles.source}>{news.source}</span>
                <span className={styles.date}>
                    {news.pubDate ? formatDistanceToNow(new Date(news.pubDate), { addSuffix: true, locale: ko }) : '방금 전'}
                </span>
            </div>

            <Link href={`/news/${news.id}`} className={styles.link}>
                <h3 className={styles.title}>{news.title}</h3>
            </Link>

            <p className={styles.content}>{news.summary}</p>

            <div className={styles.footer}>
                <div className={styles.tags}>
                    <span className={`${styles.tag} ${styles[news.category.toLowerCase()]}`}>
                        {news.category === 'Domestic' ? '국내' : news.category === 'Overseas' ? '해외' : '일반'}
                    </span>
                    {news.tags && news.tags.slice(0, 2).map(tag => (
                        <Link key={tag} href={`/topic/${tag}`} className={styles.subTag} style={{ textDecoration: 'none' }}>#{tag}</Link>
                    ))}
                </div>

                {/* Sentiment Indicator */}
                {(isPositive || isNegative) && (
                    <div className={`${styles.sentiment} ${isPositive ? styles.pos : styles.neg}`}>
                        {isPositive ? '▲ 호재' : '▼ 악재'}
                    </div>
                )}
            </div>
        </div>
    );
}
