if (process.env.VERCEL === "1") {
    console.log("⚠️ Build mode: skip rss fetch");
    export async function getLatestNews() {
        return [];
    }
}

import { supabase } from '@/lib/supabase';

// Replaced JSON read with Supabase Query
export async function getLatestNews() {
    try {
        // 1. Fetch from DB
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

        // 2. Map DB keys to App keys
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
        console.error("⚠️ getLatestNews Exception (Network/DNS?):", err);
        return [];
    }
}

export async function getNewsById(slug) {
    // Direct DB Query by Slug
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

export async function getRelatedNews(currentNews) {
    if (!currentNews) return [];

    // Simple related logic via RPC or Client Filtering
    // Ideally use Supabase Text Search or RPC, but client-side filter of top 50 is fine for MVP
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
