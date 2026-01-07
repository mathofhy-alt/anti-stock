import { getLatestNews } from '@/lib/rss';
import { STOCK_DATA } from '@/data/stocks';
import NewsCard from '@/components/NewsCard/NewsCard';
import WordCloud from '@/components/WordCloud/WordCloud';
import Link from 'next/link';
import styles from './page.module.css';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

import AdSenseSlot from '@/components/AdSenseSlot/AdSenseSlot';

export const revalidate = 60;

export default async function Home() {
    const news = await getLatestNews();

    // 1. Data Processing for Retention Blocks

    // [Restored] Popular Stock Hubs List
    const popularSymbols = ['samsung', 'nvidia', 'tesla', 'apple', 'bitcoin'];
    const popularStocks = popularSymbols.map(s => STOCK_DATA[s]).filter(Boolean);

    // A. Daily Market Summary (Simulated)
    // Logic: Take top 3 Domestic and Overseas headlines
    const domesticNews = news.filter(n => n.category === 'Domestic').slice(0, 3);
    const overseasNews = news.filter(n => n.category === 'Overseas').slice(0, 3);

    const domesticSummary = domesticNews.map(n => n.title).join(' / ');
    const overseasSummary = overseasNews.map(n => n.title).join(' / ');

    // B. Real-time Trend Keywords (Top 10) - Enhanced Filtering
    const allText = news.map(n => n.title + " " + n.tags.join(" ")).join(' ');

    // 1. Cleaning Regex: Remove special chars, brackets, URLs
    const cleanText = allText
        .replace(/\[.*?\]/g, '') // remove [brackets]
        .replace(/\(.*?\) /g, '') // remove (parentheses)
        .replace(/[^\w\s가-힣]/g, ' ') // remove special chars
        .replace(/https?:\/\/[^\s]+/g, ''); // remove URLs

    // 2. Stopwords List (Noise Filter)
    const stopWords = new Set([
        'by', '한국어', 'english', 'investing', 'investingcom', 'daum', 'net', 'naver', 'google', 'reuters',
        '기자', '속보', '단독', '종합', '특징주', '마감', '출발', '오전', '오후', '공시', '뉴스', '오늘', '관련',
        '코스피', '코스닥', '지수', '증시', '시장', '전망', '분석', '이슈', '테마', '섹터', '주가', '상승', '하락',
        '거래', '매수', '매도', '개장', '폐장', '동향', '실적', '발표', '예상', '대비', '기록', '달러', '환율',
        '은', '는', '이', '가', '을', '를', '의', '에', '와', '과', '로', '도', '만', '서', 'com', 'co', 'kr',
        'newsis', 'yna', 'sedaily', 'hankyung', 'mk', 'edaily', 'etnews', 'mt', 'asiae', 'fnnews'
    ]);

    const words = cleanText.split(/\s+/)
        .filter(w => {
            const word = w.toLowerCase().trim();
            // Length check (>1)
            if (word.length <= 1) return false;
            // Number restriction (exclude purely numeric or money-like strings)
            if (/^\d+$/.test(word)) return false;
            // Stopwords check
            if (stopWords.has(word)) return false;
            // Domain check
            if (word.includes('.')) return false;
            return true;
        });

    const freq = {};
    words.forEach(w => freq[w] = (freq[w] || 0) + 1);

    // Sort and Take Top 10
    const trendKeywords = Object.entries(freq)
        .sort((a, b) => b[1] - a[1]) // High frequency first
        .slice(0, 10)
        .map(e => e[0]);

    // C. Sector Flows (Semicon, AI, Battery, etc)
    const majorSectors = ['반도체', 'AI', '2차전지', '바이오'];
    const sectorFlows = {};
    majorSectors.forEach(sec => {
        sectorFlows[sec] = news.filter(n => n.tags.includes(sec)).slice(0, 3);
    });

    return (
        <main className={styles.main}>
            <div className={styles.container}>

                {/* [Block 1] Word Cloud (Hero) */}
                <section className={styles.hero}>
                    <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>
                            <span style={{ color: '#00dbbd' }}>Anti-Stock</span> Market Hub
                        </h1>
                        <p style={{ color: '#888' }}>AI가 분석한 실시간 증시 트렌드</p>
                    </div>
                    <WordCloud keywords={trendKeywords.map((t, i) => ({ text: t, count: 10 - i }))} />
                </section>

                {/* [New Block] Popular Stock Hubs */}
                <section className={styles.stockHubBlock} style={{ marginBottom: '40px' }}>
                    <h2 className={styles.blockTitle}>🔥 인기 종목 허브 바로가기</h2>
                    <div className={styles.stockHubGrid}>
                        {popularStocks.map(stock => (
                            <Link key={stock.symbol} href={`/stock/${Object.keys(STOCK_DATA).find(key => STOCK_DATA[key] === stock)}`} className={styles.stockHubCard}>
                                <span className={styles.stockName}>{stock.name}</span>
                                <span className={styles.stockSymbol}>{stock.symbol}</span>
                            </Link>
                        ))}
                    </div>
                </section>



                {/* [Updated Block] SEO High-Value Guides */}
                <section className={styles.stockHubBlock} style={{ marginBottom: '40px' }}>
                    <h2 className={styles.blockTitle}>💰 돈이 되는 필수 투자 가이드</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '15px' }}>
                        {[
                            { title: '🇺🇸 미국주식 세금 총정리', url: '/money/us-stocks/tax', desc: '양도세 절세 꿀팁' },
                            { title: '💸 미국 배당세 완전정복', url: '/money/us-stocks/dividend-tax', desc: '15% 원천징수의 비밀' },
                            { title: '🏆 수익률 Best ETF 10선', url: '/money/etf/best', desc: '지금 사야 할 ETF' },
                            { title: '🗓️ 월배당 ETF 포트폴리오', url: '/money/dividend/monthly', desc: '매월 따박따박 월세받기' },
                            { title: '🤖 AI 반도체 유망주 분석', url: '/money/etf/ai', desc: '엔비디아 놓쳤다면 주목' },
                            { title: '📉 금리인하 수혜주 찾기', url: '/money/market-guide/interest', desc: '금리 인하 시기 투자법' },
                        ].map((item, idx) => (
                            <Link key={idx} href={item.url} style={{ background: '#222', padding: '20px', borderRadius: '12px', border: '1px solid #333', transition: 'all 0.2s', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                <span style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#00dbbd' }}>{item.title}</span>
                                <span style={{ fontSize: '0.9rem', color: '#888' }}>{item.desc}</span>
                            </Link>
                        ))}
                    </div>
                </section>

                <AdSenseSlot id="ad-home-top" />

                {/* [Block 2] Daily Market Summary */}
                <section className={styles.summaryBlock}>
                    <h2 className={styles.blockTitle}>📅 오늘의 시장 요약 ({format(new Date(), 'M월 d일', { locale: ko })})</h2>
                    <div className={styles.summaryGrid}>
                        <div className={styles.summaryItem}>
                            <h3>🇰🇷 국내 증시 흐름</h3>
                            <p>{domesticSummary} ...</p>
                        </div>
                        <div className={styles.summaryItem}>
                            <h3>🇺🇸 해외 증시 흐름</h3>
                            <p>{overseasSummary} ...</p>
                        </div>
                    </div>
                </section>

                <AdSenseSlot id="ad-home-mid" />

                {/* [3. Most Read News] styled as Latest News */}
                <section className={styles.section}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h2 className={styles.blockTitle}>📰 사람들이 가장 많이 읽는 뉴스</h2>
                        <Link href="/news" style={{ color: '#00dbbd', fontSize: '0.9rem' }}>뉴스 더보기 →</Link>
                    </div>
                    <div className={styles.grid}>
                        {news.slice(0, 6).map((item) => (
                            <NewsCard key={item.id} news={item} />
                        ))}
                    </div>
                </section>

                {/* [Block 4] Sector Flow */}
                {/* [4. Sector Hubs] */}
                <section className={styles.section}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h2 className={styles.blockTitle}>📊 섹터별 흐름 바로가기</h2>
                        <Link href="/topic" style={{ color: '#00dbbd', fontSize: '0.9rem' }}>전체보기 →</Link>
                    </div>
                    <div className={styles.sectorGrid}>
                        {majorSectors.map(sector => (
                            <div key={sector} className={styles.sectorColumn}>
                                <h3 className={styles.sectorTitle}>
                                    <Link href={`/topic/${sector}`}>{sector} ➤</Link>
                                </h3>
                                <div className={styles.miniList}>
                                    {sectorFlows[sector].length > 0 ? (
                                        sectorFlows[sector].map(item => (
                                            <Link key={item.id} href={`/news/${item.id}`} className={styles.miniNews}>
                                                <span className={styles.miniTitle}>• {item.title}</span>
                                            </Link>
                                        ))
                                    ) : (
                                        <p style={{ color: '#666', fontSize: '0.8rem' }}>최신 뉴스 없음</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* [5. Trends] Real-time Trend Keywords */}
                <section className={styles.trendBlock}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h2 className={styles.blockTitle}>📈 실시간 트렌드 키워드</h2>
                        <Link href="/topic" style={{ color: '#00dbbd', fontSize: '0.9rem' }}>키워드 더보기 →</Link>
                    </div>
                    <div className={styles.chipContainer}>
                        {trendKeywords.map((k, i) => (
                            <Link key={k} href={`/topic/${k}`} className={styles.trendChip}>
                                <span className={styles.rank}>{i + 1}</span> {k}
                            </Link>
                        ))}
                    </div>
                </section>

                <AdSenseSlot id="ad-home-bottom" />

            </div>
        </main >
    );
}
