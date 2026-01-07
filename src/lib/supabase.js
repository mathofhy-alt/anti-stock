import { createClient } from '@supabase/supabase-js';

// Public Client (For Frontend)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.warn("⚠️ Supabase Env Vars missing in this environment.");
    console.log("NEXT_PUBLIC_SUPABASE_URL:", supabaseUrl ? `${supabaseUrl.slice(0, 10)}...` : "UNDEFINED");
    console.log("NEXT_PUBLIC_SUPABASE_ANON_KEY:", supabaseKey ? "SET" : "UNDEFINED");
}

export const supabase = createClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseKey || 'placeholder'
);
