import { Inter } from 'next/font/google'
import Script from 'next/script'
import Header from '@/components/Header/Header'
import { ThemeProvider } from '@/context/ThemeContext' // [NEW]
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: '안티-주식 | Anti-Stock',
    description: 'AI-powered Stock Insights & News',
    metadataBase: new URL('https://info.stac100.com'),
}

export default function RootLayout({ children }) {
    return (
        <html lang="ko">
            <body className={inter.className}>
                <ThemeProvider>
                    <Script
                        async
                        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9155561960636914"
                        crossOrigin="anonymous"
                        strategy="afterInteractive"
                    />
                    <Header />
                    {children}
                </ThemeProvider>
            </body>
        </html>
    )
}
