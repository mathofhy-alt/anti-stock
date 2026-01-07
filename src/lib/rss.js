// 1. 모든 import는 파일 맨 위에 있어야 합니다.
import { supabase } from '@/lib/supabase';

/**
 * 최신 뉴스 목록을 가져오는 함수
 */
export async function getLatestNews() {
    // 2. Vercel 빌드 타임에 DB 호출을 건너뛰고 싶다면, 
    // export 내부에서 조건을 체크해야 합니다.
    if (process.env.VERCEL === "1") {
        console.log("⚠️ Build mode: skip rss fetch");
        return [];
    }

    try {
        // Supabase에서 데이터 가져오기
        const { data, error } = await supabase
            .from('news')
            .select('*')
            .order('published_at', { ascending: false })
            .limit(100);

        if (error) {
            console.error('Supabase Fetch Error:', error);
            return [];
        }

        if (!data) return [];

        // 데이터 매핑
        return data.map(item => ({
            id: item.slug,
            title: item.title,
            originalLink: item.url,
            pubDate: item.published_at,
            summary: item.summary,
            fullDescription: item.importance,
            category: item.region,
            tags: item.tags || [],
            source: item.source,
            sentiment: item.importance || 'neutral',
            imageUrl: item.image_url
        }));
    } catch (err) {
        console.error("⚠️ getLatestNews Exception:", err);
        return [];
    }
}

/**
 * 특정 ID(Slug)로 뉴스 상세 정보를 가져오는 함수
 */
export async function getNewsById(slug) {
    const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('slug', decodeURIComponent(slug))
        .single();

    if (error || !data) return null;

    return {
        id: data.slug,
        title: data.title,
        originalLink: data.url,
        pubDate: data.published_at,
        summary: data.summary,
        fullDescription: data.importance,
        category: data.region,
        tags: data.tags || [],
        source: data.source,
        sentiment: data.importance,
        imageUrl: data.image_url
    };
}

/**
 * 관련 뉴스 추천 함수
 */
export async function getRelatedNews(currentNews) {
    if (!currentNews) return [];

    const { data } = await supabase
        .from('news')
        .select('*')
        .neq('slug', currentNews.id)
        .order('published_at', { ascending: false })
        .limit(50);

    if (!data) return [];

    return data
        .map(n => ({
            id: n.slug,
            title: n.title,
            tags: n.tags || [],
            category: n.region,
            summary: n.summary,
            pubDate: n.published_at
        }))
        .map(n => {
            let score = 0;
            if (n.category === currentNews.category) score += 1;
            n.tags.forEach(t => { if (currentNews.tags.includes(t)) score += 3; });
            return { ...n, score };
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);
}