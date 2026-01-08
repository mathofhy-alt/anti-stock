'use client';
import { useTheme } from '@/context/ThemeContext';
import styles from './ThemeToggle.module.css';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            className={styles.toggle}
            onClick={toggleTheme}
            aria-label="Toggle Dark Mode"
        >
            {theme === 'dark' ? '☀️' : '🌙'}
        </button>
    );
}
