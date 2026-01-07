const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

// Load existing news
const newsPath = path.join(__dirname, '../data/news.json');
const allNews = JSON.parse(fs.readFileSync(newsPath, 'utf8'));

// Init Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase URL or Service Role Key in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
    console.log(`🚀 Seeding ${allNews.length} news items to Supabase...`);

    let successCount = 0;
    let failCount = 0;

    // Batch insert (or loop for safety/debug)
    for (const news of allNews) {
        // Map JSON structure to DB Schema
        const { error } = await supabase
            .from('news')
            .upsert({
                slug: news.id, // ID in JSON is mapped to slug in DB
                title: news.title,
                url: news.originalLink,
                source: news.source || 'Unknown',
                region: news.category || 'Domestic', // Mapping 'category' to 'region'
                sector: null, // Basic seed doesn't have detailed sector
                theme: null,
                tags: news.tags || [],
                summary: news.summary,
                importance: news.fullDescription || news.summary,
                image_url: news.imageUrl || null,
                published_at: news.pubDate ? new Date(news.pubDate) : new Date(),
                created_at: new Date()
            }, { onConflict: 'slug' });

        if (error) {
            console.error(`❌ Failed: ${news.title}`, error.message);
            failCount++;
        } else {
            process.stdout.write('.');
            successCount++;
        }
    }

    console.log(`\n\n✅ Seeding Complete! Success: ${successCount}, Failed: ${failCount}`);
}

seed();
