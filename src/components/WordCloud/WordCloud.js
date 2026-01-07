import styles from './WordCloud.module.css';

export default function WordCloud({ keywords }) {
    // keywords: [{ text: 'Samsung', count: 10 }, ...]

    const maxCount = Math.max(...keywords.map(k => k.count), 1);

    const getSize = (count) => {
        // Linear scale roughly between 1rem and 3rem
        const minSize = 1;
        const maxSize = 2.5;
        return minSize + (count / maxCount) * (maxSize - minSize);
    };

    return (
        <div className={styles.cloudContainer}>
            <h2 className={styles.title}>실시간 시장 키워드</h2>
            <div className={styles.cloud}>
                {keywords.slice(0, 20).map((k, i) => ( // limit to top 20
                    <span
                        key={i}
                        className={styles.word}
                        style={{
                            fontSize: `${getSize(k.count)}rem`,
                            opacity: 0.7 + (k.count / maxCount) * 0.3
                        }}
                    >
                        {k.text}
                    </span>
                ))}
                {keywords.length === 0 && <p className={styles.empty}>데이터 수집 중...</p>}
            </div>
        </div>
    );
}
