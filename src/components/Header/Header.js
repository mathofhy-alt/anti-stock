'use client';

import { useState } from 'react';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle';
import SearchModal from '@/components/Search/SearchModal';
import styles from './Header.module.css';

export default function Header() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <>
            <header className={styles.header}>
                <nav className={styles.nav}>
                    <div className={styles.logo}>
                        <Link href="/">안티-주식</Link>
                    </div>
                    <ul className={styles.links}>
                        <li><Link href="/">홈</Link></li>
                        <li><Link href="/domestic">국내증시</Link></li>
                        <li><Link href="/overseas">해외증시</Link></li>
                        <li><Link href="/guide">가이드</Link></li>
                    </ul>

                    {/* Utilities: Search & Theme */}
                    <div className={styles.utilities}>
                        <button
                            className={styles.searchBtn}
                            onClick={() => setIsSearchOpen(true)}
                            aria-label="Search"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                        </button>
                        <ThemeToggle />
                    </div>
                </nav>
            </header>

            {isSearchOpen && <SearchModal onClose={() => setIsSearchOpen(false)} />}
        </>
    );
}
