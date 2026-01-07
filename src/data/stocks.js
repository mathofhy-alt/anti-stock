export const STOCK_DATA = {
    // Domestic (Korea)
    'samsung': {
        name: '삼성전자',
        symbol: '005930',
        keywords: ['삼성전자', '삼전', '005930', 'DS부문'],
        sector: '반도체',
        market: 'domestic',
        description: '글로벌 메모리 반도체 1위 기업이자 스마트폰, 가전 시장의 거인. AI 시대를 맞아 HBM 수요 폭발의 중심에 서 있습니다.'
    },
    'sk-hynix': {
        name: 'SK하이닉스',
        symbol: '000660',
        keywords: ['SK하이닉스', '하이닉스', '000660', 'HBM'],
        sector: '반도체',
        market: 'domestic',
        description: 'AI용 고대역폭메모리(HBM) 시장의 선두주자. 엔비디아의 핵심 파트너로서 AI 반도체 사이클의 최대 수혜주로 평가받습니다.'
    },
    'hyundai': {
        name: '현대차',
        symbol: '005380',
        keywords: ['현대차', '현대자동차', '005380', '전기차'],
        sector: '자동차',
        market: 'domestic',
        description: '글로벌 Top 3 자동차 메이커. 전기차(EV)와 하이브리드 포트폴리오의 조화로 안정적인 성장세를 이어가고 있습니다.'
    },
    'lg-energy': {
        name: 'LG에너지솔루션',
        symbol: '373220',
        keywords: ['LG에너지솔루션', '엘지엔솔', '373220', '배터리'],
        sector: '2차전지',
        market: 'domestic',
        description: '글로벌 배터리 시장 점유율 최상위권 기업. 전기차(EV) 캐즘 우려 속에서도 차세대 원통형 배터리(4680) 등으로 돌파구를 찾고 있습니다.'
    },

    // Overseas (US)
    'nvidia': {
        name: 'NVIDIA',
        symbol: 'NVDA',
        keywords: ['엔비디아', 'NVIDIA', 'NVDA', '젠슨황'],
        sector: 'AI/반도체',
        market: 'overseas',
        description: 'AI 시대의 주인공. GPU 시장을 독점하며 전 세계 빅테크들의 AI 인프라 구축에 필수적인 하드웨어를 공급합니다.'
    },
    'tesla': {
        name: 'Tesla',
        symbol: 'TSLA',
        keywords: ['테슬라', 'Tesla', 'TSLA', '일론머스크', '자율주행'],
        sector: '전기차/AI',
        market: 'overseas',
        description: '단순한 전기차 회사를 넘어 로보택시, 휴머노이드(옵티머스) 등 AI 기업으로 진화하고 있는 혁신 기업입니다.'
    },
    'apple': {
        name: 'Apple',
        symbol: 'AAPL',
        keywords: ['애플', 'Apple', 'AAPL', '아이폰', '비전프로'],
        sector: '빅테크',
        market: 'overseas',
        description: '아이폰과 생태계의 절대 강자. 온디바이스 AI(Apple Intelligence)를 통해 새로운 모바일 혁신을 준비하고 있습니다.'
    },
    'microsoft': {
        name: 'Microsoft',
        symbol: 'MSFT',
        keywords: ['마이크로소프트', 'Microsoft', 'MSFT', 'OpenAI'],
        sector: '빅테크/클라우드',
        market: 'overseas',
        description: 'OpenAI와의 동맹을 통해 생성형 AI 시장을 리드하고 있으며, 애저(Azure) 클라우드 성장세가 돋보입니다.'
    },
    'amazon': {
        name: 'Amazon',
        symbol: 'AMZN',
        keywords: ['아마존', 'Amazon', 'AMZN', 'AWS'],
        sector: '전자상거래/클라우드',
        market: 'overseas',
        description: '세계 최대 클라우드 AWS와 이커머스를 양날개로 AI 투자 효율화와 물류 혁신을 지속하고 있습니다.'
    },

    // Crypto
    'bitcoin': {
        name: 'Bitcoin',
        symbol: 'BTC',
        keywords: ['비트코인', 'Bitcoin', 'BTC', '가상화폐', '암호화폐'],
        sector: '크립토',
        market: 'overseas', // Treat as overseas for now
        description: '디지털 금으로 자리 잡은 최초의 암호화폐. 현물 ETF 승인 이후 기관 자금 유입과 반감기 이슈가 핵심입니다.'
    }
};
