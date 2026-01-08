'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { MONEY_LONGTAIL_DATA } from '@/data/moneyLongtailData';
import styles from './SearchModal.module.css';

export default function SearchModal({ onClose }) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const inputRef = useRef(null);

    // Focus input on mount
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
        // Lock body scroll
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    // Search Logic
    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            return;
        }

        const lowerQ = query.toLowerCase();
        const found = [];

        Object.keys(MONEY_LONGTAIL_DATA).forEach(category => {
            const catData = MONEY_LONGTAIL_DATA[category];
            Object.keys(catData).forEach(slug => {
                const page = catData[slug];
                const titleMatch = page.title.toLowerCase().includes(lowerQ);
                const descMatch = page.description.toLowerCase().includes(lowerQ);
                const tagMatch = page.tags && page.tags.some(t => t.toLowerCase().includes(lowerQ));

                if (titleMatch || descMatch || tagMatch) {
                    found.push({
                        url: `/money/${category}/${slug}`,
                        title: page.title,
                        category: category.toUpperCase(),
                        matched: titleMatch ? 'Title' : (tagMatch ? 'Tag' : 'Content')
                    });
                }
            });
        });

        setResults(found.slice(0, 10)); // Limit 10
    }, [query]);

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <header className={styles.header}>
                    <input
                        ref={inputRef}
                        type="text"
                        className={styles.input}
                        placeholder="검색어를 입력하세요 (예: 배당, 세금, ETF)"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                    />
                    <button className={styles.closeBtn} onClick={onClose}>✕</button>
                </header>

                <div className={styles.body}>
                    {results.length > 0 ? (
                        <ul className={styles.list}>
                            {results.map((res, idx) => (
                                <li key={idx} className={styles.item}>
                                    <Link href={res.url} onClick={onClose}>
                                        <div className={styles.catBadge}>{res.category}</div>
                                        <div className={styles.itemTitle}>{res.title}</div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className={styles.empty}>
                            {query ? '검색 결과가 없습니다.' : '키워드로 정보를 찾아보세요.'}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
