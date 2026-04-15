const SUN_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
const MOON_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;

const mockCoins = [
    { name: "Bitcoin", symbol: "BTC", price: 0, riskIndex: 15, logo: "https://assets.coincap.io/assets/icons/btc@2x.png", desc: "비트코인은 최초의 분산형 디지털 통화로, 중앙 은행이나 단일 관리자 없이 운영되는 피어 투 피어(P2P) 네트워크 기반의 가상자산입니다." },
    { name: "Ethereum", symbol: "ETH", price: 0, riskIndex: 25, logo: "https://assets.coincap.io/assets/icons/eth@2x.png", desc: "이더리움은 스마트 계약 기능을 갖춘 오픈 소스 블록체인 플랫폼입니다. 분산형 애플리케이션(DApp)을 구축할 수 있는 생태계를 제공합니다." },
    { name: "Tether", symbol: "USDT", price: 0, riskIndex: 10, logo: "https://assets.coincap.io/assets/icons/usdt@2x.png", desc: "테더는 미국 달러의 가치와 1:1로 고정되도록 설계된 스테이블코인입니다. 암호화폐 시장의 변동성을 피하기 위한 수단으로 쓰입니다." },
    { name: "BNB", symbol: "BNB", price: 0, riskIndex: 30, logo: "https://assets.coincap.io/assets/icons/bnb@2x.png", desc: "BNB는 바이낸스 생태계의 기조 자산입니다. 거래 수수료 할인 및 바이낸스 스마트 체인 상의 결제 수단으로 사용됩니다." },
    { name: "Solana", symbol: "SOL", price: 0, riskIndex: 45, logo: "https://assets.coincap.io/assets/icons/sol@2x.png", desc: "솔라나는 높은 처리 속도와 낮은 수수료를 목표로 하는 고성능 블록체인입니다. 역사 증명(PoH) 알고리즘을 사용합니다." },
    { name: "Ripple", symbol: "XRP", price: 0, riskIndex: 50, logo: "https://assets.coincap.io/assets/icons/xrp@2x.png", desc: "리플은 금융 기관 간의 빠르고 저렴한 국제 송금을 지원하기 위해 설계된 디지털 자산입니다." },
    { name: "USDC", symbol: "USDC", price: 0, riskIndex: 5, logo: "https://assets.coincap.io/assets/icons/usdc@2x.png", desc: "USDC는 실제 달러 자산을 담보로 발행되는 스테이블코인입니다. 높은 투명성과 규제 준수를 강조합니다." },
    { name: "Cardano", symbol: "ADA", price: 0, riskIndex: 40, logo: "https://assets.coincap.io/assets/icons/ada@2x.png", desc: "카르다노는 과학적 철학을 바탕으로 개발된 블록체인입니다. 보안과 확장성, 지속 가능성에 집중합니다." },
    { name: "Dogecoin", symbol: "DOGE", price: 0, riskIndex: 85, logo: "https://assets.coincap.io/assets/icons/doge@2x.png", desc: "도지코인은 인터넷 밈에서 시작된 가상자산입니다. 강력한 커뮤니티 지지를 바탕으로 소액 결제 등에 사용됩니다." }
];

class CoinCard extends HTMLElement {
    constructor() { super(); this.attachShadow({ mode: 'open' }); }
    connectedCallback() {
        const coin = JSON.parse(this.getAttribute('coin'));
        const avg = calculateAverageRating(coin.symbol);
        const medal = getMedal(avg);
        const priceDisplay = coin.price > 0 ? `$${parseFloat(coin.price).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 6})}` : "Loading...";
        
        this.shadowRoot.innerHTML = `
            <style>
                .card { padding: 1.5rem; display: flex; flex-direction: column; color: var(--text-color); }
                .card-header { display: flex; align-items: center; margin-bottom: 1rem; gap: 10px; }
                .card-header img { width: 32px; height: 32px; border-radius: 50%; background: #fff; padding: 2px; }
                .card-header h3 { margin: 0; font-size: 1.1rem; }
                .medal-tag { font-size: 0.7rem; padding: 2px 8px; border-radius: 10px; font-weight: 800; }
                .stats { font-size: 0.9rem; margin-top: 0.5rem; opacity: 0.8; }
                .rating { font-weight: bold; color: #7b2cbf; }
                .price { font-weight: 600; color: var(--primary-color); }
            </style>
            <div class="card">
                <div class="card-header">
                    <img src="${coin.logo}" alt="${coin.name}" onerror="this.src='https://api.dicebear.com/7.x/identicon/svg?seed=${coin.symbol}'">
                    <h3>${coin.name}</h3>
                    <span class="medal-tag" style="background:${medal.color}; color:${medal.textColor}">${medal.label}</span>
                </div>
                <div class="stats">현재가: <span class="price">${priceDisplay}</span></div>
                <div class="stats">평점: <span class="rating">${avg}점</span></div>
            </div>
        `;
        this.addEventListener('click', () => { window.location.hash = coin.symbol; });
    }
}
customElements.define('coin-card', CoinCard);

// --- Real-time Price Fetching ---
async function updateRealTimePrices() {
    try {
        const response = await fetch('https://api.coincap.io/v2/assets?limit=50');
        const data = await response.json();
        
        mockCoins.forEach(coin => {
            const liveData = data.data.find(asset => asset.symbol === coin.symbol);
            if (liveData) {
                coin.price = liveData.priceUsd;
            }
        });

        // Only re-render if we are in list view
        if (!window.location.hash) {
            renderCoins(mockCoins);
        }
    } catch (error) {
        console.error("Price fetch failed:", error);
    }
}

function calculateAverageRating(symbol) {
    const comments = JSON.parse(localStorage.getItem(`comments_${symbol}`) || '[]');
    if (comments.length === 0) return "0";
    const sum = comments.reduce((acc, curr) => acc + (parseInt(curr.rating) || 0), 0);
    return Math.round(sum / comments.length);
}

function getMedal(avg) {
    if (avg >= 90) return { label: "GOLD", color: "#ffd700", textColor: "#000" };
    if (avg >= 70) return { label: "SILVER", color: "#c0c0c0", textColor: "#000" };
    return { label: "BRONZE", color: "#cd7f32", textColor: "#fff" };
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
    renderCoins(mockCoins);
}

window.addEventListener('hashchange', handleRoute);
document.getElementById('backButton').addEventListener('click', () => { window.location.hash = ''; });
document.getElementById('homeLink').addEventListener('click', () => { window.location.hash = ''; });
document.getElementById('homeLinkTop').addEventListener('click', () => { window.location.hash = ''; });

const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
menuToggle.addEventListener('click', () => navMenu.classList.toggle('active'));

function renderDetail(coin) {
    const avg = calculateAverageRating(coin.symbol);
    const medal = getMedal(avg);
    const priceDisplay = coin.price > 0 ? `$${parseFloat(coin.price).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}` : "Loading...";

    detailContent.innerHTML = `
        <div class="detail-header">
            <img src="${coin.logo}" alt="${coin.name}" onerror="this.src='https://api.dicebear.com/7.x/identicon/svg?seed=${coin.symbol}'">
            <div>
                <h2>${coin.name} (${coin.symbol})</h2>
                <p style="font-size:1.5rem; font-weight:bold; color:var(--primary-color); margin:0;">${priceDisplay}</p>
            </div>
            <div class="avg-rating-box">
                <span class="medal-badge medal-${medal.label.toLowerCase()}">${medal.label}</span>
                <strong>평균 ${avg}점</strong>
            </div>
        </div>
        <div id="tradingview_widget" class="chart-container"></div>
        <div class="description-section">
            <h3>프로젝트 소개</h3>
            <p>${coin.desc}</p>
        </div>
        <div class="rating-section">
            <h3>평가 및 의견 남기기</h3>
            <div class="slider-container">
                <p>내 평점: <strong id="sliderVal">50</strong>점</p>
                <input type="range" id="ratingSlider" class="rating-slider" min="1" max="100" value="50">
            </div>
            <textarea id="commentInput" class="comment-textarea" placeholder="이 코인에 대한 한줄평을 남겨주세요..."></textarea>
            <button id="submitComment" class="back-btn" style="margin:0; width:100%; justify-content:center;">게시하기</button>
        </div>
        <div class="comments-section">
            <h3>커뮤니티 의견</h3>
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

    setupDetailLogic(coin.symbol);
}

function setupDetailLogic(symbol) {
    const slider = document.getElementById('ratingSlider');
    const valDisplay = document.getElementById('sliderVal');
    const input = document.getElementById('commentInput');
    const btn = document.getElementById('submitComment');
    const list = document.getElementById('commentList');

    slider.addEventListener('input', (e) => valDisplay.textContent = e.target.value);

    const loadComments = () => {
        let comments = JSON.parse(localStorage.getItem(`comments_${symbol}`) || '[]');
        comments.sort((a, b) => ((b.up || 0) - (b.down || 0)) - ((a.up || 0) - (a.down || 0)));

        list.innerHTML = comments.map((c, i) => `
            <li class="comment-item">
                ${i < 3 && (c.up || 0) > 0 ? `<span class="best-badge">BEST</span>` : ''}
                <div class="comment-meta">
                    <strong>${c.rating}점</strong>
                    <span>${new Date(c.date).toLocaleString()}</span>
                </div>
                <div class="comment-text">${c.text}</div>
                <div class="voting-container">
                    <button class="vote-btn" onclick="handleVote('${symbol}', ${c.id}, 'up')">👍 ${c.up || 0}</button>
                    <button class="vote-btn" onclick="handleVote('${symbol}', ${c.id}, 'down')">👎 ${c.down || 0}</button>
                </div>
            </li>
        `).join('');
    };

    btn.addEventListener('click', () => {
        const text = input.value.trim();
        if (!text) return alert('내용을 입력해주세요!');
        let comments = JSON.parse(localStorage.getItem(`comments_${symbol}`) || '[]');
        comments.push({ id: Date.now(), text, rating: slider.value, date: new Date().toISOString(), up: 0, down: 0 });
        localStorage.setItem(`comments_${symbol}`, JSON.stringify(comments));
        input.value = '';
        renderDetail(mockCoins.find(c => c.symbol === symbol));
    });

    loadComments();
}

window.handleVote = (symbol, commentId, type) => {
    let comments = JSON.parse(localStorage.getItem(`comments_${symbol}`) || '[]');
    const userVotedKey = `voted_${commentId}`;
    if (localStorage.getItem(userVotedKey)) return alert('이미 참여하셨습니다!');
    const comment = comments.find(c => c.id === commentId);
    if (comment) {
        comment[type] = (comment[type] || 0) + 1;
        localStorage.setItem(`comments_${symbol}`, JSON.stringify(comments));
        localStorage.setItem(userVotedKey, 'true');
        renderDetail(mockCoins.find(c => c.symbol === symbol));
    }
};

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

// Init
const script = document.createElement('script');
script.src = "https://s3.tradingview.com/tv.js";
script.onload = () => { 
    handleRoute(); 
    updateRealTimePrices();
    setInterval(updateRealTimePrices, 10000); // Update every 10 seconds
};
document.head.appendChild(script);
