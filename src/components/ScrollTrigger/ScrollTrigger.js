"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ScrollTrigger({ type = 'slide', relatedStocks = [] }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight;
            const winHeight = window.innerHeight;
            const scrollPercent = scrollTop / (docHeight - winHeight);

            if (scrollPercent > 0.7) { // 70% reached
                setIsVisible(true);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!isVisible) return null;

    if (type === 'slide') {
        return (
            <div style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                width: '300px',
                background: '#1e1e1e',
                border: '1px solid #00dbbd',
                borderRadius: '12px',
                padding: '15px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
                zIndex: 999,
                animation: 'slideUp 0.5s ease-out',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ margin: 0, fontSize: '1rem', color: '#fff' }}>🔥 지금 핫한 뉴스</h4>
                    <button onClick={(e) => {
                        e.preventDefault();
                        setIsVisible(false);
                    }} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: '1.2rem' }}>×</button>
                </div>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#ccc' }}>
                    투자자들이 가장 많이 보고 있는 뉴스를 놓치지 마세요.
                </p>
                <Link href="/" style={{
                    textAlign: 'center',
                    background: '#00dbbd',
                    color: '#000',
                    fontWeight: 'bold',
                    padding: '8px',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    cursor: 'pointer'
                }}>
                    실시간 트렌드 확인하기 →
                </Link>
                <style jsx>{`
                    @keyframes slideUp {
                        from { transform: translateY(100%); opacity: 0; }
                        to { transform: translateY(0); opacity: 1; }
                    }
                `}</style>
            </div>
        );
    }
    return null;
}
