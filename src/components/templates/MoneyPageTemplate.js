import Link from 'next/link';
import Script from 'next/script';
import { getMoneyPageData, generateMoneyJsonLd, getRecommendation, getHighValuePage } from '@/lib/money-factory';
import ScrollRetentionEngine from '@/components/Retention/ScrollRetentionEngine';
import styles from './MoneyPageTemplate.module.css';

export default function MoneyPageTemplate({ category, slug }) {
    const data = getMoneyPageData(category, slug);

    if (!data) {
        return <div className={styles.container}>페이지를 찾을 수 없습니다.</div>;
    }

    const { faqSchema, breadcrumbSchema } = generateMoneyJsonLd(category, slug, data);

    // Revenue Logic
    const isHighIntent = data.commercialIntent === 'high';
    const nextGuide = getRecommendation(category, slug);
    const highValueGuide = getHighValuePage();

    return (
        <main className={styles.container}>
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

            {/* Ad Spot: Top */}
            <div className="ad-box top" style={{ marginBottom: '30px', border: isHighIntent ? '2px solid #00dbbd' : '1px solid #333' }}>
                <span>Advertisement (Top){isHighIntent && " - Premium Slot"}</span>
            </div>

            {/* Intro */}
            <section className={styles.intro}>
                {data.intro.map((para, idx) => (
                    <p key={idx} className={styles.text}>{para}</p>
                ))}
            </section>

            {/* Extra Ad for High Intent (After Intro) */}
            {isHighIntent && (
                <div className="ad-box extra" style={{ margin: '20px 0', height: '100px', background: '#2a2a2a' }}>
                    <span>💡 Special Offer Ad (High Intent)</span>
                </div>
            )}

            {/* Main Sections */}
            <article className={styles.content}>
                {data.sections.map((section, idx) => (
                    <section key={idx} className={styles.section}>
                        <h2 className={styles.heading}>{section.h2}</h2>
                        <p className={styles.text}>{section.content}</p>

                        {/* Insert Mid Ad after 1st section if High Intent, else after 2nd */}
                        {(idx === (isHighIntent ? 0 : 1)) && (
                            <div className="ad-box mid" style={{ margin: '40px 0' }}>
                                <span>Advertisement (Mid)</span>
                            </div>
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
                                <div className={styles.question}>Q. {item.q}</div>
                                <div className={styles.answer}>A. {item.a}</div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* High Revenue Recommendation Block (Fixed for all money pages) */}
            <section className={styles.highRevenueBlock}>
                <h3>💰 돈이 되는 필수 가이드</h3>
                <div className={styles.revenueGrid}>
                    <Link href="/money/us-stocks/tax" className={styles.revenueCard}>
                        <span>🇺🇸 미국주식 세금 2025</span>
                    </Link>
                    <Link href="/money/dividend/monthly" className={styles.revenueCard}>
                        <span>💸 월배당 포트폴리오</span>
                    </Link>
                    <Link href="/money/etf/best" className={styles.revenueCard}>
                        <span>📈 추천 ETF TOP 5</span>
                    </Link>
                </div>
            </section>

            {/* Related Links (Contextual) */}
            <section className={styles.relatedSection}>
                <h3>🔗 더 읽어보기</h3>
                <div className={styles.relatedLinks}>
                    <Link href={nextGuide.url} className={styles.linkCard}>
                        👉 다음 글: {nextGuide.title}
                    </Link>
                </div>
            </section>

            {/* Ad Spot: Bottom */}
            <div className="ad-box bottom" style={{ marginTop: '40px' }}>
                <span>Advertisement (Bottom)</span>
            </div>
        </main>
    );
}
