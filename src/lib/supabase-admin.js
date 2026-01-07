import { createClient } from '@supabase/supabase-js';

// Admin Client (For API & Cron - can bypass RLS)
// Ensure process.env.SUPABASE_SERVICE_ROLE_KEY is set in Vercel
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    if (process.env.NODE_ENV === 'production') {
        console.warn("⚠️ Supabase Admin Env Vars missing.");
    }
}

export const supabaseAdmin = createClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseServiceKey || 'placeholder'
);
