import React from 'react';
import { supabase } from '@/lib/supabase';
import { STOCK_DATA } from '@/data/stocks';
import NewsCard from '@/components/NewsCard/NewsCard';
import Link from 'next/link';
import styles from './page.module.css';
import AdSenseSlot from '@/components/AdSenseSlot/AdSenseSlot';

export const revalidate = 60;
export const dynamicParams = true;

// Generate Static Params for known stocks
export async function generateStaticParams() {
    return Object.keys(STOCK_DATA).map(symbol => ({ symbol }));
}

export async function generateMetadata({ params }) {
    const { symbol } = await params; // Next.js 15 await
    const stock = STOCK_DATA[symbol];

    if (!stock) {
        return { title: '종목을 찾을 수 없습니다' };
    }

    return {
        title: `${stock.name} 주가 · 뉴스 · 전망 총정리 - 안티-주식`,
        description: `${stock.name}(${stock.symbol})의 최신 주가 관련 뉴스, 실적 발표, 전문가 분석 및 시장 전망을 실시간으로 확인하세요.`,
        openGraph: {
            title: `${stock.name} 투자 정보 Hub`,
            description: `${stock.name} 관련 핵심 뉴스와 이슈를 놓치지 마세요.`,
            url: `https://info.stac100.com/stock/${symbol}`,
        },
        alternates: {
            canonical: `https://info.stac100.com/stock/${symbol}`,
        }
    };
}

// Fetch News specifically for this stock
async function getStockNews(keywords) {
    const { data } = await supabase
        .from('news')
        .select('*')
        .order('published_at', { ascending: false })
        .limit(100);

    if (!data) return [];

    return data.filter(n => {
        const text = (n.title + ' ' + n.summary).toLowerCase();
        const tags = n.tags || [];
        return keywords.some(k => text.includes(k.toLowerCase()) || tags.includes(k));
    }).slice(0, 20);
}

// Helper: Generate Rule-based Summary
function generateAutoSummary(stock, news) {
    if (!news || news.length === 0) {
        return `${stock.name}에 대한 최신 뉴스 데이터가 집계되지 않았습니다. 잠시 후 다시 확인해주세요.`;
    }

    // 1. Extract Keywords from recent news titles
    const allTitles = news.map(n => n.title).join(' ');
    const keywords = stock.keywords.filter(k => allTitles.includes(k));
    const uniqueKeywords = [...new Set(keywords)].slice(0, 3);

    // 2. Determine Sentiment (Naive)
    const positiveWords = ['상승', '급등', '호조', '기대', '최고', '매수'];
    const negativeWords = ['하락', '급락', '우려', '부진', '매도', '손실'];
    let sentimentScore = 0;

    allTitles.split(' ').forEach(w => {
        if (positiveWords.some(p => w.includes(p))) sentimentScore++;
        if (negativeWords.some(n => w.includes(n))) sentimentScore--;
    });

    let sentimentText = '시장 반응은 중립적입니다.';
    if (sentimentScore > 2) sentimentText = '긍정적인 모멘텀이 관측되고 있습니다.';
    if (sentimentScore < -2) sentimentText = '보수적인 관점이 필요한 시점입니다.';

    // Safe title access
    const latestTitle = news[0] ? news[0].title : '';

    return `최근 ${stock.name} 관련 뉴스는 '${uniqueKeywords.join(', ')}' 등의 키워드가 중심입니다. ${sentimentText} 주요 이슈로는 "${latestTitle}" 등이 있습니다.`;
}

// Component: FAQ
function StockFAQ({ stock }) {
    const faqs = [
        { q: `${stock.name}의 주가 전망은 어떤가요?`, a: `${stock.name}은(는) ${stock.sector} 섹터의 핵심 기업으로, 최근 시장 트렌드와 밀접하게 연동되어 있습니다. 전문가들은 장기적인 펀더멘털과 단기적인 매크로 변수를 함께 고려할 것을 권장합니다.` },
        { q: `${stock.name} 배당금 지급일은 언제인가요?`, a: `대부분의 국내 대형주는 4월, 5월에 배당금을 지급하며, 분기 배당을 실시하는 경우도 있습니다. ${stock.name}의 정확한 배당 기준일과 지급일은 DART 공시를 통해 확인하는 것이 가장 정확합니다.` },
        { q: `${stock.name} 투자 시 유의할 리스크는?`, a: `${stock.name}의 경우 글로벌 경기 침체 우려와 ${stock.sector} 업황 사이클이 주요 리스크 요인입니다. 특히 환율 변동성과 원자재 가격 추이도 수익성에 영향을 미칠 수 있습니다.` },
    ];

    return (
        <div className={styles.faqBlock}>
            <h3>💡 자주 묻는 질문 (FAQ)</h3>
            <div className={styles.faqList}>
                {faqs.map((f, i) => (
                    <div key={i} className={styles.faqItem}>
                        <div className={styles.question}>Q. {f.q}</div>
                        <div className={styles.answer}>A. {f.a}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default async function StockHubPage({ params }) {
    const { symbol } = await params;
    const stock = STOCK_DATA[symbol];

    if (!stock) {
        return <div className={styles.container}>존재하지 않는 종목입니다.</div>;
    }

    const news = await getStockNews(stock.keywords);
    const autoSummary = generateAutoSummary(stock, news);

    return (
        <main className={styles.container}>
            {/* Header Section */}
            <section className={styles.header}>
                <div className={styles.breadcrumb}>
                    <Link href="/stock">Stock</Link> &gt; <span>{stock.name}</span>
                </div>
                <h1 className={styles.title}>{stock.name} <span className={styles.code}>{stock.symbol}</span></h1>
                <p className={styles.desc}>{stock.description}</p>
                <div className={styles.tags}>
                    {stock.keywords.map(k => <span key={k} className={styles.tag}>#{k}</span>)}
                </div>
            </section>

            {/* Ad Block (Top) - Removed hardcoded position */}

            {/* Auto Summary Block */}
            <section className={styles.summaryBlock}>
                <h2>⚡ 3분 요약 브리핑</h2>
                <p>{autoSummary}</p>
            </section>

            <AdSenseSlot id="ad-stock-top" />

            {/* FAQ Section */}
            <StockFAQ stock={stock} />

            {/* Ad Block (Mid) - Between FAQ and News */}
            <AdSenseSlot id="ad-stock-mid" />

            {/* News Section */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>📰 {stock.name} 실시간 뉴스</h2>
                {news.length > 0 ? (
                    <div className={styles.grid}>
                        {news.map((item, index) => (
                            <React.Fragment key={item.slug}>
                                <NewsCard news={{
                                    id: item.slug,
                                    title: item.title,
                                    summary: item.summary,
                                    tags: item.tags,
                                    category: item.region,
                                    pubDate: item.published_at,
                                    imageUrl: item.image_url
                                }} />
                                {/* [Retention Hook] CTA Card in News Feed */}
                                {index === 2 && (
                                    <div style={{ gridColumn: '1 / -1', background: '#1e1e1e', padding: '20px', borderRadius: '12px', textAlign: 'center', margin: '20px 0', border: '1px solid #00dbbd' }}>
                                        <p style={{ margin: '0 0 10px 0', color: '#00dbbd', fontWeight: 'bold' }}>⚡ {stock.name}의 주가 변동 사유가 궁금하신가요?</p>
                                        <Link href={`/topic/${stock.name}`} style={{ display: 'inline-block', padding: '10px 25px', background: '#00dbbd', color: '#000', borderRadius: '25px', fontWeight: 'bold' }}>
                                            👉 {stock.name} 핵심 뉴스 모아보기
                                        </Link>
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                ) : (
                    <p className={styles.empty}>최근 집계된 뉴스가 없습니다.</p>
                )}
            </section>

            {/* Ad Block (Bottom) */}
            <AdSenseSlot id="ad-stock-bottom" />

            {/* Related Sector Navigation */}
            <section className={styles.relatedSection}>
                <h3 style={{ borderLeft: '4px solid #00dbbd', paddingLeft: '10px', marginBottom: '20px' }}>👥 이 종목을 본 사람들이 같이 보는 허브</h3>

                {/* 1. Same Sector */}
                <h4 style={{ color: '#888', marginBottom: '10px', fontSize: '0.9rem' }}>같은 섹터({stock.sector}) 주목할 종목</h4>
                <div className={styles.relatedList} style={{ marginBottom: '30px' }}>
                    {Object.entries(STOCK_DATA)
                        .filter(([k, v]) => v.sector.includes(stock.sector.split('/')[0]) && k !== symbol)
                        .slice(0, 4)
                        .map(([k, v]) => (
                            <Link key={k} href={`/stock/${k}`} className={styles.relatedCard}>
                                <strong>{v.name}</strong>
                                <span>{v.symbol}</span>
                            </Link>
                        ))}
                </div>

                {/* 2. Related Themes */}
                <h4 style={{ color: '#888', marginBottom: '10px', fontSize: '0.9rem' }}>관련 테마 & 투자 가이드</h4>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <Link href="/money/forecast" style={{ padding: '8px 16px', background: '#333', borderRadius: '20px', fontSize: '0.9rem', color: '#00dbbd', border: '1px solid #00dbbd' }}>📈 주가 전망 확인</Link>
                    <Link href="/money/etf" style={{ padding: '8px 16px', background: '#333', borderRadius: '20px', fontSize: '0.9rem', color: '#fff' }}>📊 관련 ETF</Link>
                    {[...stock.sector.split('/'), '실적', '기관매수'].map(t => (
                        <Link key={t} href={`/topic/${t}`} style={{ padding: '8px 16px', background: '#333', borderRadius: '20px', fontSize: '0.9rem', color: '#fff' }}>#{t}</Link>
                    ))}
                </div>
            </section>

            {/* [New Block] More Investment Guides (SEO Injection) */}
            <section className={styles.relatedSection} style={{ marginTop: '30px', borderTop: '1px solid #333', paddingTop: '30px' }}>
                <h3 style={{ borderLeft: '4px solid #f0b90b', paddingLeft: '10px', marginBottom: '20px' }}>💰 투자 수익률을 높이는 필독 가이드</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '15px' }}>
                    {[
                        { title: '🇺🇸 미국주식 세금 아끼는 법', url: '/money/us-stocks/tax' },
                        { title: '💸 30년 은퇴용 월배당 포트폴리오', url: '/money/dividend/monthly' },
                        { title: '🤖 제2의 엔비디아 찾기 (AI)', url: '/money/etf/ai' },
                        { title: '📉 금리인하 시기 투자 전략', url: '/money/market-guide/interest' },
                    ].sort(() => 0.5 - Math.random()).slice(0, 3).map((guide, idx) => (
                        <Link key={idx} href={guide.url} style={{ background: '#1a1a1a', padding: '15px', borderRadius: '10px', border: '1px solid #444', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ color: '#ddd', fontWeight: '500' }}>{guide.title}</span>
                            <span style={{ color: '#00dbbd' }}>→</span>
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    );
}
