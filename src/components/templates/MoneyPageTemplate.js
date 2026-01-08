import Link from 'next/link';
import Script from 'next/script';
import { getMoneyPageData, generateMoneyJsonLd, getRecommendation, getHighValuePage } from '@/lib/money-factory';
import ScrollRetentionEngine from '@/components/Retention/ScrollRetentionEngine';
import AdSenseSlot from '@/components/AdSenseSlot/AdSenseSlot';
import TableOfContents from '@/components/TableOfContents/TableOfContents'; // [NEW]
import TaxCalculator from '@/components/calculators/TaxCalculator'; // Static Import
import RetirementSimulator from '@/components/calculators/RetirementSimulator'; // Static Import
import styles from './MoneyPageTemplate.module.css';

export default function MoneyPageTemplate({ category, slug }) {
    const data = getMoneyPageData(category, slug);

    if (!data) {
        return <div className={styles.container}>페이지를 찾을 수 없습니다.</div>;
    }

    // Component Map
    const SpecialComponents = {
        'TaxCalculator': TaxCalculator,
        'RetirementSimulator': RetirementSimulator
    };
    const SpecialComponent = data.specialComponent ? SpecialComponents[data.specialComponent] : null;

    const { faqSchema, breadcrumbSchema } = generateMoneyJsonLd(category, slug, data);

    // Revenue Logic
    const isHighIntent = data.commercialIntent === 'high';
    const nextGuide = getRecommendation(category, slug);
    const highValueGuide = getHighValuePage();

    return (
        <main className={styles.container}>
            {/* Table of Contents (Desktop Sticky) */}
            <TableOfContents contentSelector={`.${styles.content}`} />

            {/* Scroll Retention Engine (Client Component) */}
            <ScrollRetentionEngine nextGuide={nextGuide} highValueGuide={highValueGuide} />

            {/* JSON-LD Structured Data */}
            <Script
                id="json-ld-faq"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <Script
                id="json-ld-breadcrumb"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            {/* Breadcrumb */}
            <nav className={styles.breadcrumb}>
                <Link href="/">Home</Link> &gt;
                <Link href="/money">Money</Link> &gt;
                <Link href={`/money/${category}`} className={styles.categoryLink}>{category.toUpperCase()}</Link>
            </nav>

            {/* Header */}
            <header className={styles.header}>
                <h1 className={styles.title}>{data.h1}</h1>
                <p className={styles.description}>{data.description}</p>
                <div className={styles.tags}>
                    {data.tags && data.tags.map(t => <span key={t} className={styles.tag}>#{t}</span>)}
                </div>
            </header>

            {/* [REVENUE 1] Top: Best Earning Guides Block */}
            <section className={styles.topRevenueBlock} style={{ marginBottom: '30px', padding: '15px', background: '#f8f9fa', borderRadius: '8px', border: '1px solid #e9ecef' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '10px', color: '#2c3e50' }}>🔥 사람들이 가장 많이 돈 버는 가이드</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '8px' }}>
                    <Link href="/money/us-stocks/tax" style={{ textDecoration: 'none', color: '#007bff', fontSize: '0.9rem', fontWeight: 'bold' }}>🇺🇸 미국주식 세금</Link>
                    <Link href="/money/dividend/monthly-dividend-realty-income-o" style={{ textDecoration: 'none', color: '#007bff', fontSize: '0.9rem', fontWeight: 'bold' }}>💸 월배당 리얼티인컴</Link>
                    <Link href="/money/etf/best-us-etf-2025" style={{ textDecoration: 'none', color: '#007bff', fontSize: '0.9rem', fontWeight: 'bold' }}>📈 2025 추천 ETF</Link>
                    <Link href="/money/us-stocks/capital-gains-calculator" style={{ textDecoration: 'none', color: '#007bff', fontSize: '0.9rem', fontWeight: 'bold' }}>🧮 양도세 계산기</Link>
                    <Link href="/money/dividend/high-dividend-etf-ranking" style={{ textDecoration: 'none', color: '#007bff', fontSize: '0.9rem', fontWeight: 'bold' }}>🏆 고배당 ETF 순위</Link>
                    <Link href="/money/etf/sp500-etf-spy-voo-ivv" style={{ textDecoration: 'none', color: '#007bff', fontSize: '0.9rem', fontWeight: 'bold' }}>📊 S&P500 비교</Link>
                </div>
            </section>

            {/* [REVENUE] Ad Spot: Top (High Intent Only) */}
            {isHighIntent && (
                <AdSenseSlot id="money-content-top" slot="2605345903" style={{ marginBottom: '30px' }} />
            )}


            {/* Intro */}
            <section className={styles.intro}>
                {data.intro.map((para, idx) => (
                    <p key={idx} className={styles.text}>{para}</p>
                ))}
            </section>

            {/* Special Component Injection (Calculator, Simulator, etc) */}
            {SpecialComponent && (
                <section style={{ marginBottom: '40px' }}>
                    <SpecialComponent />
                </section>
            )}

            {/* Main Sections */}
            <article className={styles.content}>
                {data.sections.map((section, idx) => (
                    <section key={idx} className={styles.section}>
                        <h2 className={styles.heading}>{section.h2}</h2>
                        <p className={styles.text}>{section.content}</p>

                        {/* Table Render */}
                        {section.table && (
                            <div className="table-responsive" style={{ overflowX: 'auto', margin: '20px 0' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr>
                                            {section.table.headers.map((h, i) => (
                                                <th key={i} style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left', backgroundColor: '#f2f2f2', color: '#333' }}>{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {section.table.rows.map((row, r) => (
                                            <tr key={r} style={{ backgroundColor: r % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                                                {row.map((cell, c) => (
                                                    <td key={c} style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>{cell}</td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* [REVENUE 2] Mid: Trending Money Topics */}
                        {(idx === 1) && (
                            <div className={styles.midRevenueBlock} style={{ margin: '40px 0', padding: '20px', background: '#eef2f5', borderRadius: '8px' }}>
                                <h4 style={{ margin: '0 0 10px 0', color: '#444' }}>⚡ 지금 많이 찾는 돈 되는 글</h4>
                                <ul style={{ margin: 0, paddingLeft: '20px' }}>
                                    <li style={{ marginBottom: '5px' }}><Link href="/money/us-stocks/us-stock-tax-saving-tips">세금 250만원 아끼는 절세 비법 5가지</Link></li>
                                    <li style={{ marginBottom: '5px' }}><Link href="/money/dividend/monthly-dividend-portfolio-1m">월 100만원 배당 받는 포트폴리오 공개</Link></li>
                                    <li><Link href="/money/etf/jepi-jepq-comparison">JEPI vs JEPQ: 은퇴자를 위한 선택은?</Link></li>
                                </ul>
                            </div>
                        )}

                        {/* Ad Spot: Mid */}
                        {(idx === (isHighIntent ? 0 : 2)) && (
                            <AdSenseSlot id="money-content-mid" slot="2605345903" style={{ margin: '40px 0' }} />
                        )}
                    </section>
                ))}
            </article>

            {/* FAQ Section */}
            {data.faq && data.faq.length > 0 && (
                <section className={styles.faqSection}>
                    <h2 className={styles.heading}>💡 자주 묻는 질문 (FAQ)</h2>
                    <div className={styles.faqList}>
                        {data.faq.map((item, idx) => (
                            <div key={idx} className={styles.faqItem}>
                                <div className={styles.question} style={{ fontWeight: 'bold', color: '#333' }}>Q. {item.q}</div>
                                <div className={styles.answer} style={{ marginTop: '5px', color: '#555', lineHeight: '1.6' }}>A. {item.a}</div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* [REVENUE 4] Dynamic Next Hubs Steps (Contextual) */}
            {data.nextHubs && data.nextHubs.length > 0 && (
                <section className={styles.nextHubs} style={{ marginTop: '40px', padding: '20px', background: '#e8f6f3', borderRadius: '12px', border: '1px solid #d1f2eb' }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '15px', color: '#16a085', textAlign: 'center' }}>🚀 부의 추월차선: 다음 단계로 이동하기</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
                        {data.nextHubs.map((hub, idx) => (
                            <Link key={idx} href={hub.url} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                background: '#fff',
                                padding: '15px',
                                borderRadius: '8px',
                                textDecoration: 'none',
                                border: '1px solid #eee',
                                boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                                fontWeight: 'bold',
                                color: '#333'
                            }}>
                                <span>{idx + 1}. {hub.title}</span>
                                <span style={{ color: '#16a085' }}>이동 ❯</span>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* [REVENUE 3] Bottom: Circular Internal Link Grid */}
            <section className={styles.bottomRevenueGrid} style={{ marginTop: '50px', borderTop: '2px solid #eee', paddingTop: '30px' }}>
                <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>💰 부자 되는 로드맵 (다음 단계)</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                    {/* Tax Col */}
                    <div style={{ background: '#fff', border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
                        <div style={{ fontWeight: 'bold', marginBottom: '10px', color: '#e74c3c' }}>1. 세금 아끼기</div>
                        <Link href="/money/us-stocks/tax" style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', color: '#333', textDecoration: 'none' }}>→ 양도세 신고 공략</Link>
                        <Link href="/money/us-stocks/tax-accountant-cost" style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', color: '#333', textDecoration: 'none' }}>→ 세무사 비용 비교</Link>
                    </div>
                    {/* Dividend Col */}
                    <div style={{ background: '#fff', border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
                        <div style={{ fontWeight: 'bold', marginBottom: '10px', color: '#f39c12' }}>2. 배당 받기</div>
                        <Link href="/money/dividend/monthly-dividend-realty-income-o" style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', color: '#333', textDecoration: 'none' }}>→ 리얼티인컴 월배당</Link>
                        <Link href="/money/dividend/schd-vs-vym-comparison" style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', color: '#333', textDecoration: 'none' }}>→ SCHD vs VYM</Link>
                    </div>
                    {/* ETF Col */}
                    <div style={{ background: '#fff', border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
                        <div style={{ fontWeight: 'bold', marginBottom: '10px', color: '#3498db' }}>3. ETF 모으기</div>
                        <Link href="/money/etf/best-us-etf-2025" style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', color: '#333', textDecoration: 'none' }}>→ 2025 유망 ETF</Link>
                        <Link href="/money/etf/sp500-etf-spy-voo-ivv" style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', color: '#333', textDecoration: 'none' }}>→ S&P500 수수료 비교</Link>
                    </div>
                    {/* Portfolio Col */}
                    <div style={{ background: '#fff', border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
                        <div style={{ fontWeight: 'bold', marginBottom: '10px', color: '#2ecc71' }}>4. 포트폴리오</div>
                        <Link href="/money/etf/etf-portfolio-guide" style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', color: '#333', textDecoration: 'none' }}>→ 60/40 자산 배분</Link>
                        <Link href="/money/etf/retirement-etf-portfolio" style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', color: '#333', textDecoration: 'none' }}>→ 은퇴 대비 포트폴리오</Link>
                    </div>
                </div>
            </section>

            {/* Ad Spot: Bottom */}
            <AdSenseSlot id="money-content-bottom" slot="2605345903" style={{ marginTop: '40px', background: '#f8f8f8', padding: '10px' }} />
        </main>
    );
}
