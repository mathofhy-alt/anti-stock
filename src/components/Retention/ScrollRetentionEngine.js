'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './ScrollRetentionEngine.module.css';

export default function ScrollRetentionEngine({ nextGuide, highValueGuide }) {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [showSlideIn, setShowSlideIn] = useState(false);
    const [showCard, setShowCard] = useState(false);
    const [dismissed, setDismissed] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            setScrollProgress(progress);

            // 60% Trigger -> Slide In
            if (progress > 60 && !dismissed) {
                setShowSlideIn(true);
            }

            // 85% Trigger -> High Value Card (Stronger CTA)
            if (progress > 85) {
                setShowCard(true);
                setShowSlideIn(false); // Hide slide-in when card appears
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [dismissed]);

    if (dismissed) return null;

    return (
        <>
            {/* 1. Slide-in Toast (60%) */}
            <div className={`${styles.slideIn} ${showSlideIn ? styles.visible : ''}`}>
                <div className={styles.slideHeader}>
                    <span>다음 글 추천</span>
                    <button onClick={() => setDismissed(true)} className={styles.closeBtn}>×</button>
                </div>
                <Link href={nextGuide.url} className={styles.slideLink}>
                    {nextGuide.title}
                </Link>
            </div>

            {/* 2. High Value Card Overlay (85%) - More Prominent */}
            <div className={`${styles.highValueCard} ${showCard ? styles.visible : ''}`}>
                <button onClick={() => setDismissed(true)} className={styles.cardCloseBtn}>×</button>
                <div className={styles.cardLabel}>🔥 수익 극대화 필독</div>
                <h3 className={styles.cardTitle}>{highValueGuide.title}</h3>
                <p className={styles.cardDesc}>{highValueGuide.description}</p>
                <Link href={highValueGuide.url} className={styles.cardButton}>
                    지금 확인하기 →
                </Link>
            </div>
        </>
    );
}
