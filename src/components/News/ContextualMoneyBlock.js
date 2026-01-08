import Link from 'next/link';

export default function ContextualMoneyBlock({ guides }) {
    if (!guides || guides.length === 0) return null;

    // Icons mapping based on slug keywords
    const getIcon = (slug) => {
        if (slug.includes('tax')) return "🇺🇸";
        if (slug.includes('dividend')) return "💎";
        if (slug.includes('etf')) return "🚀";
        return "💰";
    };

    return (
        <div style={{
            marginTop: '50px',
            padding: '25px',
            background: 'linear-gradient(145deg, #1a2f26 0%, #111 100%)',
            borderRadius: '16px',
            border: '1px solid #00dbbd'
        }}>
            <h2 style={{ fontSize: '1.4rem', marginBottom: '20px', color: '#fff' }}>
                💰 이 뉴스를 본 분들이 관심 갖는 돈 버는 정보
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '15px' }}>
                {guides.map((guide, idx) => (
                    <Link key={idx} href={guide.url} style={{
                        display: 'flex',
                        flexDirection: 'column',
                        background: 'rgba(255,255,255,0.05)',
                        padding: '15px',
                        borderRadius: '12px',
                        border: '1px solid #333',
                        transition: 'transform 0.2s',
                        textDecoration: 'none'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                            <span style={{ fontSize: '1.5rem', marginRight: '10px' }}>{getIcon(guide.slug)}</span>
                            <strong style={{ color: '#00dbbd', fontSize: '1.05rem' }}>{guide.title}</strong>
                        </div>
                        <p style={{ margin: 0, color: '#aaa', fontSize: '0.9rem' }}>
                            {guide.description || guide.intro?.slice(0, 60) + "..."}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
