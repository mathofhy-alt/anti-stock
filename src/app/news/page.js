
import { getLatestNews } from '@/lib/rss';
import NewsCard from '@/components/NewsCard/NewsCard';
import Link from 'next/link';

export const revalidate = 60;

export const metadata = {
    title: '전체 뉴스 - Anti-Stock',
    description: '실시간 증시 뉴스 모아보기',
};

export default async function NewsPage() {
    const news = await getLatestNews();

    return (
        <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h1 style={{ fontSize: '1.8rem' }}>📰 전체 뉴스</h1>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <Link href="/domestic" style={{ padding: '8px 16px', borderRadius: '20px', background: '#333', color: '#fff' }}>국내증시</Link>
                    <Link href="/overseas" style={{ padding: '8px 16px', borderRadius: '20px', background: '#333', color: '#fff' }}>해외증시</Link>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                {news.map((item) => (
                    <NewsCard key={item.id} news={item} />
                ))}
            </div>

            {news.length === 0 && (
                <div style={{ textAlign: 'center', padding: '50px', color: '#666' }}>
                    <p>등록된 뉴스가 없습니다.</p>
                </div>
            )}
        </main>
    );
}
