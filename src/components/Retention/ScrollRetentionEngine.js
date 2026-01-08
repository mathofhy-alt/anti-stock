'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './ScrollRetentionEngine.module.css';

export default function ScrollRetentionEngine({ nextGuide, highValueGuide }) {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [showBottomSlide, setShowBottomSlide] = useState(false);
    const [showEzCard, setShowEzCard] = useState(false); // 40% trigger
    const [dismissed, setDismissed] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            setScrollProgress(progress);

            // 40% Trigger -> "Inline-like" Floating Card (Less intrusive)
            if (progress > 40 && progress < 70 && !dismissed) {
                setShowEzCard(true);
            } else {
                setShowEzCard(false);
            }

            // 70% Trigger -> Fixed Bottom Slide (Strong CTA)
            if (progress > 70 && !dismissed) {
                setShowBottomSlide(true);
                setShowEzCard(false); // Hide the smaller card
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [dismissed]);

    if (dismissed) return null;

    return (
        <>
            {/* 1. 40% Trigger: Side/Corner Card (Simulating "Inline" attention) */}
            <div className={`${styles.ezCard} ${showEzCard ? styles.visible : ''}`} style={{
                position: 'fixed',
                bottom: '100px',
                right: '20px',
                width: '240px',
                background: 'white',
                padding: '15px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
                borderRadius: '12px',
                zIndex: 90,
                transition: 'all 0.3s ease',
                opacity: showEzCard ? 1 : 0,
                transform: showEzCard ? 'translateY(0)' : 'translateY(20px)',
                pointerEvents: showEzCard ? 'auto' : 'none',
                border: '1px solid #eee'
            }}>
                <div style={{ fontSize: '12px', color: '#888', marginBottom: '5px' }}>💡 관련 수익 글 추천</div>
                <Link href={nextGuide.url} style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: '#333',
                    textDecoration: 'none',
                    lineHeight: '1.4'
                }}>
                    {nextGuide.title}
                </Link>
                <button onClick={() => setDismissed(true)} style={{
                    position: 'absolute',
                    top: '5px',
                    right: '10px',
                    background: 'none',
                    border: 'none',
                    fontSize: '16px',
                    color: '#999',
                    cursor: 'pointer'
                }}>×</button>
            </div>

            {/* 2. 70% Trigger: Bottom Slide (Revenue Core Guide) */}
            {highValueGuide && (
                <div className={`${styles.bottomSlide} ${showBottomSlide ? styles.visible : ''}`} style={{
                    position: 'fixed',
                    bottom: '0',
                    left: '0',
                    right: '0',
                    background: '#fff',
                    borderTop: '2px solid #00dbbd',
                    padding: '20px',
                    boxShadow: '0 -4px 20px rgba(0,0,0,0.1)',
                    zIndex: 100,
                    transition: 'transform 0.4s ease',
                    transform: showBottomSlide ? 'translateY(0)' : 'translateY(100%)',
                }}>
                    <div style={{
                        maxWidth: '800px',
                        margin: '0 auto',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <div>
                            <div style={{ color: '#00dbbd', fontWeight: 'bold', fontSize: '12px', marginBottom: '4px' }}>🔥 수익 핵심 가이드</div>
                            <h3 style={{ margin: 0, fontSize: '16px', color: '#333' }}>{highValueGuide.title}</h3>
                        </div>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <Link href={highValueGuide.url} style={{
                                background: '#333',
                                color: '#fff',
                                padding: '10px 20px',
                                borderRadius: '25px',
                                textDecoration: 'none',
                                fontSize: '14px',
                                fontWeight: 'bold'
                            }}>
                                확인하기
                            </Link>
                            <button onClick={() => setDismissed(true)} style={{
                                background: 'transparent',
                                border: '1px solid #ccc',
                                borderRadius: '50%',
                                width: '30px',
                                height: '30px',
                                cursor: 'pointer',
                                color: '#999'
                            }}>×</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
