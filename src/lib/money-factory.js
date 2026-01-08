import { MONEY_LONGTAIL_DATA } from '@/data/moneyLongtailData';

// 1. Get Data for a specific slug
export function getMoneyPageData(category, slug) {
    const categoryData = MONEY_LONGTAIL_DATA[category];
    if (!categoryData) return null;
    return categoryData[slug] || null;
}

// 2. Generate Metadata
export function generateMoneyMetadata(category, slug) {
    const data = getMoneyPageData(category, slug);
    if (!data) return { title: '페이지를 찾을 수 없습니다' };

    const url = `https://info.stac100.com/money/${category}/${slug}`;

    return {
        title: data.title,
        description: data.description,
        alternates: {
            canonical: url,
        },
        openGraph: {
            title: data.title,
            description: data.description,
            url: url,
            type: 'article',
            images: [
                {
                    url: `https://info.stac100.com/api/og?title=${encodeURIComponent(data.title)}&category=${encodeURIComponent(category)}&tags=${encodeURIComponent((data.tags || []).join(','))}`,
                    width: 1200,
                    height: 630,
                    alt: data.title,
                }
            ]
        },
        twitter: {
            card: 'summary_large_image',
            title: data.title,
            description: data.description,
            images: [`https://info.stac100.com/api/og?title=${encodeURIComponent(data.title)}&category=${encodeURIComponent(category)}&tags=${encodeURIComponent((data.tags || []).join(','))}`],
        }
    };
}

// 3. Generate Static Params (for build time generation)
export function generateMoneyStaticParams(category) {
    const categoryData = MONEY_LONGTAIL_DATA[category];
    if (!categoryData) return [];

    return Object.keys(categoryData).map(slug => ({
        slug: slug
    }));
}

// 4. Generate JSON-LD (FAQPage + Breadcrumb)
export function generateMoneyJsonLd(category, slug, data) {
    if (!data) return null;

    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': data.faq ? data.faq.map(item => ({
            '@type': 'Question',
            'name': item.q,
            'acceptedAnswer': {
                '@type': 'Answer',
                'text': item.a
            }
        })) : []
    };

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
            {
                '@type': 'ListItem',
                'position': 1,
                'name': 'Home',
                'item': 'https://info.stac100.com'
            },
            {
                '@type': 'ListItem',
                'position': 2,
                'name': 'Money',
                'item': 'https://info.stac100.com/money'
            },
            {
                '@type': 'ListItem',
                'position': 3,
                'name': category.toUpperCase(),
                'item': `https://info.stac100.com/money/${category}`
            },
            {
                '@type': 'ListItem',
                'position': 4,
                'name': data.h1,
                'item': `https://info.stac100.com/money/${category}/${slug}`
            }
        ]
    };

    return { faqSchema, breadcrumbSchema };
}
// 5. Get Recommendation (Next Read)
export function getRecommendation(currentCategory, currentSlug) {
    const categoryData = MONEY_LONGTAIL_DATA[currentCategory];
    if (!categoryData) return null;

    const slugs = Object.keys(categoryData);
    const currentIndex = slugs.indexOf(currentSlug);

    // Circular Next: if last, go to first
    const nextIndex = (currentIndex + 1) % slugs.length;
    const nextSlug = slugs[nextIndex];

    return {
        slug: nextSlug,
        url: `/money/${currentCategory}/${nextSlug}`,
        ...categoryData[nextSlug]
    };
}

// 6. Get High Value Page (Cross-Category)
export function getHighValuePage() {
    // Priority List: Tax > Dividend > Etc
    const priorityTargets = [
        { c: 'us-stocks', s: 'tax' },
        { c: 'dividend', s: 'monthly-dividend-realty-income-o' },
        { c: 'etf', s: 'monthly-dividend-etf-list' },
        { c: 'us-stocks', s: 'dividend-tax-reclaim' }
    ];

    // Randomly pick one to avoid fatigue
    const target = priorityTargets[Math.floor(Math.random() * priorityTargets.length)];
    const data = getMoneyPageData(target.c, target.s);

    if (!data) return null;

    return {
        url: `/money/${target.c}/${target.s}`,
        ...data
    };
}

// 7. Get Contextual Money Pages (Scoring System)
export function getContextualMoneyPages(text, limit = 4) {
    if (!text) return [];

    const searchTerms = text.toLowerCase().split(/\s+/).filter(w => w.length > 1);
    const scoredPages = [];

    // Flatten Data
    Object.keys(MONEY_LONGTAIL_DATA).forEach(category => {
        Object.keys(MONEY_LONGTAIL_DATA[category]).forEach(slug => {
            const page = MONEY_LONGTAIL_DATA[category][slug];
            let score = 0;

            // 1. High Value Bias
            if (category === 'us-stocks' && page.slug.includes('tax')) score += 20; // Tax is King
            if (page.specialComponent) score += 20; // Calculators are King
            if (category === 'etf') score += 10;
            if (category === 'dividend') score += 5;

            // 2. Keyword Matching
            const pageText = (page.title + " " + page.h1 + " " + (page.tags || []).join(" ")).toLowerCase();

            // Speed optimization: Check common keywords first
            if (text.includes('배당') && pageText.includes('배당')) score += 15;
            if (text.includes('세금') && pageText.includes('세금')) score += 20;
            if (text.includes('etf') && pageText.includes('etf')) score += 10;

            // 3. Fallback Random Shuffle (to ensure variety if score is 0)
            score += Math.random() * 2;

            scoredPages.push({
                ...page,
                url: `/money/${category}/${slug}`,
                score
            });
        });
    });

    // Sort by Score Desc
    return scoredPages.sort((a, b) => b.score - a.score).slice(0, limit);
}
