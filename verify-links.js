const fs = require('fs');
const path = require('path');

// 1. Load Data
const dataPath = path.join(__dirname, 'src/data/moneyLongtailData.js');
// We need to read it as text and eval/parse it because it's an ES module (export const).
// Simple hack for this environment: Read file, strip "export const MONEY_LONGTAIL_DATA =", and JSON.parse?
// No, it's a JS object with comments. Let's simpler:
// just require it if we can use babel, but we can't easily.
// Let's use string matching for keys.

const dataContent = fs.readFileSync(dataPath, 'utf8');
const validPaths = new Set();

// Extract Categories and Slugs
// Pattern: "category": {
//     "slug": {
const categoryRegex = /^\s{4}"([^"]+)":\s*{/gm;
const slugRegex = /^\s{8}"([^"]+)":\s*{/gm;

let currentCategory = '';
const lines = dataContent.split('\n');

lines.forEach(line => {
    // Check Category
    const catMatch = line.match(/^\s{4}"([^"]+)":\s*{/);
    if (catMatch) {
        currentCategory = catMatch[1];
        return;
    }

    // Check Slug (only if we have a category)
    if (currentCategory) {
        const slugMatch = line.match(/^\s{8}"([^"]+)":\s*{/);
        if (slugMatch) {
            validPaths.add(`/money/${currentCategory}/${slugMatch[1]}`);
        }
    }
});

console.log(`✅ Loaded ${validPaths.size} valid pages.`);

// 2. Scan Template for Links
const templatePath = path.join(__dirname, 'src/components/templates/MoneyPageTemplate.js');
const templateContent = fs.readFileSync(templatePath, 'utf8');

const linkRegex = /href=["'](\/money\/[^"']+)["']/g;
let match;
const foundLinks = new Set();

while ((match = linkRegex.exec(templateContent)) !== null) {
    foundLinks.add(match[1]);
}

// 3. Scan Data for "nextHubs" links
// Pattern: url: "/money/..."
const nextHubsRegex = /url:\s*["'](\/money\/[^"']+)["']/g;
while ((match = nextHubsRegex.exec(dataContent)) !== null) {
    foundLinks.add(match[1]);
}

console.log(`🔍 Found ${foundLinks.size} internal links to check.`);

// 4. Verify
let errors = 0;
foundLinks.forEach(link => {
    // Ignore parameter slugs
    if (link.includes('${') || link.includes('[slug]')) return;

    if (!validPaths.has(link)) {
        console.error(`❌ BROKEN LINK: ${link}`);
        errors++;
    } else {
        // console.log(`ok: ${link}`);
    }
});

if (errors === 0) {
    console.log("🎉 ALL LINKS ARE VALID!");
} else {
    console.log(`⚠️ Found ${errors} broken links.`);
}
