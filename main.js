const SUN_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
const MOON_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;

const mockCoins = [
    { name: "Bitcoin", symbol: "BTC", price: 65000, riskIndex: 15, logo: "https://assets.coincap.io/assets/icons/btc@2x.png", desc: "비트코인은 최초의 분산형 디지털 통화로, 중앙 은행이나 단일 관리자 없이 운영되는 피어 투 피어(P2P) 네트워크 기반의 가상자산입니다. 전 세계적으로 가장 높은 시장 가치와 신뢰도를 보유하고 있습니다." },
    { name: "Ethereum", symbol: "ETH", price: 3500, riskIndex: 25, logo: "https://assets.coincap.io/assets/icons/eth@2x.png", desc: "이더리움은 스마트 계약 기능을 갖춘 오픈 소스 블록체인 플랫폼입니다. 단순히 화폐로서의 기능을 넘어 분산형 애플리케이션(DApp)을 구축할 수 있는 생태계를 제공하며, 가상자산 시장에서 두 번째로 큰 비중을 차지합니다." },
    { name: "Tether", symbol: "USDT", price: 1, riskIndex: 10, logo: "https://assets.coincap.io/assets/icons/usdt@2x.png", desc: "테더는 미국 달러의 가치와 1:1로 고정(페깅)되도록 설계된 스테이블코인입니다. 암호화폐 시장의 변동성을 피하기 위한 수단으로 널리 사용되며, 법정 화폐와 가상자산 사이의 교량 역할을 합니다." },
    { name: "BNB", symbol: "BNB", price: 600, riskIndex: 30, logo: "https://assets.coincap.io/assets/icons/bnb@2x.png", desc: "BNB는 세계 최대 가상자산 거래소인 바이낸스(Binance) 생태계의 기조 자산입니다. 거래 수수료 할인, 바이낸스 스마트 체인(BSC) 상의 가스비 결제 등 다양한 유틸리티를 제공합니다." },
    { name: "Solana", symbol: "SOL", price: 145, riskIndex: 45, logo: "https://assets.coincap.io/assets/icons/sol@2x.png", desc: "솔라나는 높은 처리 속도와 낮은 수수료를 목표로 하는 고성능 블록체인입니다. 역사 증명(PoH)이라는 독창적인 합의 알고리즘을 사용하여 확장성 문제를 해결하려 노력하고 있습니다." },
    { name: "Ripple", symbol: "XRP", price: 0.5, riskIndex: 50, logo: "https://assets.coincap.io/assets/icons/xrp@2x.png", desc: "리플은 전 세계 금융 기관 간의 빠르고 저렴한 국제 송금을 지원하기 위해 설계된 디지털 자산입니다. 리플넷(RippleNet)이라는 결제 네트워크를 통해 초 단위의 실시간 정산이 가능합니다." },
    { name: "USDC", symbol: "USDC", price: 1, riskIndex: 5, logo: "https://assets.coincap.io/assets/icons/usdc@2x.png", desc: "USDC는 서클(Circle)과 코인베이스에 의해 개발된 스테이블코인으로, 실제 달러 자산을 담보로 발행됩니다. 높은 투명성과 규제 준수를 강조하며 금융 및 DeFi 생태계에서 신뢰를 얻고 있습니다." },
    { name: "Cardano", symbol: "ADA", price: 0.45, riskIndex: 40, logo: "https://assets.coincap.io/assets/icons/ada@2x.png", desc: "카르다노는 과학적 철학을 바탕으로 학계의 검증을 거쳐 개발된 블록체인 플랫폼입니다. 에이다(ADA)는 이 네트워크의 기본 자산으로, 보안과 확장성, 지속 가능성이라는 세 가지 과제를 해결하는 데 집중하고 있습니다." },
    { name: "Dogecoin", symbol: "DOGE", price: 0.15, riskIndex: 85, logo: "https://assets.coincap.io/assets/icons/doge@2x.png", desc: "도지코인은 인터넷 밈(Meme)인 도지(Doge)를 마스코트로 시작된 가상자산입니다. 커뮤니티의 강력한 지지를 바탕으로 하며, 가치 저장 수단보다는 소액 결제나 팁 문화에서 상징성을 가집니다." }
];

class CoinCard extends HTMLElement {
    constructor() { super(); this.attachShadow({ mode: 'open' }); }
    connectedCallback() {
        const coin = JSON.parse(this.getAttribute('coin'));
        const avgRating = calculateAverageRating(coin.symbol);
        this.shadowRoot.innerHTML = `
            <style>
                .card { padding: 1.5rem; display: flex; flex-direction: column; color: var(--text-color); }
                .card-header { display: flex; align-items: center; margin-bottom: 1rem; }
                .card-header img { width: 32px; height: 32px; margin-right: 0.8rem; border-radius: 50%; background: #fff; padding: 2px; }
                .card-header h3 { margin: 0; font-size: 1.1rem; }
                .stats { font-size: 0.9rem; margin-top: 0.5rem; opacity: 0.8; }
                .rating { color: #ffcc00; font-weight: bold; }
            </style>
            <div class="card">
                <div class="card-header">
                    <img src="${coin.logo}" alt="${coin.name}" onerror="this.src='https://api.dicebear.com/7.x/identicon/svg?seed=${coin.symbol}'">
                    <h3>${coin.name} (${coin.symbol})</h3>
                </div>
                <div class="stats">가격: $${coin.price.toLocaleString()}</div>
                <div class="stats">평점: <span class="rating">★ ${avgRating}</span></div>
            </div>
        `;
        this.addEventListener('click', () => { window.location.hash = coin.symbol; });
    }
}
customElements.define('coin-card', CoinCard);

function calculateAverageRating(symbol) {
    const comments = JSON.parse(localStorage.getItem(`comments_${symbol}`) || '[]');
    if (comments.length === 0) return "0.0";
    const sum = comments.reduce((acc, curr) => acc + (parseFloat(curr.rating) || 0), 0);
    return (sum / comments.length).toFixed(1);
}

const listView = document.getElementById('list-view');
const detailView = document.getElementById('detail-view');
const detailContent = document.getElementById('detail-content');
const searchInput = document.getElementById('searchInput');

function handleRoute() {
    const symbol = window.location.hash.substring(1);
    if (symbol) {
        const coin = mockCoins.find(c => c.symbol === symbol);
        if (coin) {
            renderDetail(coin);
            listView.classList.add('hidden');
            detailView.classList.remove('hidden');
            window.scrollTo(0, 0);
            return;
        }
    }
    listView.classList.remove('hidden');
    detailView.classList.add('hidden');
}

window.addEventListener('hashchange', handleRoute);
document.getElementById('backButton').addEventListener('click', () => { window.location.hash = ''; });
document.getElementById('homeLink').addEventListener('click', () => { window.location.hash = ''; });

function renderDetail(coin) {
    const avgRating = calculateAverageRating(coin.symbol);
    detailContent.innerHTML = `
        <div class="detail-header">
            <img src="${coin.logo}" alt="${coin.name}" onerror="this.src='https://api.dicebear.com/7.x/identicon/svg?seed=${coin.symbol}'">
            <h2>${coin.name} (${coin.symbol})</h2>
            <div class="avg-rating-box">
                <span class="avg-score">★ ${avgRating}</span>
                <span>커뮤니티 평균 평점</span>
            </div>
        </div>
        <div id="tradingview_widget" class="chart-container"></div>
        <div class="description-section">
            <h3>프로젝트 소개</h3>
            <p>${coin.desc}</p>
        </div>
        <div class="rating-section">
            <h3>평가 및 의견 남기기</h3>
            <div class="rating-form-container">
                <div class="slider-container">
                    <p>당신의 평점: <strong id="currentSliderVal">5.0</strong> / 10.0</p>
                    <div id="precisionStars" class="precision-stars" style="--percent: 50%;">★★★★★★★★★★</div>
                    <input type="range" id="ratingSlider" class="rating-slider" min="0" max="10" step="0.1" value="5">
                </div>
                <textarea id="commentInput" class="comment-textarea" placeholder="프로젝트에 대한 의견을 자유롭게 남겨주세요..."></textarea>
                <button id="submitComment" class="back-btn">의견 게시하기</button>
            </div>
        </div>
        <div class="comments-section">
            <h3>커뮤니티 한줄평</h3>
            <ul id="commentList" class="comment-list"></ul>
        </div>
    `;

    new TradingView.widget({
        "width": "100%", "height": "100%",
        "symbol": coin.symbol === "USDC" ? "COINBASE:USDCUSDT" : `BINANCE:${coin.symbol}USDT`,
        "interval": "D", "timezone": "Etc/UTC",
        "theme": document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light',
        "style": "1", "locale": "ko", "container_id": "tradingview_widget"
    });

    setupIntegratedForm(coin.symbol);
}

function setupIntegratedForm(symbol) {
    const slider = document.getElementById('ratingSlider');
    const stars = document.getElementById('precisionStars');
    const valDisplay = document.getElementById('currentSliderVal');
    const input = document.getElementById('commentInput');
    const btn = document.getElementById('submitComment');
    const list = document.getElementById('commentList');

    slider.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        valDisplay.textContent = val.toFixed(1);
        stars.style.setProperty('--percent', `${val * 10}%`);
    });

    const loadComments = () => {
        const comments = JSON.parse(localStorage.getItem(`comments_${symbol}`) || '[]');
        list.innerHTML = comments.map(c => `
            <li class="comment-item">
                <div class="comment-meta">
                    <span class="rating">★ ${parseFloat(c.rating).toFixed(1)}</span> | ${new Date(c.date).toLocaleString()}
                </div>
                <div class="comment-text">${c.text}</div>
            </li>
        `).reverse().join('');
    };

    btn.addEventListener('click', () => {
        const text = input.value.trim();
        if (!text) return alert('의견을 입력해주세요!');
        const comments = JSON.parse(localStorage.getItem(`comments_${symbol}`) || '[]');
        comments.push({ text, rating: slider.value, date: new Date().toISOString() });
        localStorage.setItem(`comments_${symbol}`, JSON.stringify(comments));
        input.value = '';
        renderDetail(mockCoins.find(c => c.symbol === symbol)); // Refresh to show new avg
    });

    loadComments();
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    const themeBtn = document.getElementById('themeToggle');
    themeBtn.querySelector('.icon').innerHTML = theme === 'light' ? MOON_ICON : SUN_ICON;
    themeBtn.querySelector('.text').textContent = theme === 'light' ? '다크 모드' : '라이트 모드';
    if (window.location.hash) handleRoute();
}

document.getElementById('themeToggle').addEventListener('click', () => {
    const newTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
});

applyTheme(localStorage.getItem('theme') || 'light');

function renderCoins(coins) {
    const coinList = document.getElementById('coin-list');
    coinList.innerHTML = '';
    coins.forEach(coin => {
        const card = document.createElement('coin-card');
        card.setAttribute('coin', JSON.stringify(coin));
        coinList.appendChild(card);
    });
}

searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = mockCoins.filter(c => c.name.toLowerCase().includes(term) || c.symbol.toLowerCase().includes(term));
    renderCoins(filtered);
});

const script = document.createElement('script');
script.src = "https://s3.tradingview.com/tv.js";
script.onload = () => { handleRoute(); renderCoins(mockCoins); };
document.head.appendChild(script);
