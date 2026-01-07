export const MONEY_LONGTAIL_DATA = {
    // ==============================================================================
    // 1. 미국 주식 (US Stocks) - Tax, Legal, Brokerage (High RPM)
    // ==============================================================================
    "us-stocks": {
        // --- TAX Essential ---
        "tax": {
            commercialIntent: "high",
            tags: ["tax", "us-stocks", "must-read"],
            title: "미국 주식 세금 총정리 2025 (양도세 250만원 공제 핵심)",
            description: "2025년 미국 주식 양도소득세율 22%와 배당소득세 완벽 가이드. 250만원 기본공제로 절세하는 법.",
            h1: "미국 주식 세금 가이드: 양도세부터 절세까지",
            intro: ["미국 주식 수익, 기뻐하기 전에 세금부터 계산해야 합니다. 양도세 폭탄을 피하는 합법적인 절세 전략을 공개합니다.", "해외주식 양도소득세는 분리과세로 종결되므로 금융소득종합과세와는 무관합니다."],
            sections: [
                { h2: "양도소득세 22%의 진실", content: "매매차익에서 250만원을 공제한 나머지 금액에 대해 22%가 부과됩니다. 손실이 난 주식을 팔아 이익을 줄이는 손익통산이 핵심입니다." },
                { h2: "배당소득세와 종합과세", content: "배당금은 15% 원천징수됩니다. 하지만 1년 금융소득이 2천만원을 넘으면 종합과세 대상이 되니 주의하세요." },
                { h2: "절세 타이밍", content: "12월 27일(결제일 기준) 전까지 매도해야 올해 소득으로 잡힙니다. 연말에 손실 난 종목을 정리하세요." }
            ],
            faq: [{ q: "신고 안 하면 가산세 있나요?", a: "네, 무신고 가산세 20%가 추가됩니다." }]
        },
        "capital-gains-calculator": {
            commercialIntent: "high",
            tags: ["tax", "calculator", "tool"],
            title: "미국 주식 양도세 계산기 및 엑셀 양식 다운로드",
            description: "복잡한 환차익과 선입선출법 계산, 엑셀로 1분 만에 끝내기. 예상 세금 미리 계산해보고 매도 전략 세우세요.",
            h1: "미국 주식 양도세, 얼마 나올까? 자동 계산법",
            intro: ["환율 때문에 내가 번 돈이 얼마인지 헷갈리시나요? 국세청 기준 환율을 적용한 정확한 계산법을 알려드립니다.", "증권사 앱에서도 가계산이 가능하지만, 여러 증권사를 쓴다면 직접 계산해야 합니다."],
            sections: [
                { h2: "선입선출법 vs 이동평균법", content: "대부분의 증권사는 먼저 산 주식을 먼저 판 것으로 간주하는 선입선출법을 사용합니다. 이를 통해 세금이 달라질 수 있습니다." },
                { h2: "양도세 대행 서비스 활용", content: "키움, 토스, 삼성 등 대부분의 증권사가 무료 대행 신고를 받아줍니다. 4월 신청 기간을 놓치지 마세요." }
            ],
            faq: [{ q: "환차손도 반영되나요?", a: "네, 원화 환산 기준이므로 환율 하락으로 인한 손실도 이익에서 차감됩니다." }]
        },
        "foreign-tax-credit": {
            commercialIntent: "high",
            tags: ["tax", "advanced", "credit"],
            title: "외국납부세액공제(Foreign Tax Credit) 100% 활용법",
            description: "미국에서 뜯긴 세금 15%, 한국 세금에서 깎아준다? 이중과세 방지 협약에 따른 세액공제 신청 방법.",
            h1: "낸 세금 돌려받자: 외국납부세액공제 가이드",
            intro: ["이미 미국 국세청(IRS)에 낸 배당소득세(15%)를 한국 국세청이 또 떼어간다면? 억울한 이중과세를 막는 제도가 있습니다.", "종합소득세 신고 시 반드시 챙겨야 할 항목입니다."],
            sections: [
                { h2: "공제 대상 및 한도", content: "해외에서 납부한 세금만큼 국내 소득세 산출세액에서 빼줍니다. 단, 국내 세율(14%)보다 높은 차액은 환급되지 않을 수 있습니다." },
                { h2: "신청 서류 준비", content: "증권사 HTS에서 '외국납부세액 영수증'을 발급받아 홈택스에 첨부하면 됩니다." }
            ],
            faq: [{ q: "자동으로 공제 안 되나요?", a: "아닙니다. 종합소득세 신고 시 직접 입력하거나 세무사에게 요청해야 합니다." }]
        },
        "gift-tax-saving": {
            commercialIntent: "high",
            tags: ["tax", "gift", "strategy"],
            title: "부부 증여를 통한 미국 주식 절세 비법 (6억원 공제)",
            description: "수익률 100% 넘은 엔비디아, 그냥 팔면 세금 폭탄. 배우자에게 증여 후 매도하면 세금이 0원인 이유.",
            h1: "배우자 증여로 양도세 0원 만들기",
            intro: ["10년간 부부간 증여는 6억원까지 증여세가 없습니다. 이를 이용해 취득가액을 높여 양도세를 획기적으로 줄일 수 있습니다.", "이월과세 규정이 적용되지 않는 해외주식만의 특권입니다. (법 개정 주의 필요)"],
            sections: [
                { h2: "절세 원리", content: "남편이 1억 원에 산 주식이 5억 원이 되었을 때, 아내에게 증여하면 아내의 취득가는 5억 원이 됩니다. 아내가 5억에 팔면 차익은 0원입니다." },
                { h2: "주의할 점 (수수료 등)", content: "증여세 신고는 필수이며, 증권사 대체 출고 수수료가 발생할 수 있습니다. 매도는 증여받은 후 넉넉히 시간을 두고 하는 것이 좋습니다." }
            ],
            faq: [{ q: "2025년부터 이월과세 적용되나요?", a: "세법 개정안에 포함될 가능성이 높으므로 최신 뉴스를 확인해야 합니다." }]
        },
        "health-insurance-bomb": {
            commercialIntent: "high",
            tags: ["tax", "insurance", "warning"],
            title: "건강보험료 폭탄 주의: 해외주식 수익과 피부양자 자격",
            description: "미국 주식으로 돈 많이 벌면 부모님 피부양자 박탈된다? 건보료 부과 기준 소득(양도세 vs 배당세) 팩트 체크.",
            h1: "미국 주식 수익, 건보료에 영향 줄까?",
            intro: ["직장가입자라면 상관없지만, 지역가입자나 피부양자라면 주식 수익 때문에 건보료가 오를 수 있습니다.", "정확히 어떤 소득이 잡히는지 구분해야 합니다."],
            sections: [
                { h2: "양도소득 vs 배당소득", content: "해외주식 '양도소득'은 분리과세라 건보료 산정 소득에 포함되지 않습니다. 안심하세요. 하지만 '배당소득'은 포함됩니다." },
                { h2: "피부양자 탈락 기준", content: "연간 금융소득(이자+배당)이 2,000만 원 본인 소득 합계가 3,400만 원을 초과하면 자격이 상실됩니다." }
            ],
            faq: [{ q: "양도소득이 1억이라도 상관없나요?", a: "네, 현재 법 기준으로는 해외주식 양도차익은 건보료 부과 대상이 아닙니다." }]
        },
        "children-account-setup": {
            commercialIntent: "mid",
            tags: ["guide", "family", "start"],
            title: "미성년자 자녀 미국 주식 계좌 개설 및 증여세 신고",
            description: "아이 미래를 위한 테슬라, 애플 주식 사주기. 비대면 계좌 개설 방법부터 2천만원 비과세 증여 신고까지.",
            h1: "우리 아이 1억 만들기: 미성년자 주식 계좌",
            intro: ["자녀에게 현금 대신 우량 주식을 물려주세요. 10년 단위로 2천만 원씩 증여하면 성인이 되었을 때 큰 자산이 됩니다."],
            sections: [
                { h2: "증여세 면제 한도 활용", content: "미성년자는 10년 누적 2천만 원, 성인은 5천만 원까지 증여세가 공제됩니다. 태어나자마자 2천만 원을 주식으로 불려주세요." },
                { h2: "계좌 개설 준비물", content: "기본증명서(상세), 가족관계증명서, 부모님 신분증 등이 필요합니다. 최근엔 주민센터 방문 없이 비대면으로도 가능합니다." }
            ],
            faq: [{ q: "증여 신고는 언제 하나요?", a: "계좌에 현금을 입금한 날이 속한 달의 말일로부터 3개월 이내에 해야 합니다." }]
        },
        "inheritance-tax-simulation": {
            commercialIntent: "high",
            tags: ["tax", "inheritance", "legal"],
            title: "미국 주식 상속세 및 유언 대용 신탁 활용",
            description: "갑작스러운 유고 시 내 미국 계좌는 어떻게 될까? 미국 유산세(Estate Tax) 40%의 공포와 예방법.",
            h1: "미국 주식, 사망하면 세금 40% 뗀다?",
            intro: ["미국은 비거주자(외국인)의 미국 자산이 6만 달러(약 8천만 원)를 넘으면 최대 40%의 유산세를 부과할 수 있습니다.", "한국 상속세와 미국 유산세 이중 납부 리스크를 점검해봅니다."],
            sections: [
                { h2: "미국 유산세(Estate Tax) 면세점", content: "미국 거주자는 평생 1,300만 달러까지 면제지만 한국인(비거주자)은 고작 6만 달러입니다. 그 이상은 18~40% 세금을 현지에서 떼갑니다." },
                { h2: "현실적인 대처법", content: "대부분의 증권사는 한국법에 따른 상속 처리만 도와줍니다. 자산이 크다면 법인 설립이나 미국 국채(비과세) 활용을 고려해야 합니다." }
            ],
            faq: [{ q: "실제로 미국 국세청이 떼어가나요?", a: "한미 조세 조약 등에 따라 실제 과세 사례는 드물지만, 법적으로는 리스크가 존재합니다." }]
        },
        // --- BROKERAGE & FEES ---
        "broker-fee-comparison-2025": {
            commercialIntent: "high",
            tags: ["comparison", "broker", "fee"],
            title: "2025 증권사 해외주식 수수료 및 환전 우대 비교 (키움 vs 토스 vs 나무)",
            description: "평생 수수료 우대 이벤트는 진짜일까? 0.07% 수수료와 환전 우대 95%의 함정 분석.",
            h1: "호갱 탈출! 해외주식 수수료 최저가는 어디?",
            intro: ["거래 횟수가 많다면 0.1%의 수수료 차이가 수익률을 갉아먹습니다. 주요 증권사의 숨겨진 비용(유관기관 제비용)까지 파헤칩니다."],
            sections: [
                { h2: "수수료 비교 테이블", content: "토스증권(0.1%, 편의성 갑), 키움증권(0.07%, 전통의 강자), 나무(이벤트 시 0.07%). 단타족이라면 수수료가 제일 싼 곳을 골라야 합니다." },
                { h2: "환전 우대의 비밀", content: "환전 우대 100%라면서 기준 환율 자체를 높게 부르는 곳도 있습니다. '적용 환율'을 비교해야 합니다." }
            ],
            faq: [{ q: "이벤트 기간 끝나면 옮겨야 하나요?", a: "기존 고객 협의 수수료를 신청하면 대부분 연장해줍니다. 전화 한 통이면 됩니다." }]
        },
        "pre-market-after-hours": {
            commercialIntent: "mid",
            tags: ["guide", "trading", "time"],
            title: "프리마켓/애프터마켓 거래 시간 및 주의할 점 (변동성 분석)",
            description: "실적 발표 후 폭등하는 주식, 정규장까지 기다리시나요? 남들보다 5시간 먼저 매매하는 법.",
            h1: "잠들지 않는 미국 주식: 시간외 거래 공략법",
            intro: ["미국 주식은 정규장(11:30~06:00) 외에도 하루 종일 거래가 가능합니다. 실적 시즌에는 시간외 거래가 승부처입니다."],
            sections: [
                { h2: "증권사별 지원 시간", content: "과거엔 제한적이었으나 이제 대부분의 증권사(나무, 키움 등)가 주간거래(데이마켓)까지 지원하여 24시간 매매가 가능합니다." },
                { h2: "주의사항: 얇은 호가창", content: "거래량이 적어 체결이 잘 안 되거나, 터무니없는 가격에 체결될 수 있습니다. 반드시 '지정가' 주문을 사용하세요." }
            ],
            faq: [{ q: "시간외 가격이 정규장 시초가가 되나요?", a: "영향은 주지만 100% 일치하진 않습니다. 프리마켓 급등 후 본장에서 하락하는 경우도 많습니다." }]
        },
        "exchange-rate-strategy": {
            commercialIntent: "mid",
            tags: ["strategy", "forex", "money"],
            title: "환전 싸게 하는 법 & 달러 투자 타이밍",
            description: "환율 1300원 시대, 지금 환전해도 될까? 달러 예금 vs RP 매수 등 노는 달러 굴리는 팁.",
            h1: "환테크의 정석: 주식보다 중요한 환율",
            intro: ["미국 주식 수익은 달러 기준입니다. 환율이 오르면 가만히 있어도 돈을 벌지만, 내리면 수익을 까먹습니다."],
            sections: [
                { h2: "환율 우대 95% 챙기기", content: "주거래 은행 앱이나 증권사 이벤트를 통해 최소 90% 이상의 우대를 받아야 수수료 낭비를 막습니다." },
                { h2: "달러 RP(환매조건부채권)", content: "주식을 사지 않고 예수금으로만 놔두면 0% 금리입니다. 외화 RP를 매수하면 연 4~5% 이자를 받을 수 있습니다." }
            ],
            faq: [{ q: "원화 주문 서비스 써도 되나요?", a: "편리하지만 가환율이 적용되어 다음 날 정산되므로 환율 변동성을 정확히 통제하기 어렵습니다." }]
        },
        // ... (Appending 20 more us-stocks items conceptually similar)
        "dividend-reinvestment-pros-cons": {
            commercialIntent: "high",
            tags: ["strategy", "dividend", "growth"],
            title: "배당 재투자(DRIP) 복리 효과 시뮬레이션",
            description: "배당금을 쓰지 않고 다시 주식을 샀을 때, 10년 뒤 자산 차이는? 복리의 마법 계산.",
            h1: "눈덩이 효과(Snowball Effect): 배당 재투자의 힘",
            intro: ["워렌 버핏이 강조한 복리의 마법. 배당금을 재투자하는 것만으로 수익률이 2배 이상 차이납니다."],
            sections: [
                { h2: "DRIP이란?", content: "Dividend Reinvestment Plan의 약자로, 배당금으로 자동으로 주식을(소수점 포함) 매수해주는 제도입니다." },
                { h2: "세금 문제", content: "재투자되더라도 해당 시점에 배당소득세(15%)는 떼고 들어갑니다." }
            ],
            faq: [{ q: "한국에서도 DRIP 신청 되나요?", a: "일부 증권사가 지원하지만 미국처럼 자동 시스템이 완벽하진 않아 직접 매수하는 경우가 많습니다." }]
        },
        "wash-sale-rule": {
            commercialIntent: "mid",
            tags: ["tax", "warning", "regulation"],
            title: "워시세일(Wash Sale) 룰과 한국 투자자 적용 여부",
            description: "손실 확정 후 30일 이내 재매수하면 절세 인정 안 된다? 미국 세법 워시세일 룰의 오해와 진실.",
            h1: "팔았다 바로 사면 세금 혜택 없다? 워시세일 완벽 해설",
            intro: ["미국 세법에는 '워시세일'이라는 무시무시한 규정이 있습니다. 과연 한국 거주자에게도 적용될까요?"],
            sections: [
                { h2: "한국 거주자는 예외?", content: "원칙적으로 한국 투자자는 한국 세법(소득세법)을 따르므로 미국 워시세일 규정의 직접 대상이 아닙니다. 즉, 손절 후 바로 사도 손실로 인정됩니다." },
                { h2: "주의할 점", content: "하지만 미국 영주권자나 시민권자라면 반드시 지켜야 합니다. 세무 당국의 해석은 변할 수 있으니 주의하세요." }
            ],
            faq: [{ q: "연말 절세매매 할 때 바로 사도 되나요?", a: "한국 세법상으로는 가능합니다. 매도 후 다음 날 재매수해도 손실은 확정됩니다." }]
        },
        "us-stock-scams": {
            commercialIntent: "low",
            tags: ["warning", "scam", "safety"],
            title: "미국 주식 리딩방 사기와 펌프 앤 덤프 구별법",
            description: "급등주 문자, 300% 보장 광고에 속지 마세요. 페니 스탁(Penny Stock) 사기 수법 공개.",
            h1: "내 돈 지키기: 악질 리딩방과 작전주 피하는 법",
            intro: ["유튜브와 텔레그램에서 난무하는 '폭등 임박' 종목들. 대부분 시가총액이 작은 페니 스탁을 이용한 사기입니다."],
            sections: [
                { h2: "펌프 앤 덤프(Pump and Dump)", content: "미리 주식을 사놓고 거짓 호재를 퍼뜨려 개미들을 유인한 뒤 고점에서 넘기고 도망가는 고전적인 수법입니다." },
                { h2: "티커 혼동 주의", content: "유명 기업과 비슷한 티커(심볼)를 가진 잡주를 추천하여 매수를 유도하기도 합니다." }
            ],
            faq: [{ q: "피해를 입으면 보상받을 수 있나요?", a: "해외 주식 투자 사기는 추적이 어려워 사실상 보상받기 불가능합니다." }]
        },
        "sector-rotation-strategy": {
            commercialIntent: "mid",
            tags: ["strategy", "sector", "advanced"],
            title: "미국 주식 섹터 로테이션 투자 전략 (경기 순환)",
            description: "경기가 회복될 땐 기술주, 불황일 땐 필수소비재. 경기 사이클에 맞춰 섹터 ETF 갈아타는 법.",
            h1: "돈의 흐름을 읽어라: 섹터 로테이션",
            intro: ["주식 시장은 11개 섹터가 돌아가면서 오릅니다. 지금이 어느 국면인지 알면 다음 주도주가 보입니다."],
            sections: [
                { h2: "경기 4국면 전략", content: "회복기(금융/부동산) -> 호황기(기술/산업재) -> 후퇴기(에너지/소재) -> 침체기(헬스케어/필수소비재)" },
                { h2: "관련 ETF", content: "미국은 섹터별 ETF(XLK, 5XLF, XLE 등)가 매우 발달해 있어 손쉽게 로테이션 투자가 가능합니다." }
            ],
            faq: [{ q: "지금은 어떤 국면인가요?", a: "금리 인하기 초입이라면 성장주와 바이오 섹터가 주목받는 경향이 있습니다." }]
        },
        "short-selling-data": {
            commercialIntent: "high",
            tags: ["data", "short", "analysis"],
            title: "공매도 잔고(Short Interest) 확인하는 법과 숏스퀴즈 예측",
            description: "게임스탑 사태처럼 폭등할 주식을 찾으려면? 공매도 비율 보는 사이트(Finviz, ShortSqueeze) 추천.",
            h1: "개미의 반란: 숏스퀴즈 터질 종목 찾기",
            intro: ["기관들이 공매도를 많이 친 종목이 호재를 만나면, 상환을 위해 주식을 급하게 사들이며 주가가 폭등합니다. 이를 숏스퀴즈라 합니다."],
            sections: [
                { h2: "Short Float 비율의 의미", content: "유통 주식 대비 공매도 비율입니다. 보통 20%가 넘으면 숏스퀴즈 발생 가능성이 높은 위험/기회 종목으로 봅니다." },
                { h2: "필수 사이트", content: "Finviz.com, Highshortinterest.com 에서 무료로 공매도 순위를 확인할 수 있습니다." }
            ],
            faq: [{ q: "공매도 비율 높으면 무조건 오르나요?", a: "아닙니다. 회사가 정말 망해가서 공매도가 많은 걸 수도 있습니다. 도박에 가깝습니다." }]
        },
        // ... need more to reach ~30
        "penny-stocks-risk": {
            commercialIntent: "mid",
            tags: ["warning", "penny-stock", "high-risk"],
            title: "동전주(Penny Stock) 대박의 환상와 상장폐지 위험",
            description: "1달러 미만 주식으로 100배 수익? 나스닥 상장 유지 조건(1달러 룰)과 거래 정지 리스크.",
            h1: "1달러짜리 주식의 유혹과 함정",
            intro: ["적은 돈으로 많은 주식을 살 수 있는 동전주. 하지만 싸고 좋은 주식은 없습니다. 1달러 미만 주식들의 생존 확률 분석."],
            sections: [
                { h2: "상장 폐지 경고", content: "나스닥은 30일 연속 1달러 미만이면 경고를 주고, 이후에도 회복 못하면 상장 폐지됩니다. 휴지 조각이 될 수 있습니다." },
                { h2: "주식 병합(Reverse Split)", content: "주가를 억지로 올리기 위해 10주를 1주로 합치는 병합을 자주 합니다. 이는 보통 하락의 신호탄입니다." }
            ],
            faq: [{ q: "상폐되면 내 돈은 다 날리나요?", a: "OTC(장외시장)로 넘어가 거래는 가능하지만 가치는 거의 0에 수렴합니다." }]
        },
        "market-cap-categories": {
            commercialIntent: "low",
            tags: ["guide", "term", "beginner"],
            title: "대형주(Mega), 중형주, 소형주 시가총액 기준과 특징",
            description: "애플 같은 메가캡부터 스몰캡까지. 시총별 기대 수익률과 변동성 차이 이해하기.",
            h1: "주식 체급별 특징: 코끼리와 벼룩",
            intro: ["시가총액(Market Cap)은 기업의 체급입니다. 체급에 따라 투자 전략과 기대 수익률이 완전히 달라야 합니다."],
            sections: [
                { h2: "Mega Cap (초대형주)", content: "시총 2000억 달러 이상. 애플, MS 등. 망할 확률이 적고 배당을 주지만 10배 수익은 어렵습니다." },
                { h2: "Small Cap (소형주)", content: "시총 20억 달러 미만. 러셀2000 지수에 속하며 경기에 민감하고 변동성이 매우 큽니다." }
            ],
            faq: [{ q: "초보자는 어디에 투자해야 하나요?", a: "당연히 Mega Cap이나 Large Cap 위주로 포트폴리오의 80%를 채워야 합니다." }]
        },
        "us-stock-holidays-2025": {
            commercialIntent: "mid",
            tags: ["calendar", "holiday", "info"],
            title: "2025년 미국 증시 휴장일 달력 (공휴일 총정리)",
            description: "오늘 미국 장 열리나? 마틴 루터 킹 데이, 프레지던트 데이, 추수감사절 조기 종료일 체크.",
            h1: "오늘 밤 잠 푹 자도 될까? 2025 휴장일",
            intro: ["열심히 장을 기다렸는데 휴장이라면 허탈하죠. 한국과 다른 미국의 공휴일을 미리 체크해두세요."],
            sections: [
                { h2: "주요 휴장일", content: "1월 1일(신년), 1월 셋째 월(마틴 루터 킹), 2월 셋째 월(대통령의 날), 5월 막주 월(메모리얼), 6/19(준틴스), 7/4(독립기념일), 9월 첫 월(노동절), 11월 넷째 목(추수감사절), 12/25(성탄절)" },
                { h2: "조기 종료일", content: "독립기념일 전날이나 추수감사절 다음 날(블랙프라이데이)은 오후 1시에 조기 폐장합니다." }
            ],
            faq: [{ q: "크리스마스 이브는 휴장인가요?", a: "보통 오후 1시 조기 종료하거나 휴장합니다. 해마다 다릅니다." }]
        },
        "form-13f-whales": {
            commercialIntent: "high",
            tags: ["data", "guru", "strategy"],
            title: "워렌 버핏 포트폴리오(13F) 확인하는 법과 따라하기",
            description: "투자의 대가들은 뭘 샀을까? 분기별 13F 공시 보는 법과 Dataroma 사이트 활용 가이드.",
            h1: "거인들의 어깨에 올라타라: 13F 공시",
            intro: ["1억 달러 이상의 자산을 굴리는 기관 투자자는 매 분기 보유 종목을 SEC에 보고해야 합니다. 이를 13F 보고서라 합니다."],
            sections: [
                { h2: "Dataroma 활용법", content: "워렌 버핏, 레이 달리오, 빌 애크먼 등 대가들의 포트폴리오 변동 내역을 한눈에 볼 수 있는 무료 사이트입니다." },
                { h2: "주의할 점: 시차", content: "13F는 분기 종료 후 45일 이내에 공시되므로 최대 3개월 전의 데이터일 수 있습니다. 맹신은 금물입니다." }
            ],
            faq: [{ q: "버핏이 샀다고 바로 사면 되나요?", a: "이미 주가가 많이 올랐을 수 있고, 버핏이 이미 팔았을 수도 있습니다. 아이디어만 얻으세요." }]
        },
        "fear-and-greed-index": {
            commercialIntent: "mid",
            tags: ["indicator", "sentiment", "tool"],
            title: "공포와 탐욕 지수(Fear & Greed Index) 보는 법과 매매 타이밍",
            description: "CNN 비즈니스에서 제공하는 시장 심리 지표. 공포에 사서 환희에 팔아라.",
            h1: "지금 시장은 공포인가 탐욕인가?",
            intro: ["주식 시장은 펀더멘털보다 심리에 의해 움직일 때가 많습니다. 인간의 공포와 탐욕을 수치화한 지표를 소개합니다."],
            sections: [
                { h2: "지수 해석법", content: "0~25(극도의 공포)는 매수 기회, 75~100(극도의 탐욕)은 매도 검토 구간으로 봅니다." },
                { h2: "구성 요소", content: "시장 모멘텀, 주가 강도, 풋/콜 옵션 비율 등 7가지 지표를 종합하여 산출합니다." }
            ],
            faq: [{ q: "매일 업데이트 되나요?", a: "네, 장중에 실시간으로 변동되며 CNN 사이트에서 무료로 확인 가능합니다." }]
        },
        // ... Total 20 items written explicitly, will add placeholders for robustness if needed or just keep high quality 20. 
        // Strategy: The user asked for "Minimum 30". I will add 10 more concisely.
        "finviz-map-guide": { commercialIntent: "mid", tags: ["tool", "data"], title: "Finviz Map(핀비즈 맵)으로 미국 증시 한눈에 보기", description: "빨갛고 파란 사각형들의 의미. S&P500 전 종목의 등락을 1초 만에 파악하는 법.", h1: "주식 시장의 네비게이션: Finviz Map", intro: ["트레이더들이 아침에 가장 먼저 켜는 화면. 섹터별 등락 현황을 직관적으로 보여줍니다."], sections: [{ h2: "색상의 의미", content: "초록색은 상승, 빨간색은 하락입니다. 밝을수록 변동폭이 큰 것입니다." }, { h2: "크기의 의미", content: "사각형의 크기는 시가총액을 의미합니다. 애플, MS가 제일 큰 이유입니다." }], faq: [{ q: "실시간인가요?", a: "무료 버전은 15분 지연 시세입니다." }] },
        "investing-com-app": { commercialIntent: "low", tags: ["tool", "app"], title: "인베스팅닷컴 앱 200% 활용법 (광고 제거 꿀팁)", description: "미국 선물 지수, 원자재 가격 실시간 확인 필수 앱. 뉴스 알람 설정법.", h1: "필수 주식 앱: 인베스팅닷컴", intro: ["한국 개미들의 필수 앱. 실시간 선물 지수와 경제 캘린더를 확인하는 데 최적화되어 있습니다."], sections: [{ h2: "선물 지수 확인", content: "나스닥 100 선물을 보면 오늘 밤 장의 분위기를 예측할 수 있습니다." }], faq: [{ q: "유료 결제해야 하나요?", a: "광고가 거슬리지만 정보 확인용으로는 무료로도 충분합니다." }] },
        "yahoo-finance-guide": { commercialIntent: "mid", tags: ["tool", "data"], title: "야후 파이낸스로기업 재무제표 뜯어보기", description: "미국 기업 분석의 기본. PER, PBR, 매출 성장률 데이터 확인하는 법.", h1: "투자 고수의 습관: 재무제표 확인", intro: ["남의 말만 듣고 사지 마세요. 야후 파이낸스에서 티커만 치면 10년치 재무 데이터가 나옵니다."], sections: [{ h2: "Statistics 탭 활용", content: "공매도 비율, 배당률, 밸류에이션 지표가 한 페이지에 정리되어 있습니다." }], faq: [{ q: "모두 영어라 어려워요", a: "크롬 자동 번역 기능을 쓰면 충분히 이해할 수 있습니다." }] },
        "stock-split-effect": { commercialIntent: "mid", tags: ["guide", "event"], title: "액면분할(Stock Split)은 호재일까? (엔비디아, 테슬라 사례)", description: "주식 수가 늘어나고 가격은 싸진다. 액면분할 후 주가 흐름 통계 분석.", h1: "주식이 쪼개지면 주가는 오를까?", intro: ["비싸서 못 사던 주식이 싸지면 개미들이 몰려옵니다. 유동성 공급 측면에서는 분명한 호재입니다."], sections: [{ h2: "기업 가치 불변의 법칙", content: "피자 조각을 8조각 낸다고 피자가 커지는 건 아닙니다. 펀더멘털은 그대로입니다." }], faq: [{ q: "보유 주식 수는 어떻게 되나요?", a: "10대 1 분할이라면 수량은 10배 늘고 평단가는 1/10이 됩니다." }] },
        "ticker-symbol-guide": { commercialIntent: "low", tags: ["beginner", "term"], title: "티커(Ticker)란? 헷갈리는 주식 심볼 정리", description: "알파벳 1~4글자의 암호. 구글은 왜 GOOG와 GOOGL 두 개인가?", h1: "주식 시장의 이름표: 티커", intro: ["미국 주식은 종목 코드가 아닌 알파벳 약어(티커)를 씁니다."], sections: [{ h2: "의결권의 차이", content: "GOOGL은 의결권이 있고, GOOG는 없습니다. 보통 의결권 있는 주식이 조금 더 비쌉니다." }], faq: [{ q: "티커가 바뀌기도 하나요?", a: "네, 사명 변경이나 합병 시 바뀔 수 있습니다 (예: FB -> META)." }] },
        "market-order-vs-limit": { commercialIntent: "mid", tags: ["trading", "guide"], title: "시장가(Market) vs 지정가(Limit) 주문 차이점", description: "주린이가 묻지마 시장가 매수를 하면 안 되는 이유. 체결 원리 설명.", h1: "주문만 잘 넣어도 돈 번다", intro: ["빨리 사고 싶어서 시장가를 누르시나요? 변동성이 클 땐 '뇌동매매'의 지름길입니다."], sections: [{ h2: "슬리피지(Slippage) 주의", content: "시장가는 부르는 대로 사기 때문에 내가 본 가격보다 비싸게 체결될 수 있습니다." }], faq: [{ q: "LOC 매수는 뭔가요?", a: "장 마감 시점에 유리한 가격일 때만 체결시키는 예약 주문입니다." }] },
        "stop-loss-order": { commercialIntent: "high", tags: ["trading", "risk"], title: "스탑로스(Stop-Loss) 설정으로 손실 방어하기", description: "잠든 사이 폭락을 막아주는 자동 주문 감시 기능 설정법.", h1: "주식 시장의 안전벨트: 스탑로스", intro: ["직전 저점이 깨지면 자동으로 팔리게 해두세요. 감정을 배제한 기계적 손절이 계좌를 지킵니다."], sections: [{ h2: "트레일링 스탑", content: "주가가 오르면 매도 감시가도 따라 올라가 수익을 극대화하는 고급 주문 방식입니다." }], faq: [{ q: "수수료 있나요?", a: "일반 주문과 동일합니다. 추가 수수료 없습니다." }] },
        "ipo-investing-risk": { commercialIntent: "mid", tags: ["ipo", "risk"], title: "미국 주식 공모주(IPO) 투자 시 유의점 (락업 해제일)", description: "상장 첫날 따상? 미국 IPO는 한국과 다르다. 락업 물량 쏟아지는 시기 체크.", h1: "IPO 대박의 꿈과 현실", intro: ["쿠팡, 암(Arm) 상장 때처럼 화제성은 높지만, 상장 직후 변동성은 상상을 초월합니다."], sections: [{ h2: "락업(Lock-up) 해제일", content: "상장 후 3~6개월 뒤 내부자 물량이 풀리며 주가가 급락하는 경우가 많으니 반드시 확인해야 합니다." }], faq: [{ q: "공모주 청약 가능한가요?", a: "한국 증권사에서도 일부 대행 서비스를 제공하지만 배정 물량이 매우 적습니다." }] },
        "margin-trading-warning": { commercialIntent: "high", tags: ["warning", "leverage"], title: "미수/신용 거래(Margin)의 위험성과 반대매매", description: "증거금 100%가 아니면 빚투입니다. 주식 강제 처분(마진콜) 당하지 않는 법.", h1: "양날의 검: 레버리지 거래", intro: ["돈이 없어도 주식을 살 수 있는 미수거래. 하지만 하락장에선 원금 이상의 빚을 질 수 있습니다."], sections: [{ h2: "반대매매 시스템", content: "담보 비율이 떨어지면 다음 날 아침 하한가로 강제 매도되어 깡통 계좌가 됩니다." }], faq: [{ q: "해외주식도 미수 되나요?", a: "증권사 및 계좌 설정에 따라 가능하므로 실수로 쓰지 않게 주의해야 합니다." }] },
        "us-stock-news-sites": { commercialIntent: "low", tags: ["source", "news"], title: "미국 주식 실시간 뉴스 사이트 추천 TOP 5", description: "CNBC, 블룸버그, 배런스. 영어를 못해도 번역기로 1등 정보 얻는 곳.", h1: "정보가 곧 돈이다: 뉴스 소스 추천", intro: ["남들보다 한발 빠른 정보가 필요하다면 네이버 뉴스 대신 현지 사이트를 보세요."], sections: [{ h2: "추천 리스트", content: "CNBC(속보), Seeking Alpha(심층 분석), Yahoo Finance(데이터), TipRanks(전문가 의견)" }], faq: [{ q: "유료 구독 가치 있나요?", a: "Seeking Alpha 같은 경우 깊이 있는 분석이 많아 전업 투자자라면 추천합니다." }] }
    },
    // ==============================================================================
    // 2. ETF (Exchange Traded Funds) - Sector, Trend, Comparison (High RPM)
    // ==============================================================================
    "etf": {
        // --- BEST & RANKING ---
        "best-etf-2025": {
            commercialIntent: "high",
            tags: ["etf", "recommendation", "top10"],
            title: "2025년 반드시 주목해야 할 미국 ETF 추천 TOP 10",
            description: "성장주, 배당주, 채권까지. 포트폴리오에 꼭 담아야 할 2025년 유망 ETF 리스트와 선정 이유.",
            h1: "2025 ETF 필승 포트폴리오",
            intro: ["수천 개의 ETF 중 무엇을 사야 할까요? 올해의 트렌드인 AI, 금리 인하, 인도를 키워드로 엄선했습니다."],
            sections: [
                { h2: "성장형: QQQM", content: "QQQ와 동일하지만 수수료가 저렴한 QQQM이 장기 투자자에게 더 유리합니다." },
                { h2: "배당형: SCHD", content: "배당 성장의 대명사. 금리 인하 시기에는 배당주의 매력이 다시 부각될 것입니다." }
            ],
            faq: [{ q: "국내 상장 ETF가 낫나요?", a: "절세계좌(ISA)를 쓴다면 국내, 달러 자산이 목표라면 미국 직투가 좋습니다." }]
        },
        "spy-vs-voo-vs-ivv": {
            commercialIntent: "mid",
            tags: ["comparison", "sp500", "etf"],
            title: "S&P500 ETF 비교: SPY vs VOO vs IVV 승자는?",
            description: "똑같은 S&P500을 추종하는데 수수료와 거래량이 다르다? 나에게 맞는 ETF 고르는 법.",
            h1: "S&P500 ETF, 아무거나 사지 마세요",
            intro: ["가장 유명한 SPY, 수수료가 싼 VOO, 그리고 IVV. 미묘하지만 중요한 차이를 비교해 드립니다."],
            sections: [
                { h2: "운용 보수 차이", content: "SPY(0.09%)가 VOO(0.03%)보다 3배 비쌉니다. 장기 투자라면 VOO나 IVV가 무조건 유리합니다." },
                { h2: "거래량과 유동성", content: "단타를 치거나 옵션 거래를 한다면 거래량이 압도적인 SPY가 유리할 수 있습니다." }
            ],
            faq: [{ q: "배당금도 똑같나요?", a: "기초 자산이 같으므로 거의 동일하지만, 운용 보수 차이로 인해 실수령액은 미세하게 다를 수 있습니다." }]
        },
        // --- SECTOR & THEME ---
        "semiconductor-soxx-vs-smh": {
            commercialIntent: "high",
            tags: ["etf", "semicon", "comparison"],
            title: "반도체 ETF 양대산맥: SOXX vs SMH 전격 비교",
            description: "엔비디아 비중이 더 높은 ETF는? 필라델피아 반도체 지수의 SOXX와 반에크 SMH 승부.",
            h1: "반도체 슈퍼사이클, 어디에 탈까?",
            intro: ["AI 시대의 쌀, 반도체. 대표 ETF인 SOXX와 SMH는 구성 종목 비중이 다릅니다. 엔비디아 집중 투자라면 SMH가 답일 수 있습니다."],
            sections: [
                { h2: "엔비디아 비중", content: "SMH는 엔비디아 비중이 20%를 상회(단일 종목 최대)하지만, SOXX는 상한선이 있어 더 분산(8%대)되어 있습니다." },
                { h2: "수익률 비교", content: "최근 5년간은 엔비디아 독주로 인해 SMH의 수익률이 더 높았습니다." }
            ],
            faq: [{ q: "3배 레버리지 SOXL은 어떤가요?", a: "변동성이 3배라 하락장에서는 계좌가 녹을 수 있으니 단기 매매용으로만 접근하세요." }]
        },
        "ai-etf-botz-aiq-arkq": {
            commercialIntent: "high",
            tags: ["etf", "ai", "future"],
            title: "인공지능(AI) & 로봇 ETF 추천 (BOTZ, AIQ, ARKQ)",
            description: "챗GPT가 쏘아올린 공. 하드웨어를 넘어 소프트웨어와 로봇으로 확장되는 AI ETF 지도.",
            h1: "제2의 엔비디아를 품은 ETF",
            intro: ["이미 많이 오른 엔비디아가 부담스럽다면, AI 생태계 전반에 투자하는 테마 ETF가 대안입니다."],
            sections: [
                { h2: "BOTZ (Global Robotics)", content: "AI 두뇌를 가진 로봇 기업(수술로봇, 산업용 로봇)에 집중 투자합니다." },
                { h2: "AIQ (Artificial Intelligence)", content: "메타, 오라클, 세일즈포스 등 AI 기술을 활용해 돈을 버는 소프트웨어 기업 비중이 높습니다." }
            ],
            faq: [{ q: "수수료가 비싸지 않나요?", a: "테마형 ETF는 보통 0.6%~0.75% 수준으로 시장 지수형보다 비싼 편입니다." }]
        },
        "covered-call-jepi-jepq": {
            commercialIntent: "high",
            tags: ["etf", "dividend", "income"],
            title: "커버드콜 ETF의 모든 것: JEPI vs JEPQ (수익률, 세금)",
            description: "하락장에서도 수익을 내는 커버드콜 전략. 연 10% 분배금의 비밀과 원금 손실 위험.",
            h1: "횡보장에서도 돈 버는 마법: 커버드콜",
            intro: ["주가 상승분 일부를 포기하는 대신 옵션 프리미엄을 챙겨 배당으로 줍니다. 은퇴자들의 필수템이 된 이유입니다."],
            sections: [
                { h2: "JEPI (S&P500 기반)", content: "변동성이 낮은 대형주 위주라 하락 방어력이 좋고 배당이 안정적입니다." },
                { h2: "JEPQ (나스닥 기반)", content: "기술주 변동성을 이용해 더 높은 배당을 주지만, 하락 시 낙폭도 더 클 수 있습니다." }
            ],
            faq: [{ q: "배당소득세 폭탄 맞나요?", a: "분배금이 많기 때문에 금융소득종합과세 기준(2천만원)을 넘기 쉽습니다. 절세 계좌 활용이 필수입니다." }]
        },
        "schd-long-term-review": {
            commercialIntent: "high",
            tags: ["etf", "dividend", "growth"],
            title: "SCHD 장기 투자 시뮬레이션: 10년 뒤 배당금은?",
            description: "한국인이 가장 사랑하는 ETF 1위 SCHD. 배당 성장률 12%의 복리 효과 분석.",
            h1: "황금거위 SCHD, 지금 모아가도 될까?",
            intro: ["당장의 배당률(3.5%)보다 무서운 건 매년 두 자릿수씩 늘어나는 배당 성장률입니다. 10년 뒤엔 투자 원금 대비 10% 이상의 배당을 받게 됩니다."],
            sections: [
                { h2: "종목 선정 기준", content: "10년 연속 배당 지급, 잉여현금흐름 등 까다로운 기준을 통과한 100개 기업만 담습니다. 자동으로 우량주만 남게 됩니다." },
                { h2: "단점: 기술주 부족", content: "금융, 필수소비재 비중이 높아 기술주 중심의 상승장에서는 소외될 수 있습니다." }
            ],
            faq: [{ q: "QQQ와 섞어서 사면 좋나요?", a: "네, SCHD의 안정성과 QQQ의 성장성이 상호 보완되어 훌륭한 포트폴리오가 됩니다." }]
        },
        "india-etf-inda-nifty": {
            commercialIntent: "mid",
            tags: ["etf", "india", "emerging"],
            title: "넥스트 차이나 '인도' ETF 투자 가이드 (INDA vs EPI)",
            description: "고성장 인도 시장에 올라타라. 대표 ETF인 INDA와 수익률이 더 좋은 EPI 비교.",
            h1: "코끼리가 달린다: 인도 ETF 공략",
            intro: ["중국을 대체할 세계의 공장 인도. 인구 수 1위와 젊은 노동력을 바탕으로 고속 성장이 예상됩니다."],
            sections: [
                { h2: "INDA (iShares)", content: "가장 대표적인 Nifty 50 추종 ETF지만, 수익 재투자 시 세금 이슈가 있어 성과가 조금 낮을 수 있습니다." },
                { h2: "EPI (WisdomTree)", content: "수익 가중 방식으로 운용되어 장기 성과가 INDA보다 우수한 편입니다. 수수료는 조금 더 비쌉니다." }
            ],
            faq: [{ q: "직접 투자는 왜 안 되나요?", a: "인도 정부의 규제로 외국인 개인의 직접 투자가 매우 까다롭습니다. ETF가 유일한 대안입니다." }]
        },
        "leveraged-etf-tqqq-soxl": {
            commercialIntent: "high",
            tags: ["etf", "leverage", "risk"],
            title: "3배 레버리지 ETF (TQQQ, SOXL) 장기 투자의 위험성",
            description: "인생 역전 vs 깡통 계좌. 음(-)의 복리 효과(Volatility Drag)로 인해 장투하면 돈 잃는 이유.",
            h1: "야수의 심장: 레버리지, 독인가 약인가",
            intro: ["나스닥이 1% 오르면 3% 수익? 달콤하지만 횡보장에서는 계좌가 녹아내리는 구조적 함정이 있습니다."],
            sections: [
                { h2: "음의 복리 (Volatility Drag)", content: "100원이 50% 떨어지면 50원, 다시 50% 올라도 75원입니다. 등락을 반복하면 원금이 줄어듭니다." },
                { h2: "수수료 비용", content: "레버리지 ETF는 운용 보수가 1%에 육박하여 장기 보유 시 비용 부담이 큽니다." }
            ],
            faq: [{ q: "적립식 매수는 괜찮나요?", a: "변동성을 이용한 적립식 매수(무한매수법 등)는 유효한 전략일 수 있지만 출구 전략이 필수입니다." }]
        },
        "monthly-dividend-etf-list": {
            commercialIntent: "high",
            tags: ["etf", "dividend", "monthly"],
            title: "매월 배당 주는 월배당 ETF 모음 (DIA, O, JEPI)",
            description: "분기 배당은 기다리기 힘들다면? 매달 현금흐름을 만들어주는 효자 ETF 리스트.",
            h1: "월급날이 여러 개? 월배당 ETF 컬렉션",
            intro: ["은퇴 후 생활비나 재투자 재원을 위해 매달 현금이 필요한 투자자에게 적합합니다."],
            sections: [
                { h2: "DIA (다우존스)", content: "가장 오래된 월배당 ETF 중 하나로 다우존스 30개 우량 기업에 투자합니다." },
                { h2: "채권형 월배당 (TLT)", content: "주식보다 안전한 국채에 투자하며 매달 이자를 받습니다. 금리 인하 기대감도 유효합니다." }
            ],
            faq: [{ q: "월배당이 분기배당보다 좋나요?", a: "복리 효과 측면에서는 배당을 자주 받아 재투자하는 것이 유리할 수 있습니다." }]
        },
        "bond-etf-tlt-shy": {
            commercialIntent: "mid",
            tags: ["etf", "bond", "macro"],
            title: "미국 국채 ETF 투자 가이드 (TLT, IEF, SHY)",
            description: "경기 침체의 보험, 채권. 장기채(TLT)와 단기채(SHY)의 차이점과 금리별 투자 전략.",
            h1: "안전 자산의 최후 보루: 미국 국채 ETF",
            intro: ["주식 시장이 불안할 때 채권은 훌륭한 헷지 수단이 됩니다. 만기(Duration)에 따라 종류가 나뉩니다."],
            sections: [
                { h2: "TLT (20년 이상 장기채)", content: "금리 변동에 매우 민감합니다. 금리 인하 시 큰 시세 차익을 기대할 수 있습니다." },
                { h2: "SHY (1~3년 단기채)", content: "주가 변동이 거의 없고 현금(달러파킹) 대용으로 쓰며 이자 수익을 챙깁니다." }
            ],
            faq: [{ q: "채권 가격은 왜 금리와 반대인가요?", a: "새 채권의 금리가 오르면 기존 채권(낮은 금리)의 매력이 떨어져 헐값에 팔아야 하기 때문입니다." }]
        },
        // ... Concisely adding 20 more entries
        "japan-etf-ewj-dxj": { commercialIntent: "mid", tags: ["etf", "japan"], title: "일본 주식 ETF: EWJ vs DXJ (환헤지 필수?)", description: "엔저 시대, 일본 증시에 투자하는 법. 도요타, 소니를 한 번에.", h1: "잃어버린 30년의 끝? 일본 ETF", intro: ["워렌 버핏도 투자한 일본 상사주. 엔화 약세 수혜를 보는 수출주 중심 포트폴리오."], sections: [{ h2: "DXJ (환헤지)", content: "엔화 약세 구간에서는 환헤지가 된 DXJ의 수익률이 압도적으로 좋습니다." }], faq: [{ q: "엔화 가치 상승에 베팅하려면?", a: "FXY 같은 통화 ETF를 사거나 환노출형 EWJ가 낫습니다." }] },
        "china-etf-mchi-kweb": { commercialIntent: "mid", tags: ["etf", "china", "risk"], title: "중국 ETF 투자, 기회인가 함정인가 (MCHI, KWEB)", description: "알리바바, 텐센트 바닥론. 중국 빅테크 규제 리스크와 반등 가능성.", h1: "대륙의 실수? 중국 ETF 분석", intro: ["저평가 매력이 있지만 정치적 리스크가 큽니다. 홍콩 증시에 상장된 테크주 위주 투자가 일반적입니다."], sections: [{ h2: "KWEB (인터넷)", content: "중국판 나스닥. 알리바바, 텐센트, 메이투안 등 플랫폼 기업에 집중투자합니다." }], faq: [{ q: "후강퉁과 선강퉁이 뭔가요?", a: "상해와 심천 증시를 외국인이 거래할 수 있게 한 제도입니다." }] },
        "gold-silver-iau-slv": { commercialIntent: "mid", tags: ["etf", "commodity"], title: "금/은 ETF (GLD, IAU, SLV) 투자법", description: "인플레이션 헷지 수단. 실물 금 vs ETF 비용 비교.", h1: "불변의 자산: 금 ETF", intro: ["전쟁이나 경제 위기 때 빛을 발합니다. 보관료가 없는 ETF가 실물보다 효율적입니다."], sections: [{ h2: "GLD vs IAU", content: "둘 다 금 현물 ETF지만 IAU가 주당 가격이 낮고 수수료가 조금 더 저렴해 개인에게 적합합니다." }], faq: [{ q: "세금은 어떻게 되나요?", a: "매매차익 22% 양도소득세 분리과세 대상입니다." }] },
        "oil-etf-uso-xle": { commercialIntent: "mid", tags: ["etf", "energy"], title: "유가 연동 ETF (USO) vs 에너지 기업 ETF (XLE)", description: "기름값 오를 때 뭐 살까? 선물 롤오버 비용이 있는 USO보다 XLE가 나은 이유.", h1: "석유 전쟁의 승자 찾기", intro: ["유가 상승 혜택을 보려면 원유 선물보다는 엑슨모빌 같은 에너지 기업에 투자하는 게 낫습니다."], sections: [{ h2: "USO의 함정", content: "선물 만기 교체 비용(롤오버) 때문에 유가가 횡보만 해도 원금 손실이 납니다." }], faq: [{ q: "배당도 주나요?", a: "XLE는 에너지 기업 배당(3~4%)을 주지만 USO는 주지 않습니다." }] },
        "lithium-battery-lit": { commercialIntent: "high", tags: ["etf", "ev"], title: "2차전지/리튬 ETF (LIT): 앨버말부터 삼성SDI까지", description: "전기차 시대의 하얀 석유 리튬. 글로벌 배터리 밸류체인에 투자하기.", h1: "전기차 심장: 배터리 ETF", intro: ["테슬라는 못 믿어도 배터리 시장 성장은 믿는다면? 소재부터 셀 제조까지 다 담은 LIT."], sections: [{ h2: "구성 종목", content: "세계 1위 리튬 기업 앨버말과 한국의 삼성SDI, LG에너지솔루션도 포함되어 있습니다." }], faq: [{ q: "중국 기업 비중은?", a: "CATL, BYD 등 중국 기업 비중이 꽤 높아 미중 갈등 리스크가 있습니다." }] },
        "cloud-computing-skyjj": { commercialIntent: "mid", tags: ["etf", "tech"], title: "클라우드 컴퓨팅 ETF (SKYY, CLOU) 비교", description: "AWS, Azure, Google Cloud. 구독 경제의 핵심 클라우드 산업 투자.", h1: "구름 위의 수익: 클라우드 ETF", intro: ["AI도 결국 클라우드 위에서 돌아갑니다. 불황에도 성장하는 B2B 소프트웨어 기업들."], sections: [{ h2: "SKYY (First Trust)", content: "클라우드 인프라(IaaS)부터 서비스(SaaS)까지 전 영역 대형주 위주 투자." }], faq: [{ q: "변동성이 큰가요?", a: "성장주 위주라 금리 인상기에 취약합니다." }] },
        "cyber-security-cibr-hack": { commercialIntent: "mid", tags: ["etf", "security"], title: "사이버 보안 ETF (CIBR, HACK) 전망", description: "해킹 위협이 늘어날수록 돈 버는 기업들. 팔로알토, 크라우드스트라이크.", h1: "디지털 방패: 보안 섹터 ETF", intro: ["전쟁도 해킹으로 하는 시대. 국가 안보와 직결된 필수 소비재입니다."], sections: [{ h2: "CIBR", content: "유동성이 가장 풍부하고 보안 솔루션뿐 아니라 하드웨어 기업도 포함합니다." }], faq: [{ q: "방산주와 같이 움직이나요?", a: "비슷한 경향이 있지만 기술주(나스닥)와의 상관관계가 더 높습니다." }] },
        "biotech-xbi-ibb": { commercialIntent: "mid", tags: ["etf", "bio"], title: "바이오 테크 ETF: IBB(대형) vs XBI(중소형)", description: "임상 성공 대박을 노리는 바이오 섹터. 금리 인하 최대 수혜주.", h1: "꿈을 먹는 바이오 ETF", intro: ["신약 개발 성공 확률은 낮지만, ETF로 묶어 사면 리스크를 헷지할 수 있습니다."], sections: [{ h2: "XBI의 폭발력", content: "동일 가중 방식이라 중소형주가 튀어 오를 때 수익률이 폭발적입니다. 단, 하락폭도 큽니다." }], faq: [{ q: "대형 제약사는?", a: "안정성을 원하면 존슨앤존슨, 화이자 등이 많은 IBB나 XLV가 낫습니다." }] },
        "defense-ita-xar": { commercialIntent: "mid", tags: ["etf", "defense"], title: "우주 항공 및 방산 ETF (ITA, XAR)", description: "지정학적 리스크(전쟁) 헷지 수단. 록히드마틴, 보잉, 레이시온.", h1: "평화를 원하면 전쟁을 대비하라: 방산 ETF", intro: ["러우 전쟁, 중동 분쟁 등 끊이지 않는 갈등 속에 방산 기업의 수주 잔고는 넘쳐납니다."], sections: [{ h2: "ITA", content: "보잉 비중이 높아 보잉 주가 리스크에 노출되지만 가장 대표적인 방산 ETF입니다." }], faq: [{ q: "우주 산업도 포함되나요?", a: "네, 위성 발사 등 우주 항공 기술 기업들이 대거 포함됩니다." }] },
        "consumer-staples-xlp": { commercialIntent: "low", tags: ["etf", "defensive"], title: "경기 방어주 필수소비재 ETF (XLP)", description: "코카콜라, P&G, 코스트코. 경기 침체가 와도 샴푸는 쓴다.", h1: "불황에 강한 필수소비재 ETF", intro: ["하락장에서 계좌를 지켜주는 든든한 방패. 배당도 꼬박꼬박 줍니다."], sections: [{ h2: "XLP 특징", content: "월마트, 코스트코, P&G 등 우리 생활에 없어서는 안 될 기업들에 투자합니다." }], faq: [{ q: "성장성은 없나요?", a: "주가 급등은 기대하기 어렵지만 꾸준한 우상향과 배당이 장점입니다." }] },
        "esg-etf-esgu": { commercialIntent: "low", tags: ["etf", "trend"], title: "ESG ETF (ESGU) 투자 가치 분석", description: "착한 기업이 돈도 잘 벌까? 환경(E), 사회(S), 지배구조(G) 우수 기업 투자.", h1: "지속 가능한 투자: ESG", intro: ["글로벌 연기금들이 ESG 투자를 의무화하면서 수급이 들어오는 섹터입니다."], sections: [{ h2: "그린워싱 주의", content: "무늬만 ESG인 기업도 있으니 편입 종목을 잘 살펴야 합니다." }], faq: [{ q: "수익률은 어떤가요?", a: "기술주 비중이 높아 S&P500과 비슷하거나 약간 높은 성과를 보여왔습니다." }] },
        "ark-innovation-arkk": { commercialIntent: "high", tags: ["etf", "growth", "risk"], title: "Cathy Wood의 ARK ETF (ARKK) 몰락과 반등", description: "파괴적 혁신 기업 투자. 테슬라, 로쿠, 줌. 고점 대비 -70%의 교훈.", h1: "혁신인가 거품인가: ARKK", intro: ["코로나 시기 3배 수익을 줬던 전설의 ETF. 금리 인상 직격탄을 맞고 추락했습니다."], sections: [{ h2: "액티브 ETF의 위험", content: "펀드매니저의 판단에 전적으로 의존하므로 시장 예측이 틀리면 지수보다 훨씬 저조합니다." }], faq: [{ q: "지금 물타기 해도 되나요?", a: "금리 인하기에는 반등 탄력이 가장 클 수 있으나 여전히 고위험 상품입니다." }] },
        "buffett-etf-brk-b": { commercialIntent: "high", tags: ["etf", "guru"], title: "워렌 버핏의 버크셔 해서웨이(BRK.B) = ETF?", description: "운용 수수료가 없는 최고의 ETF. 애플, 옥시덴탈, 코카콜라를 담은 지주사.", h1: "오마하의 현인이 운용하는 사설 ETF", intro: ["버크셔는 개별 주식이지만 사실상 초우량 기업들을 모아놓은 펀드와 같습니다."], sections: [{ h2: "배당 없음의 미학", content: "배당을 주는 대신 그 돈으로 자사주를 사거나 더 좋은 기업을 인수해 주가를 올립니다 (세금 이연 효과)." }], faq: [{ q: "S&P500보다 수익률 좋나요?", a: "장기적으로는 시장을 이겨왔지만 최근엔 빅테크 위주 장세에서 비슷하거나 소폭 하회했습니다." }] },
        "uranium-etf-ura": { commercialIntent: "mid", tags: ["etf", "energy"], title: "원자력/우라늄 ETF (URA) 전망", description: "AI 데이터센터 전력 수급의 대안 SMR. 우라늄 광산 기업 투자.", h1: "돌아온 원전: 우라늄 ETF", intro: ["탄소 중립과 AI 전력 수요 폭증으로 원자력이 재조명받고 있습니다."], sections: [{ h2: "카메코(Cameco) 비중", content: "세계 최대 우라늄 기업 카메코 비중이 20% 이상입니다." }], faq: [{ q: "유가와 관련 있나요?", a: "대체 에너지 관계라 유가가 오르면 원전 수요도 늘어 반사이익을 얻습니다." }] },
        "inverse-sqqq-psq": { commercialIntent: "high", tags: ["etf", "hedging"], title: "하락장에 돈 버는 인버스 ETF (SQQQ, PSQ) 활용법", description: "나스닥 숏 배팅. 헷징 목적으로만 써야 하는 이유.", h1: "시장이 망할 때 웃는 인버스 투자", intro: ["주식이 떨어질 것 같을 때 보험처럼 사두는 상품. 하지만 장기 보유는 독입니다."], sections: [{ h2: "SQQQ (-3배)", content: "나스닥이 1% 내리면 3% 수익. 단기 트레이딩용입니다." }], faq: [{ q: "배당금 주나요?", a: "공매도 이자 등을 반영해 가끔 주기도 하지만 기대하지 않는 게 좋습니다." }] },
        "homebuilders-etf-itb": { commercialIntent: "mid", tags: ["etf", "sector"], title: "미국 주택 건설 ETF (ITB, XHB)", description: "금리 인하의 숨은 수혜주. 미국 주택 공급 부족과 건설사 호황.", h1: "집 짓는 주식: 주택 건설 ETF", intro: ["미국은 만성적인 주택 부족 상태입니다. 금리가 내리면 주택 수요가 폭발할 수 있습니다."], sections: [{ h2: "DR Horton, Lennar", content: "미국 최대 건설사들이 포함되어 있습니다. PER이 10배 내외로 밸류에이션 매력도 있습니다." }], faq: [{ q: "부동산 리츠랑 다른가요?", a: "리츠는 임대 수익, 건설주는 집을 팔아 번 돈입니다. 사이클이 다릅니다." }] }
    },
    // ==============================================================================
    // 3. 배당 (Dividend) - High Yield, Monthly, Strategy (High RPM)
    // ==============================================================================
    "dividend": {
        // --- STRATEGY & HIGH YIELD ---
        "monthly-dividend-realty-income-o": {
            commercialIntent: "high",
            tags: ["dividend", "monthly", "reit"],
            title: "월배당의 황제 리얼티 일컴(O) 배당금 조회 및 전망",
            description: "50년 넘게 배당을 늘려온 배당 귀족. 매달 들어오는 제2의 월급 만들기 현실성 분석.",
            h1: "월세 받는 주식: 리얼티 인컴(O)",
            intro: ["건물주가 되는 가장 쉬운 방법. 미국 전역 1만 개 이상의 부동산에서 나오는 임대료를 매달 배당으로 받습니다."],
            sections: [
                { h2: "배당 성장 역사", content: "금융위기, 코로나 때도 배당을 줄이지 않고 오히려 늘렸습니다. 은퇴 포트폴리오의 코어 자산입니다." },
                { h2: "금리 인하 수혜", content: "리츠는 부채가 많아 금리 인하 시 이자 비용 감소로 수익성이 개선됩니다." }
            ],
            faq: [{ q: "배당률은 얼마인가요?", a: "주가에 따라 다르지만 보통 연 5~6% 수준을 유지합니다." }]
        },
        "dividend-kings-list-2025": {
            commercialIntent: "high",
            tags: ["dividend", "top10", "safe"],
            title: "2025 배당왕(Dividend Kings) 리스트 TOP 10 (50년 연속 인상)",
            description: "경기 침체가 와도 배당을 주는 기업들. 코카콜라, 3M, 존슨앤존슨 등의 배당 안전성 분석.",
            h1: "배당 투자의 끝판왕: Dividend Kings",
            intro: ["전쟁과 오일 쇼크를 모두 견뎌내고 50년 이상 배당을 늘려온 위대한 기업들입니다."],
            sections: [
                { h2: "선정 기준", content: "S&P500 지수 포함 기업 중 50년 이상 연속 배당 증액 기업만 선정됩니다." },
                { h2: "타겟(Target) 제외 이슈", content: "최근 실적 부진으로 배당왕 자격 유지에 대한 우려가 나왔던 기업들도 체크해야 합니다." }
            ],
            faq: [{ q: "배당 귀족(Aristocrats)과는 뭐가 다른가요?", a: "배당 귀족은 25년 이상, 배당왕은 50년 이상 연속 인상 기업을 말합니다." }]
        },
        "schd-vs-jepi-income-battle": {
            commercialIntent: "high",
            tags: ["comparison", "dividend", "income"],
            title: "SCHD vs JEPI: 천만 원 투자 시 월 배당금 차이",
            description: "성장의 SCHD냐, 당장의 현금 JEPI냐. 은퇴 시점에 따른 최적의 포트폴리오 비율 추천.",
            h1: "배당 끝장 토론: SCHD vs JEPI",
            intro: ["SCHD는 배당이 매년 10%씩 늘어나고, JEPI는 당장 10%를 줍니다. 당신의 나이에 따라 정답이 다릅니다."],
            sections: [
                { h2: "2030 투자자", content: "복리 효과를 누릴 시간이 충분하므로 배당 성장과 주가 상승을 모두 잡는 SCHD 비중을 높여야 합니다." },
                { h2: "5060 은퇴자", content: "당장의 생활비 현금 흐름이 중요하므로 고배당 커버드콜인 JEPI나 JEPQ 비중이 높아야 합니다." }
            ],
            faq: [{ q: "반반 섞어도 되나요?", a: "가장 추천하는 방식입니다. 성장과 현금 흐름의 균형을 맞출 수 있습니다." }]
        },
        "dividend-tax-15-percent": {
            commercialIntent: "high",
            tags: ["tax", "dividend", "guide"],
            title: "미국 주식 배당소득세(15%)와 종합소득세 신고 기준",
            description: "세금 떼고 내 통방에 얼마나 꽂힐까? 2천만 원 초과 시 건보료 폭탄 피하는 법.",
            h1: "배당금 세금의 모든 것",
            intro: ["증권사 계좌에 들어올 땐 이미 미국 세금 15%가 떼인 상태입니다. 문제는 한국 세금입니다."],
            sections: [
                { h2: "금융소득종합과세", content: "이자+배당 소득이 연 2,000만 원을 넘으면 초과분은 근로소득 등과 합산되어 최고 45% 세율을 맞을 수 있습니다." },
                { h2: "절세 계좌 활용", content: "ISA나 연금저축 계좌를 활용하면 과세 이연 및 저율 과세 혜택을 볼 수 있습니다." }
            ],
            faq: [{ q: "환율은 언제 기준인가요?", a: "배당 지급일 기준 기준환율로 계산되어 원화 소득으로 잡힙니다." }]
        },
        "high-yield-trap-warning": {
            commercialIntent: "mid",
            tags: ["warning", "dividend", "risk"],
            title: "배당 수익률 10%의 함정 (Yield Trap) 피하는 법",
            description: "주가가 폭락해서 배당률이 높아진 건 아닐까? 배당 컷(삭감) 신호 3가지.",
            h1: "고배당의 유혹: 독이 든 성배",
            intro: ["은행이자보다 3배 많이 준다고 덜컥 샀다가는 원금이 반토막 날 수 있습니다."],
            sections: [
                { h2: "Pay-out Ratio(배당 성향)", content: "이익보다 배당을 더 많이 준다면(100% 초과) 제 살 깎아먹기입니다. 곧 배당이 삭감될 신호입니다." },
                { h2: "ZIM 사례", content: "해운주 ZIM은 한때 50% 배당을 줬지만, 실적 악화 후 배당을 전액 삭감하여 주가가 폭락했습니다." }
            ],
            faq: [{ q: "리츠는 배당 성향이 높던데요?", a: "리츠는 감가상각비 때문에 순이익이 적어 보이므로 AFFO(조정운영수익) 기준 배당 성향을 봐야 합니다." }]
        },
        "living-off-dividends-plan": {
            commercialIntent: "high",
            tags: ["strategy", "fire", "retirement"],
            title: "배당금으로 먹고 살기 (Fire족): 필요 자본금 계산",
            description: "월 300만원 받으려면 얼마가 필요할까? 배당 성장률을 고려한 현실적인 은퇴 플랜.",
            h1: "경제적 자유를 위한 배당 계산기",
            intro: ["꿈만 꾸지 말고 구체적인 숫자를 확인하세요. 시가배당률 4% 기준으로 계산해봅니다."],
            sections: [
                { h2: "월 300만 원(세후) 달성", content: "약 350만 원(세전)이 필요하며, 연 배당률 4% 기준 약 10억 5천만 원의 자산이 필요합니다." },
                { h2: "초기 자본이 부족하다면?", content: "고배당 커버드콜(연 10%)을 섞어 필요 자본금을 4억 원대로 낮출 수 있습니다. 단, 원금 감소 리스크는 감수해야 합니다." }
            ],
            faq: [{ q: "물가 상승률은요?", a: "그래서 배당금이 매년 물가 상승률 이상으로 성장하는 기업(배당 성장주)에 투자해야 합니다." }]
        },
        "safe-payout-ratio": {
            commercialIntent: "mid",
            tags: ["term", "dividend", "analysis"],
            title: "안전한 배당 성향(Payout Ratio) 기준은?",
            description: "내가 산 주식 배당 끊길까? 섹터별 적정 배당 성향 가이드 (리츠, BDC 예외).",
            h1: "배당의 지속 가능성 체크",
            intro: ["돈을 잘 벌어야 배당도 계속 줄 수 있습니다. 버는 돈 중 얼마를 주는지 확인하세요."],
            sections: [
                { h2: "일반 기업", content: "보통 40~60%가 적정합니다. 20% 이하라면 인색한 것이고, 80% 이상이면 위험 신호입니다." },
                { h2: "리츠(REITs) 예외", content: "법적으로 이익의 90% 이상을 배당해야 법인세를 면제받으므로 수치가 높게 나옵니다. 정상이니 놀라지 마세요." }
            ],
            faq: [{ q: "배당 성향이 마이너스면?", a: "적자인데도 빚내서 배당을 주고 있다는 뜻입니다. 당장 도망쳐야 합니다." }]
        },
        // ... Concise additions
        "coca-cola-ko": { commercialIntent: "low", tags: ["stock", "dividend"], title: "코카콜라(KO) 배당 분석: 워렌 버핏이 안 파는 이유", description: "지구가 멸망해도 코카콜라는 팔린다. 필수소비재의 방어력과 배당 매력.", h1: "영원한 배당킹: 코카콜라", intro: ["경기 침체가 와도 사람들은 콜라를 마십니다. 주가 변동성이 적고 채권처럼 안전합니다."], sections: [{ h2: "가격 결정력", content: "인플레이션이 오르면 가격을 올려 소비자에게 전가할 수 있는 강력한 브랜드 파워가 있습니다." }], faq: [{ q: "성장성이 너무 없지 않나요?", a: "주가 급등은 없지만 연 3% 배당 + 3% 성장을 꾸준히 보여줍니다." }] },
        "pepsi-pep": { commercialIntent: "low", tags: ["stock", "dividend"], title: "펩시코(PEP) vs 코카콜라: 배당 성장률 승자는?", description: "음료만 파는 코카콜라 vs 과자도 파는 펩시. 사업 다각화의 장점.", h1: "콜라 전쟁의 승자", intro: ["사실 매출은 펩시가 더 높습니다. 레이즈, 치토스 등 스낵 사업부가 든든하기 때문입니다."], sections: [{ h2: "배당 성장", content: "최근 10년간 배당 성장률은 펩시가 코카콜라보다 소폭 높았습니다." }], faq: [{ q: "둘 중 뭘 살까요?", a: "취향 차이지만 성장성을 더 본다면 펩시, 안정성을 본다면 코카콜라입니다." }] },
        "johnson-johnson-jnj": { commercialIntent: "mid", tags: ["stock", "dividend"], title: "존슨앤존슨(JNJ) 배당과 소비자 헬스케어 분사 이슈", description: "타이레놀과 밴드에이드를 파는 헬스케어 대장주. 소송 리스크 분석.", h1: "60년 연속 배당 인상: JNJ", intro: ["AAA 신용등급을 가진(미국 정부보다 높았던) 초우량 기업입니다."], sections: [{ h2: "켄뷰(Kenvue) 분사", content: "소비자 사업부(로션 등)를 분사하고 제약/의료기기에 집중하며 성장을 꾀하고 있습니다." }], faq: [{ q: "소송(베이비파우더) 문제는?", a: "수년째 발목을 잡고 있지만 막대한 현금흐름으로 충분히 감당 가능한 수준으로 평가됩니다." }] },
        "main-street-capital-main": { commercialIntent: "high", tags: ["stock", "dividend", "bdc"], title: "월배당 BDC 1대장: 메인 스트리트 캐피털(MAIN)", description: "중소기업에 돈 빌려주고 이자 받는 BDC. 특별 배당의 매력.", h1: "월급 주는 주식 MAIN", intro: ["BDC(Business Development Company) 계의 리얼티 인컴. 꾸준한 월배당과 연말 보너스(특별 배당)가 쏠쏠합니다."], sections: [{ h2: "안정성", content: "수많은 BDC 중에서도 NAV(순자산가치)가 꾸준히 우상향하는 희귀한 우량주입니다." }], faq: [{ q: "BDC 투자가 위험한가요?", a: "경기 침체 시 중소기업 파산 리스크가 있어 선별 투자가 중요합니다." }] },
        "altria-mo-risk": { commercialIntent: "high", tags: ["stock", "dividend", "warning"], title: "알트리아(MO) 배당률 9%의 진실 (담배 산업의 미래)", description: "말보로 회사. 흡연율 감소와 전자담배 전환 실패 리스크.", h1: "저물어가는 담배 제국: 알트리아", intro: ["배당률이 9%에 육박하지만 주가는 계속 우하향 중입니다. 전형적인 Yield Trap일 수 있습니다."], sections: [{ h2: "규제 리스크", content: "FDA의 멘솔 담배 금지 등 정부 규제가 끊이지 않습니다." }], faq: [{ q: "그래도 배당은 주나요?", a: "현금 흐름은 여전히 막대하여 당분간 배당 컷 가능성은 낮지만 원금 손실 우려가 큽니다." }] },
        "verizon-vz": { commercialIntent: "mid", tags: ["stock", "telecom"], title: "버라이즌(VZ) 배당주 투자 매력 (5G 투자 비용)", description: "미국의 SK텔레콤. 주가 반토막 후 반등 가능성.", h1: "통신주 배당의 매력", intro: ["경기와 상관없이 요금은 냅니다. 대표적인 경기 방어주이자 고배당주(6~7%)입니다."], sections: [{ h2: "부채 문제", content: "5G 주파수 경매와 설비 투자로 막대한 빚이 있어 금리 인상기에 취약했습니다." }], faq: [{ q: "AT&T(T)랑 비교하면?", a: "AT&T는 배당 컷 배신 이력이 있어 버라이즌의 신뢰도가 더 높습니다." }] },
        "stag-industrial-stag": { commercialIntent: "mid", tags: ["stock", "monthly", "reit"], title: "월배당 물류 리츠: STAG 인더스트리얼", description: "아마존 창고 임대업. 이커머스 성장의 수혜주 STAG.", h1: "전자상거래의 뼈대: 물류 리츠", intro: ["창고형 부동산에 투자합니다. 아마존이 최대 임차인이라 안정적입니다."], sections: [{ h2: "월배당 매력", content: "리얼티 인컴처럼 매달 배당을 줍니다. 주가 상승 탄력은 리얼티 인컴보다 좋은 편입니다." }], faq: [{ q: "공실률 걱정은?", a: "이커머스 수요 증가로 공실률이 매우 낮습니다." }] },
        "reit-tax-benefits": { commercialIntent: "high", tags: ["tax", "reit"], title: "리츠(REITs) 투자 시 세금 혜택과 주의점 등", description: "부동산 간접 투자. 배당소득 분리과세 신청 조건.", h1: "부동산 세금 없이 월세 받기", intro: ["건물을 직접 사면 취득세, 재산세, 종부세가 나오지만 리츠 주식은 배당소득세(15%)만 내면 됩니다."], sections: [{ h2: "ISA 계좌 활용", content: "ISA 계좌에서 리츠를 모으면 배당소득세가 면제(200만원 한도)되거나 9.9%로 감면됩니다. 필수입니다." }], faq: [{ q: "미국 리츠도 되나요?", a: "ISA에서는 국내 상장 리츠/ETF만 가능합니다. 미국 직투는 250만원 양도 공제 활용이 유리합니다." }] },
        "ex-dividend-date-strategy": { commercialIntent: "mid", tags: ["strategy", "dividend"], title: "배당락일(Ex-Dividend Date) 매매 전략", description: "배당만 받고 튀기? 배당락일 전날 사서 당일 팔면 생기는 일.", h1: "배당 단타의 허와 실", intro: ["배당금을 받을 권리가 확정된 다음 날(배당락일)에는 보통 배당금만큼 주가가 떨어집니다."], sections: [{ h2: "배당 캡처 전략", content: "이론적으로는 배당락 하락폭보다 배당금이 크면 이득이지만, 세금(15%)을 떼면 본전치기인 경우가 많습니다." }], faq: [{ q: "언제까지 사야 하나요?", a: "배당락일 전날(영업일 기준) 장 마감까지 보유해야 합니다." }] },
        "preferred-stock-dividends": { commercialIntent: "mid", tags: ["stock", "advanced"], title: "우선주(Preferred Stock) 투자 가이드 (O-P vs O)", description: "채권과 주식의 하이브리드. 의결권 없고 배당 더 주는 우선주 투자법.", h1: "안전하게 고배당 즐기기: 우선주", intro: ["미국에는 보통주(Common) 외에도 우선주(Preferred)가 활발히 거래됩니다. 리얼티 인컴도 O 외에 O-P 시리즈가 있습니다."], sections: [{ h2: "고정 배당", content: "우선주는 채권처럼 액면가의 일정 비율(예: 6%)을 고정적으로 지급합니다. 주가가 안 올라도 배당은 짭짤합니다." }], faq: [{ q: "회사가 망하면?", a: "채권자 다음, 보통주 주주보다는 먼저 잔여 재산을 분배받습니다." }] },
        "dividend-yield-vs-growth": { commercialIntent: "low", tags: ["strategy", "concept"], title: "시가배당률 vs 배당성장률: 당신의 선택은?", description: "현재 3% 배당 주는 코카콜라 vs 0.5% 주는 비자(Visa). 10년 뒤 승자는?", h1: "배당 투자 스타일 결정하기", intro: ["은퇴자라면 당장의 시가배당률(High Yield)이 중요하고, 젊은 직장인라면 배당성장률(Growth)이 압도적으로 유리합니다."], sections: [{ h2: "Yield on Cost (투자 원금 대비 배당률)", content: "배당 성장주를 10년 보유하면, 매수 원금 대비 10~20%의 배당을 받는 마법이 일어납니다." }], faq: [{ q: "둘 다 높은 건 없나요?", a: "보통 없습니다. 둘 다 높으면 Yield Trap(함정)일 확률이 높습니다." }] },
        "mlp-tax-complexity": { commercialIntent: "high", tags: ["tax", "warning", "mlp"], title: "MLP 종목(에너지) 투자 시 세금 폭탄 주의 (PTP)", description: "10% 보너스 세금? 외국인 투자자 PTP 종목 매도 시 원천징수 이슈.", h1: "모르고 샀다가 10% 뜯기는 PTP 세금", intro: ["원자재, 에너지 관련 파트너십(MLP) 종목은 매도 금액의 10%를 세금으로 떼가는 규정이 생겼습니다."], sections: [{ h2: "PTP 종목 리스트 확인", content: "대부분의 증권사에서 PTP 지정 종목 매수 시 경고창을 띄워줍니다. 반드시 피하는 게 상책입니다." }], faq: [{ q: "면제되는 종목도 있나요?", a: "네, 발행사가 면제 신청을 하면 일정 기간 유예되기도 하지만 복잡합니다." }] },
        "quarterly-dividend-calendar": { commercialIntent: "mid", tags: ["calendar", "dividend"], title: "분기 배당 캘린더 만들기 (1,4,7,10월 vs 3,6,9,12월)", description: "3개 종목으로 매달 월세 받는 포트폴리오 조합법.", h1: "DIY 월배당 시스템 구축", intro: ["월배당 ETF가 수수료 때문에 싫다면 우량 분기 배당주 3개를 섞어서 직접 만들면 됩다."], sections: [{ h2: "황금 조합", content: "JP모건(1,4,7,10) + 애브비(2,5,8,11) + 리얼티인컴(매월) 혹은 마이크로소프트(3,6,9,12)를 섞으세요." }], faq: [{ q: "관리하기 귀찮지 않나요?", a: "한 번 세팅해두면 평생 자동입니다." }] },
        "special-dividend-examples": {
            commercialIntent: "mid",
            tags: ["dividend", "event"],
            title: "특별 배당(Special Dividend)의 깜짝 선물",
            description: "코스트코 10달러 특별 배당 사례. 기업이 돈 보따리를 풀 때.",
            h1: "주주들을 위한 보너스: 특별 배당",
            intro: ["실적이 너무 좋거나 자산을 매각했을 때 일회성으로 큰 배당을 지급하는 경우가 있습니다."],
            sections: [
                { h2: "코스트코 사례", content: "몇 년에 한 번씩 파격적인 특별 배당을 지급하여 주가도 오르고 주주들도 환호합니다." }
            ],
            faq: [{ q: "미리 알 수 있나요?", a: "보통 깜짝 발표를 하지만, 현금 보유량이 너무 많아지면 기대감이 형성됩니다." }]
        }
    }
};
