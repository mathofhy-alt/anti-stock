'use client';

import { useState } from 'react';
import Link from 'next/link';
import { STOCK_DATA } from '@/data/stocks';
import styles from './page.module.css';

export default function StockIndexPage() {
    const [activeTab, setActiveTab] = useState('domestic');

    // Convert Object to Array
    const stocks = Object.entries(STOCK_DATA).map(([key, value]) => ({
        id: key,
        ...value
    }));

    const domesticStocks = stocks.filter(s => s.market === 'domestic');
    const overseasStocks = stocks.filter(s => s.market === 'overseas');

    return (
        <main className={styles.container}>
            <section className={styles.header}>
                <h1 className={styles.title}>📈 주요 종목 돋보기</h1>
                <p className={styles.subtitle}>
                    대한민국과 미국의 대표 기업들을 깊이 있게 분석합니다.<br />
                    관심 있는 종목의 최신 뉴스와 이슈를 한눈에 확인하세요.
                </p>
            </section>

            {/* Tab Navigation */}
            <div className={styles.tabs}>
                <button
                    className={`${styles.tab} ${activeTab === 'domestic' ? styles.active : ''}`}
                    onClick={() => setActiveTab('domestic')}
                >
                    🇰🇷 국내 증시 (KRX)
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'overseas' ? styles.active : ''}`}
                    onClick={() => setActiveTab('overseas')}
                >
                    🇺🇸 해외/크립토 (Global)
                </button>
            </div>

            {/* Stock Grid */}
            <div className={styles.grid}>
                {activeTab === 'domestic' && domesticStocks.map(stock => (
                    <StockCard key={stock.id} stock={stock} />
                ))}
                {activeTab === 'overseas' && overseasStocks.map(stock => (
                    <StockCard key={stock.id} stock={stock} />
                ))}
            </div>

            {/* SEO Text Block */}
            <div className={styles.seoBlock}>
                <h3>💡 왜 종목별로 뉴스를 봐야 할까요?</h3>
                <p>
                    시장은 거대한 흐름(Macro)과 개별 기업의 이슈(Micro)가 맞물려 돌아갑니다.
                    안티-주식의 <strong>종목 허브</strong>는 각 기업에 특화된 뉴스만을 선별하여,
                    노이즈 없는 순수 정보만을 제공합니다.
                </p>
            </div>
        </main>
    );
}

function StockCard({ stock }) {
    return (
        <Link href={`/stock/${stock.id}`} className={styles.card}>
            <div className={styles.cardHeader}>
                <span className={styles.sector}>{stock.sector}</span>
                <span className={styles.symbol}>{stock.symbol}</span>
            </div>
            <h2 className={styles.cardTitle}>{stock.name}</h2>
            <p className={styles.cardDesc}>{stock.description}</p>
        </Link>
    );
}
