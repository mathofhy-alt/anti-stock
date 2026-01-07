import { generateMoneyStaticParams, generateMoneyMetadata } from '@/lib/money-factory';
import MoneyPageTemplate from '@/components/templates/MoneyPageTemplate';

const CATEGORY = 'etf';

export async function generateStaticParams() {
    return generateMoneyStaticParams(CATEGORY);
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    return generateMoneyMetadata(CATEGORY, slug);
}

export default async function Page({ params }) {
    const { slug } = await params;
    return <MoneyPageTemplate category={CATEGORY} slug={slug} />;
}
