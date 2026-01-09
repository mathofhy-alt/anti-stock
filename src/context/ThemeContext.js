'use client';
import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext({
    theme: 'dark',
    toggleTheme: () => { }
});

export function ThemeProvider({ children }) {
    // Default to dark to avoid flash if possible, or matches system preference
    const [theme, setTheme] = useState('dark');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.setAttribute('data-theme', savedTheme);
        } else {
            // Check system preference
            const systemPref = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
            setTheme(systemPref);
            document.documentElement.setAttribute('data-theme', systemPref);
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    // if (!mounted) {
    //     return <>{children}</>;
    // }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);
