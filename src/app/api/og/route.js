import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const title = searchParams.get('title') || '안티 주식';
        const category = searchParams.get('category') || 'Money Guide';
        const tags = searchParams.get('tags') ? searchParams.get('tags').split(',') : [];

        // Font: Noto Sans KR (Standard) - Fetching from Google Fonts
        // In edge runtime, we usually need to fetch the font buffer.
        // For simplicity/stability, we can omit custom font first or try to use system sans-serif.
        // But @vercel/og supports standard fonts. Let's try standard fetch if needed, 
        // or just rely on default to ensure it works first.

        return new ImageResponse(
            (
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        backgroundColor: '#111',
                        padding: '40px 80px',
                    }}
                >
                    {/* Background Pattern */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: 'radial-gradient(circle at 25px 25px, #333 2%, transparent 0%), radial-gradient(circle at 75px 75px, #333 2%, transparent 0%)',
                        backgroundSize: '100px 100px',
                        opacity: 0.2,
                    }} />

                    {/* Logo / Brand */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '20px',
                        color: '#00dbbd',
                        fontSize: 32,
                        fontWeight: 'bold',
                        letterSpacing: '-0.05em'
                    }}>
                        ANTISTOCK
                    </div>

                    {/* Category Label */}
                    <div style={{
                        backgroundColor: '#333',
                        color: '#bbb',
                        padding: '4px 16px',
                        borderRadius: '20px',
                        fontSize: 24,
                        marginBottom: '20px',
                        textTransform: 'uppercase',
                        fontWeight: 600
                    }}>
                        {category}
                    </div>

                    {/* Title */}
                    <div style={{
                        fontSize: 64,
                        fontWeight: 900,
                        color: 'white',
                        lineHeight: 1.2,
                        marginBottom: '30px',
                        textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                        maxWidth: '900px',
                        // ellipsis...
                    }}>
                        {title}
                    </div>

                    {/* Tags */}
                    {tags.length > 0 && (
                        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                            {tags.slice(0, 3).map(tag => (
                                <div key={tag} style={{
                                    fontSize: 24,
                                    color: '#00dbbd',
                                    border: '2px solid #00dbbd',
                                    padding: '4px 20px',
                                    borderRadius: '50px',
                                }}>
                                    #{tag}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ),
            {
                width: 1200,
                height: 630,
            },
        );
    } catch (e) {
        console.log(`${e.message}`);
        return new Response(`Failed to generate the image`, {
            status: 500,
        });
    }
}
