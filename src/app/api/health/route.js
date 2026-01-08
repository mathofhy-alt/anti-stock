import { supabaseAdmin } from '@/lib/supabase-admin';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    const health = {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        checks: {
            supabase: 'unknown',
            news_freshness: 'unknown',
            gemini_config: 'unknown'
        }
    };

    try {
        // 1. Supabase Connection & News Freshness Check
        const { data: latestNews, error } = await supabaseAdmin
            .from('news')
            .select('published_at')
            .order('published_at', { ascending: false })
            .limit(1)
            .single();

        if (error) {
            health.checks.supabase = 'failed';
            health.status = 'unhealthy';
            console.error('Health Check Supabase Error:', error);
        } else {
            health.checks.supabase = 'connected';

            // Check Freshness (Threshold: 24 hours)
            if (latestNews) {
                const lastUpdate = new Date(latestNews.published_at);
                const now = new Date();
                const diffHours = (now - lastUpdate) / (1000 * 60 * 60);

                health.checks.news_freshness = {
                    last_update: latestNews.published_at,
                    hours_ago: Math.round(diffHours * 10) / 10,
                    status: diffHours < 24 ? 'fresh' : 'stale'
                };

                if (diffHours >= 24) {
                    health.status = 'degraded'; // Not critical failure but stale
                }
            } else {
                health.checks.news_freshness = 'no_data';
            }
        }

        // 2. Gemini Config Check
        if (process.env.GEMINI_API_KEY) {
            health.checks.gemini_config = 'configured';
        } else {
            health.checks.gemini_config = 'missing_key';
            health.status = 'degraded';
        }

        // 3. Overall Vercel/Cron Check (Implicit)
        // If this endpoint is reachable, Vercel is up.

        return NextResponse.json(health, { status: health.status === 'unhealthy' ? 503 : 200 });

    } catch (error) {
        return NextResponse.json({
            status: 'critical',
            error: error.message
        }, { status: 500 });
    }
}
