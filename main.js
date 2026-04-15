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
        this.shadowRoot.innerHTML = `
            <style>
                .card { padding: 1.5rem; display: flex; flex-direction: column; color: var(--text-color); }
                .card-header { display: flex; align-items: center; margin-bottom: 1rem; }
                .card-header img { width: 32px; height: 32px; margin-right: 0.8rem; border-radius: 50%; background: #fff; padding: 2px; }
                .card-header h3 { margin: 0; font-size: 1.1rem; }
                .risk-index { width: 100%; background: var(--footer-bg); border-radius: 8px; overflow: hidden; margin-top: 1rem; }
                .risk-index-fill { height: 10px; background: var(--primary-color); width: ${coin.riskIndex}%; transition: width 0.5s; }
            </style>
            <div class="card">
                <div class="card-header">
                    <img src="${coin.logo}" alt="${coin.name}" onerror="this.src='https://api.dicebear.com/7.x/identicon/svg?seed=${coin.symbol}'">
                    <h3>${coin.name} (${coin.symbol})</h3>
                </div>
                <p>현재가: $${coin.price.toLocaleString()}</p>
                <div class="risk-index"><div class="risk-index-fill"></div></div>
            </div>
        `;
        this.addEventListener('click', () => { window.location.hash = coin.symbol; });
    }
}
customElements.define('coin-card', CoinCard);

const coinList = document.getElementById('coin-list');
const searchInput = document.getElementById('searchInput');
const themeToggle = document.getElementById('themeToggle');
const listView = document.getElementById('list-view');
const detailView = document.getElementById('detail-view');
const detailContent = document.getElementById('detail-content');
const backButton = document.getElementById('backButton');
const homeLink = document.getElementById('homeLink');

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
backButton.addEventListener('click', () => { window.location.hash = ''; });
homeLink.addEventListener('click', () => { window.location.hash = ''; });

function renderDetail(coin) {
    detailContent.innerHTML = `
        <div class="detail-header">
            <img src="${coin.logo}" alt="${coin.name}" onerror="this.src='https://api.dicebear.com/7.x/identicon/svg?seed=${coin.symbol}'">
            <h2>${coin.name} (${coin.symbol})</h2>
        </div>
        <div id="tradingview_widget" class="chart-container"></div>
        <div class="description-section">
            <h3>프로젝트 소개</h3>
            <p>${coin.desc}</p>
        </div>
        <div class="rating-section">
            <h3>커뮤니티 평가</h3>
            <p>이 코인의 평점을 선택해주세요 (0-10):</p>
            <div id="starContainer" class="star-rating">
                ${Array(10).fill().map((_, i) => `<span class="star" data-index="${i}">★</span>`).join('')}
                <span id="ratingValue" class="rating-value">0.0</span>
            </div>
        </div>
        <div class="comments-section">
            <h3>댓글 한줄평</h3>
            <div class="comment-form">
                <textarea id="commentInput" placeholder="이 코인에 대한 의견을 남겨주세요..."></textarea>
                <button id="submitComment">댓글 작성</button>
            </div>
            <ul id="commentList" class="comment-list"></ul>
        </div>
    `;

    new TradingView.widget({
        "width": "100%",
        "height": "100%",
        "symbol": coin.symbol === "USDC" ? "COINBASE:USDCUSDT" : `BINANCE:${coin.symbol}USDT`,
        "interval": "D",
        "timezone": "Etc/UTC",
        "theme": document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light',
        "style": "1",
        "locale": "ko",
        "toolbar_bg": "#f1f3f6",
        "enable_publishing": false,
        "allow_symbol_change": true,
        "container_id": "tradingview_widget"
    });

    setupRatingSystem(coin.symbol);
    setupCommentSystem(coin.symbol);
}

function setupRatingSystem(symbol) {
    const container = document.getElementById('starContainer');
    const stars = container.querySelectorAll('.star');
    const valDisplay = document.getElementById('ratingValue');
    let currentRating = localStorage.getItem(`rating_${symbol}`) || 0;
    
    const updateStars = (rating) => {
        valDisplay.textContent = parseFloat(rating).toFixed(1);
        stars.forEach((star, i) => {
            star.classList.remove('filled', 'half');
            if (i < Math.floor(rating)) star.classList.add('filled');
            else if (i < rating) star.classList.add('half');
        });
    };

    updateStars(currentRating);

    container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const widthPerStar = rect.width / 10;
        let hoverRating = Math.ceil((x / widthPerStar) * 2) / 2;
        hoverRating = Math.max(0, Math.min(10, hoverRating));
        updateStars(hoverRating);
    });

    container.addEventListener('mouseleave', () => updateStars(currentRating));
    
    container.addEventListener('click', (e) => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const widthPerStar = rect.width / 10;
        currentRating = Math.ceil((x / widthPerStar) * 2) / 2;
        localStorage.setItem(`rating_${symbol}`, currentRating);
        updateStars(currentRating);
    });
}

function setupCommentSystem(symbol) {
    const input = document.getElementById('commentInput');
    const btn = document.getElementById('submitComment');
    const list = document.getElementById('commentList');
    
    const loadComments = () => {
        const comments = JSON.parse(localStorage.getItem(`comments_${symbol}`) || '[]');
        list.innerHTML = comments.map(c => `
            <li class="comment-item">
                <div class="comment-meta">${new Date(c.date).toLocaleString()}</div>
                <div class="comment-text">${c.text}</div>
            </li>
        `).reverse().join('');
    };

    btn.addEventListener('click', () => {
        const text = input.value.trim();
        if (!text) return;
        const comments = JSON.parse(localStorage.getItem(`comments_${symbol}`) || '[]');
        comments.push({ text, date: new Date().toISOString() });
        localStorage.setItem(`comments_${symbol}`, JSON.stringify(comments));
        input.value = '';
        loadComments();
    });

    loadComments();
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    const themeIcon = themeToggle.querySelector('.icon');
    const themeText = themeToggle.querySelector('.text');
    if (theme === 'light') { themeIcon.innerHTML = MOON_ICON; themeText.textContent = '다크 모드'; }
    else { themeIcon.innerHTML = SUN_ICON; themeText.textContent = '라이트 모드'; }
    if (window.location.hash) handleRoute();
}

themeToggle.addEventListener('click', () => {
    const newTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
});

applyTheme(localStorage.getItem('theme') || 'light');

function renderCoins(coins) {
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
