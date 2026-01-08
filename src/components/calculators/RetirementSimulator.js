"use client";

import { useState, useEffect } from 'react';

const RetirementSimulator = () => {
    // Inputs
    const [currentAssets, setCurrentAssets] = useState(500000000); // 5억
    const [monthlyExpense, setMonthlyExpense] = useState(2500000); // 250만원
    const [returnRate, setReturnRate] = useState(7); // 연 7% (S&P500 Avg)
    const [inflationRate, setInflationRate] = useState(3); // 연 3%

    // Outputs
    const [simulation, setSimulation] = useState([]);
    const [depletionYear, setDepletionYear] = useState(null);
    const [safeWithdrawalRate, setSafeWithdrawalRate] = useState(0);

    useEffect(() => {
        // 4% Rule Check
        const annualExpense = monthlyExpense * 12;
        const currentRate = (annualExpense / currentAssets) * 100;
        setSafeWithdrawalRate(currentRate.toFixed(2));

        // Simulation Loop
        let balance = currentAssets;
        let expense = annualExpense;
        let year = new Date().getFullYear();
        let history = [];
        let depleted = null;

        for (let i = 0; i < 40; i++) { // Simulate 40 years
            history.push({ year, balance, expense });

            // Calculate next year
            const growth = balance * (returnRate / 100);
            balance = balance + growth - expense;
            expense = expense * (1 + inflationRate / 100); // Inflation adjust
            year++;

            if (balance <= 0) {
                balance = 0;
                depleted = year - 1;
                history.push({ year, balance, expense });
                break;
            }
        }
        setSimulation(history);
        setDepletionYear(depleted);

    }, [currentAssets, monthlyExpense, returnRate, inflationRate]);

    const formatCurrency = (val) => new Intl.NumberFormat('ko-KR', { maximumFractionDigits: 0 }).format(val);

    return (
        <div style={{
            background: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
            padding: '30px',
            borderRadius: '16px',
            color: 'white',
            margin: '40px 0',
            border: '1px solid #444',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
        }}>
            <h3 style={{ borderBottom: '1px solid #555', paddingBottom: '15px', marginBottom: '25px', color: '#00dbbd' }}>
                🏖️ 은퇴 자금 시뮬레이터 (FIRE 계산기)
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#aaa', fontSize: '0.9rem' }}>현재 은퇴 자산</label>
                    <div style={{ position: 'relative' }}>
                        <input
                            type="number"
                            value={currentAssets}
                            onChange={(e) => setCurrentAssets(Number(e.target.value))}
                            step="10000000"
                            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #555', background: 'rgba(255,255,255,0.1)', color: 'white', fontSize: '1.2em' }}
                        />
                        <span style={{ position: 'absolute', right: '15px', top: '12px', color: '#aaa' }}>원</span>
                    </div>
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#aaa', fontSize: '0.9rem' }}>월 필요 생활비</label>
                    <div style={{ position: 'relative' }}>
                        <input
                            type="number"
                            value={monthlyExpense}
                            onChange={(e) => setMonthlyExpense(Number(e.target.value))}
                            step="100000"
                            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #555', background: 'rgba(255,255,255,0.1)', color: 'white', fontSize: '1.2em' }}
                        />
                        <span style={{ position: 'absolute', right: '15px', top: '12px', color: '#aaa' }}>원</span>
                    </div>
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#aaa', fontSize: '0.9rem' }}>투자 수익률 - 물가 상승률</label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <input
                            type="number"
                            value={returnRate}
                            onChange={(e) => setReturnRate(Number(e.target.value))}
                            style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #555', background: 'rgba(255,255,255,0.1)', color: 'white', fontSize: '1.1em' }}
                        />
                        <span style={{ padding: '12px 0' }}>-</span>
                        <input
                            type="number"
                            value={inflationRate}
                            onChange={(e) => setInflationRate(Number(e.target.value))}
                            style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #555', background: 'rgba(255,255,255,0.1)', color: 'white', fontSize: '1.1em' }}
                        />
                    </div>
                </div>
            </div>

            {/* Analysis Result */}
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '12px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                    <span style={{ color: '#ccc' }}>현재 인출률 (4% 룰 기준)</span>
                    <span style={{ fontSize: '1.4em', fontWeight: 'bold', color: safeWithdrawalRate <= 4 ? '#2ecc71' : '#e74c3c' }}>
                        {safeWithdrawalRate}%
                        <span style={{ fontSize: '0.6em', marginLeft: '8px', fontWeight: 'normal', color: '#aaa' }}>
                            {safeWithdrawalRate <= 4 ? '(안전)' : '(위험)'}
                        </span>
                    </span>
                </div>

                <div style={{ borderTop: '1px solid #555', paddingTop: '15px' }}>
                    {depletionYear ? (
                        <div style={{ textAlign: 'center' }}>
                            <span style={{ display: 'block', fontSize: '0.9rem', color: '#ff6b6b', mb: '5px' }}>자산 고갈 예상 시기</span>
                            <span style={{ fontSize: '1.8em', fontWeight: 'bold', color: '#ff4757' }}>{depletionYear}년</span>
                            <p style={{ margin: '10px 0 0 0', fontSize: '0.9rem', color: '#aaa' }}>{depletionYear - new Date().getFullYear()}년 후 자산이 바닥납니다.</p>
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center' }}>
                            <span style={{ fontSize: '1.5em', fontWeight: 'bold', color: '#00dbbd' }}>🎉 영구 보존 가능! (FIRE 성공)</span>
                            <p style={{ margin: '10px 0 0 0', fontSize: '0.9rem', color: '#aaa' }}>40년 후 잔존 자산: {formatCurrency(simulation[simulation.length - 1]?.balance || 0)}원</p>
                        </div>
                    )}
                </div>
            </div>

            <p style={{ fontSize: '0.85rem', color: '#888', textAlign: 'center' }}>
                * S&P500 과거 평균 수익률 등을 기반으로 한 단순 시뮬레이션입니다.
            </p>
        </div>
    );
};

export default RetirementSimulator;
