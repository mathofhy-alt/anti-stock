import Link from 'next/link';
import styles from './globals.css'; // Though we might use inline styles or existing globals

export default function NotFound() {
    return (
        <div style={{
            minHeight: '80vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            padding: '20px',
            background: 'var(--bg-color)',
            color: 'var(--text-color)'
        }}>
            <h1 style={{ fontSize: '4rem', marginBottom: '20px', color: 'var(--accent-color)' }}>404</h1>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>길을 잃으셨나요?</h2>
            <p style={{ color: '#888', marginBottom: '40px', maxWidth: '400px', lineHeight: '1.6' }}>
                찾으시는 페이지가 삭제되었거나 주소가 잘못되었습니다.<br />
                하지만 걱정 마세요. <strong>돈 버는 정보</strong>는 여기 다 있습니다.
            </p>

            <div style={{
                display: 'grid',
                gap: '15px',
                width: '100%',
                maxWidth: '400px'
            }}>
                <Link href="/money/us-stocks/tax" style={cardStyle}>
                    💰 <strong>세금 아끼는 법</strong> (조회수 1위)
                </Link>
                <Link href="/money/dividend/monthly-dividend-realty-income-o" style={cardStyle}>
                    💸 <strong>월배당 받는 법</strong> (인기)
                </Link>
                <Link href="/money/etf/best" style={cardStyle}>
                    📈 <strong>추천 ETF TOP 10</strong> (필독)
                </Link>
                <Link href="/" style={{
                    ...cardStyle,
                    background: 'transparent',
                    border: '1px solid var(--border-color)',
                    marginTop: '10px'
                }}>
                    🏠 홈으로 돌아가기
                </Link>
            </div>
        </div>
    );
}

const cardStyle = {
    display: 'block',
    padding: '15px 20px',
    background: 'var(--card-bg)',
    borderRadius: '12px',
    textDecoration: 'none',
    color: 'var(--text-color)',
    border: '1px solid var(--border-color)',
    transition: 'transform 0.2s, border-color 0.2s',
    fontSize: '1.1rem'
};
