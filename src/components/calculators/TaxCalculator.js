"use client";

import { useState, useEffect } from 'react';

const TaxCalculator = () => {
    const [profit, setProfit] = useState(10000000); // 1,000만원
    const [loss, setLoss] = useState(0);
    const [basicDeduction, setBasicDeduction] = useState(2500000); // 250만원
    const [results, setResults] = useState({ taxableIncome: 0, taxAmount: 0, finalProfit: 0 });

    useEffect(() => {
        const netIncome = Math.max(0, profit - loss);
        const taxable = Math.max(0, netIncome - basicDeduction);
        const tax = Math.floor(taxable * 0.22);
        const final = netIncome - tax;

        setResults({
            taxableIncome: taxable,
            taxAmount: tax,
            finalProfit: final
        });
    }, [profit, loss, basicDeduction]);

    const formatCurrency = (val) => new Intl.NumberFormat('ko-KR').format(val);

    return (
        <div style={{
            background: 'linear-gradient(135deg, #1e1e1e 0%, #2d3436 100%)',
            padding: '30px',
            borderRadius: '16px',
            color: 'white',
            margin: '40px 0',
            border: '1px solid #444',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
        }}>
            <h3 style={{ borderBottom: '1px solid #555', paddingBottom: '15px', marginBottom: '25px', color: '#00dbbd' }}>
                🧮 미국주식 양도소득세 계산기 (2026년형)
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
                {/* Inputs */}
                <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#aaa', fontSize: '0.9rem' }}>실현 수익 (매도 이익)</label>
                    <div style={{ position: 'relative' }}>
                        <input
                            type="number"
                            value={profit}
                            onChange={(e) => setProfit(Number(e.target.value))}
                            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #555', background: '#333', color: 'white', fontSize: '1.2em' }}
                        />
                        <span style={{ position: 'absolute', right: '15px', top: '12px', color: '#aaa' }}>원</span>
                    </div>
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#aaa', fontSize: '0.9rem' }}>실현 손실 (손절 금액)</label>
                    <div style={{ position: 'relative' }}>
                        <input
                            type="number"
                            value={loss}
                            onChange={(e) => setLoss(Number(e.target.value))}
                            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #555', background: '#333', color: 'white', fontSize: '1.2em' }}
                        />
                        <span style={{ position: 'absolute', right: '15px', top: '12px', color: '#aaa' }}>원</span>
                    </div>
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#aaa', fontSize: '0.9rem' }}>기본 공제 (연간 1회)</label>
                    <select
                        value={basicDeduction}
                        onChange={(e) => setBasicDeduction(Number(e.target.value))}
                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #555', background: '#333', color: 'white', fontSize: '1.1em' }}
                    >
                        <option value={2500000}>250만원 (기본)</option>
                        <option value={0}>0원 (이미 공제 받음)</option>
                    </select>
                </div>
            </div>

            {/* Result Display */}
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', fontSize: '1.1em' }}>
                    <span style={{ color: '#ccc' }}>과세 표준 (순이익 - 공제)</span>
                    <span style={{ fontWeight: 'bold' }}>{formatCurrency(results.taxableIncome)}원</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', fontSize: '1.4em', color: '#ff6b6b' }}>
                    <span>예상 양도세 (22%)</span>
                    <span style={{ fontWeight: 'bold' }}>{formatCurrency(results.taxAmount)}원</span>
                </div>
                <div style={{ borderTop: '1px solid #555', paddingTop: '15px', display: 'flex', justifyContent: 'space-between', fontSize: '1.2em', color: '#00dbbd' }}>
                    <span>세후 최종 수익</span>
                    <span style={{ fontWeight: 'bold' }}>{formatCurrency(results.finalProfit)}원</span>
                </div>
            </div>

            <p style={{ marginTop: '20px', fontSize: '0.85rem', color: '#888', textAlign: 'center' }}>
                * 지방소득세(2%)가 포함된 22% 기준입니다. 환율 변동 및 수수료에 따라 실제 세금과 차이가 있을 수 있습니다.
            </p>
        </div>
    );
};

export default TaxCalculator;
