'use client';

import React, { useEffect, useState } from 'react';
import styles from './TableOfContents.module.css';

const TableOfContents = ({ contentSelector = 'article' }) => {
    const [headings, setHeadings] = useState([]);
    const [activeId, setActiveId] = useState('');

    useEffect(() => {
        const updateHeadings = () => {
            const content = document.querySelector(contentSelector);
            if (!content) return;

            const elements = content.querySelectorAll('h2');
            const newHeadings = Array.from(elements).map((el, index) => {
                const text = el.innerText;
                const id = el.id || `heading-${index}`;
                el.id = id; // Ensure ID exists
                return { id, text, top: el.offsetTop };
            });

            setHeadings(newHeadings);
        };

        // Initial load
        updateHeadings();

        // Optional: Re-scan on resizing or content changes if needed
        const handleScroll = () => {
            const scrollPos = window.scrollY + 100; // Offset

            // Find the heading that is just above the current scroll position
            let current = '';
            headings.forEach(h => {
                const el = document.getElementById(h.id);
                if (el && el.offsetTop <= scrollPos) {
                    current = h.id;
                }
            });
            setActiveId(current);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [contentSelector]);

    if (headings.length === 0) return null;

    return (
        <nav className={styles.toc} aria-label="Table of Contents">
            <h4 className={styles.title}>목차</h4>
            <ul className={styles.list}>
                {headings.map(h => (
                    <li key={h.id} className={`${styles.item} ${activeId === h.id ? styles.active : ''}`}>
                        <a
                            href={`#${h.id}`}
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            {h.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default TableOfContents;
