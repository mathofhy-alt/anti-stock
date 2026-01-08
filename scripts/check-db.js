
const { createClient } = require('@supabase/supabase-client');
require('dotenv').config();

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkNews() {
    const { data, error } = await supabase
        .from('news')
        .select('title, published_at, source, hash')
        .order('published_at', { ascending: false })
        .limit(10);

    if (error) {
        console.error('Error:', error);
        return;
    }

    console.log('--- Latest News in DB ---');
    data.forEach(n => {
        console.log(`[${n.source}] ${n.published_at} - ${n.title}`);
    });
}

checkNews();
