export default function Disclaimer() {
    return (
        <main style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px', lineHeight: '1.6' }}>
            <h1>면책 조항 (Disclaimer)</h1>
            <p>
                안티-주식에서 제공하는 모든 콘텐츠(뉴스, 주가 정보, 분석 코멘트 등)는 투자 판단을 돕기 위한 참고 자료일 뿐입니다.
            </p>
            <h2 style={{ color: '#ff3366' }}>투자 유의사항</h2>
            <ul>
                <li>본 사이트의 정보는 오류가 있을 수 있으며, 지연될 수 있습니다.</li>
                <li>제공되는 정보는 투자 권유나 종목 추천이 아닙니다.</li>
                <li>투자에 대한 모든 책임은 투자자 본인에게 있습니다.</li>
                <li>본 사이트는 어떠한 경우에도 투자 결과에 대한 법적 책임을 지지 않습니다.</li>
            </ul>
        </main>
    );
}
