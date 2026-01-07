import styles from '../page.module.css';

export default function GuidePage() {
    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>주식 초보자 가이드</h2>

                    <div style={{ background: '#1e1e1e', padding: '30px', borderRadius: '12px', border: '1px solid #333' }}>
                        <h3 style={{ color: '#00dbbd' }}>1. 주식이란 무엇인가요?</h3>
                        <p style={{ color: '#ccc', lineHeight: '1.6', marginBottom: '20px' }}>
                            주식은 회사의 소유권을 잘게 쪼갠 증서입니다. 주식을 사면 회사의 주인이 되어, 회사의 이익을 배당금으로 받거나 주가 상승으로 인한 차익을 얻을 수 있습니다.
                        </p>

                        <h3 style={{ color: '#00dbbd' }}>2. 코스피 vs 코스닥</h3>
                        <p style={{ color: '#ccc', lineHeight: '1.6', marginBottom: '20px' }}>
                            <strong>코스피(KOSPI)</strong>는 삼성전자, 현대차 같은 대기업들이 주로 상장된 시장입니다.<br />
                            <strong>코스닥(KOSDAQ)</strong>은 IT, 바이오 등 성장 잠재력이 큰 중소/벤처 기업들이 많은 시장입니다.
                        </p>

                        <h3 style={{ color: '#00dbbd' }}>3. 해외 주식 시작하기</h3>
                        <p style={{ color: '#ccc', lineHeight: '1.6' }}>
                            미국 주식은 전 세계 시가총액의 60% 이상을 차지합니다. '서학개미'가 되어 애플, 테슬라, 엔비디아 등 글로벌 기업에 투자해보세요. 환율 변동에 유의해야 합니다.
                        </p>
                    </div>
                </section>
            </div>
        </main>
    );
}
