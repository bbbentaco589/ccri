// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyAs-FakeKeyForDemo",
    authDomain: "ccri-test.firebaseapp.com",
    projectId: "ccri-test",
    storageBucket: "ccri-test.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef"
};

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

const SUN_ICON = `<svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
const MOON_ICON = `<svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;

const mockCoins = [
    { name: "Bitcoin", symbol: "BTC", price: 0, riskIndex: 15, logo: "https://assets.coincap.io/assets/icons/btc@2x.png", desc: "비트코인은 최초의 분산형 디지털 통화로, 중앙 은행이나 단일 관리자 없이 운영되는 P2P 네트워크 기반의 가상자산입니다." },
    { name: "Ethereum", symbol: "ETH", price: 0, riskIndex: 25, logo: "https://assets.coincap.io/assets/icons/eth@2x.png", desc: "이더리움은 스마트 계약 기능을 갖춘 오픈 소스 블록체인 플랫폼입니다. 분산형 애플리케이션(DApp)을 구축할 수 있는 생태계를 제공합니다." },
    { name: "Tether", symbol: "USDT", price: 0, riskIndex: 10, logo: "https://assets.coincap.io/assets/icons/usdt@2x.png", desc: "테더는 미국 달러의 가치와 1:1로 고정되도록 설계된 스테이블코인입니다. 암호화폐 시장의 변동성을 피하기 위한 수단으로 쓰입니다." },
    { name: "BNB", symbol: "BNB", price: 0, riskIndex: 30, logo: "https://assets.coincap.io/assets/icons/bnb@2x.png", desc: "BNB는 바이낸스 생태계의 기조 자산입니다. 거래 수수료 할인 및 바이낸스 스마트 체인 상의 결제 수단으로 사용됩니다." },
    { name: "Solana", symbol: "SOL", price: 0, riskIndex: 45, logo: "https://assets.coincap.io/assets/icons/sol@2x.png", desc: "솔라나는 높은 처리 속도와 낮은 수수료를 목표로 하는 고성능 블록체인입니다. 역사 증명(PoH) 알고리즘을 사용합니다." },
    { name: "Ripple", symbol: "XRP", price: 0, riskIndex: 50, logo: "https://assets.coincap.io/assets/icons/xrp@2x.png", desc: "리플은 금융 기관 간의 빠르고 저렴한 국제 송금을 지원하기 위해 설계된 디지털 자산입니다." },
    { name: "USDC", symbol: "USDC", price: 0, riskIndex: 5, logo: "https://assets.coincap.io/assets/icons/usdc@2x.png", desc: "USDC는 실제 달러 자산을 담보로 발행되는 스테이블코인입니다. 높은 투명성과 규제 준수를 강조합니다." },
    { name: "Cardano", symbol: "ADA", price: 0, riskIndex: 40, logo: "https://assets.coincap.io/assets/icons/ada@2x.png", desc: "카르다노는 과학적 철학을 바탕으로 개발된 블록체인입니다. 보안과 확장성, 지속 가능성에 집중합니다." },
    { name: "Dogecoin", symbol: "DOGE", price: 0, riskIndex: 85, logo: "https://assets.coincap.io/assets/icons/doge@2x.png", desc: "도지코인은 인터넷 밈에서 시작된 가상자산입니다. 강력한 커뮤니티 지지를 바탕으로 소액 결제 등에 사용됩니다." }
];

let currentUser = null;

auth.onAuthStateChanged((user) => {
    currentUser = user;
    const authContainer = document.getElementById('authContainer');
    if (user) {
        authContainer.innerHTML = `
            <div class="user-profile">
                <img src="${user.photoURL}" alt="profile">
                <button id="logoutBtn" class="auth-btn">LOGOUT</button>
            </div>
        `;
        document.getElementById('logoutBtn').onclick = () => auth.signOut();
    } else {
        authContainer.innerHTML = `
            <button id="loginBtn" class="auth-btn">
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" width="18" alt="G">
                LOGIN
            </button>
        `;
        document.getElementById('loginBtn').onclick = () => auth.signInWithPopup(provider);
    }
    handleRoute();
});

class CoinCard extends HTMLElement {
    constructor() { super(); this.attachShadow({ mode: 'open' }); }
    connectedCallback() {
        const coin = JSON.parse(this.getAttribute('coin'));
        const avg = calculateAverageRating(coin.symbol);
        const medal = getMedal(avg);
        const priceDisplay = coin.price > 0 ? `$${parseFloat(coin.price).toLocaleString(undefined, {minimumFractionDigits: 2})}` : "Loading...";
        
        this.shadowRoot.innerHTML = `
            <style>
                .card { padding: 1.5rem; display: flex; flex-direction: column; color: var(--text-color); height: 100%; box-sizing: border-box; }
                .card-header { display: flex; align-items: center; margin-bottom: 1rem; gap: 10px; }
                .card-header img { width: 32px; height: 32px; border-radius: 50%; background: #fff; padding: 2px; }
                .medal-tag { font-size: 0.7rem; padding: 2px 8px; border-radius: 10px; font-weight: 800; }
                .stats { font-size: 0.9rem; margin-top: 0.5rem; opacity: 0.8; }
                .rating { font-weight: bold; color: #7b2cbf; }
            </style>
            <div class="card">
                <div class="card-header">
                    <img src="${coin.logo}" alt="${coin.name}" onerror="this.src='https://api.dicebear.com/7.x/identicon/svg?seed=${coin.symbol}'">
                    <h3 style="margin:0; font-size:1.1rem;">${coin.name} (${coin.symbol})</h3>
                    <span class="medal-tag" style="background:${medal.color}; color:${medal.textColor}">${medal.label}</span>
                </div>
                <div class="stats">가격: <span style="font-weight:600">${priceDisplay}</span></div>
                <div class="stats">평점: <span class="rating">${avg}점</span></div>
            </div>
        `;
        this.onclick = () => { window.location.hash = coin.symbol; };
    }
}
customElements.define('coin-card', CoinCard);

async function updateRealTimePrices() {
    try {
        const response = await fetch('https://api.coincap.io/v2/assets?limit=50');
        const data = await response.json();
        mockCoins.forEach(coin => {
            const liveData = data.data.find(asset => asset.symbol === coin.symbol);
            if (liveData) coin.price = liveData.priceUsd;
        });
        if (!window.location.hash || window.location.hash === '#event') renderCoins(mockCoins);
    } catch (error) { console.error("Price fetch failed", error); }
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

function handleRoute() {
    const hash = window.location.hash.substring(1);
    const listView = document.getElementById('list-view');
    const detailView = document.getElementById('detail-view');
    const eventView = document.getElementById('event-view');

    // Hide all views first
    listView.classList.add('hidden');
    detailView.classList.add('hidden');
    eventView.classList.add('hidden');

    if (hash === 'event') {
        eventView.classList.remove('hidden');
        window.scrollTo(0, 0);
    } else if (hash) {
        const coin = mockCoins.find(c => c.symbol === hash);
        if (coin) {
            renderDetail(coin);
            detailView.classList.remove('hidden');
            window.scrollTo(0, 0);
        } else {
            listView.classList.remove('hidden');
            renderCoins(mockCoins);
        }
    } else {
        listView.classList.remove('hidden');
        renderCoins(mockCoins);
    }
}

window.addEventListener('hashchange', handleRoute);
document.getElementById('backButton').onclick = () => { window.location.hash = ''; };
document.getElementById('homeLink').onclick = () => { window.location.hash = ''; };
document.getElementById('homeLinkTop').onclick = () => { window.location.hash = ''; };

const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
menuToggle.onclick = () => navMenu.classList.toggle('active');

function renderDetail(coin) {
    const avg = calculateAverageRating(coin.symbol);
    const medal = getMedal(avg);
    const detailContent = document.getElementById('detail-content');
    const priceDisplay = coin.price > 0 ? `$${parseFloat(coin.price).toLocaleString(undefined, {minimumFractionDigits: 2})}` : "Loading...";

    detailContent.innerHTML = `
        <div class="detail-header">
            <img src="${coin.logo}" alt="${coin.name}" onerror="this.src='https://api.dicebear.com/7.x/identicon/svg?seed=${coin.symbol}'">
            <div>
                <h2 style="margin:0;">${coin.name} (${coin.symbol})</h2>
                <p style="font-size:1.5rem; font-weight:bold; color:var(--primary-color); margin:5px 0 0 0;">${priceDisplay}</p>
            </div>
            <div class="avg-rating-box">
                <span class="medal-badge medal-${medal.label.toLowerCase()}">${medal.label}</span>
                <strong>평균 ${avg}점</strong>
            </div>
        </div>
        <div id="tradingview_widget" class="chart-container"></div>
        <div class="description-section" style="background:var(--card-background); padding:2rem; border-radius:24px; margin-bottom:2rem; box-shadow:0 4px 12px var(--shadow-color);">
            <h3 style="margin-top:0;">프로젝트 소개</h3>
            <p style="line-height:1.8; opacity:0.9;">${coin.desc}</p>
        </div>
        <div class="rating-section" id="ratingSection"></div>
        <div class="comments-section">
            <h3 style="margin-bottom:1.5rem;">커뮤니티 의견</h3>
            <ul id="commentList" style="list-style:none; padding:0;"></ul>
        </div>
    `;

    const ratingSection = document.getElementById('ratingSection');
    if (currentUser) {
        ratingSection.innerHTML = `
            <h3>평가 및 의견 남기기</h3>
            <div class="slider-container">
                <p>내 평점: <strong id="sliderVal">50</strong>점</p>
                <input type="range" id="ratingSlider" class="rating-slider" min="1" max="100" value="50">
            </div>
            <textarea id="commentInput" class="comment-textarea" style="width:100%; box-sizing:border-box; padding:1.5rem; border-radius:16px; border:1px solid var(--input-border); min-height:150px; margin-bottom:2rem;" placeholder="이 코인에 대한 한줄평을 남겨주세요..."></textarea>
            <button id="submitComment" class="auth-btn" style="width:100%; height: 50px;">게시하기</button>
        `;
        setupDetailLogic(coin.symbol);
    } else {
        ratingSection.innerHTML = `
            <div class="login-prompt" style="text-align:center; padding:3rem; border:2px dashed var(--input-border); border-radius:24px;">
                <h4>커뮤니티 평가에 참여하시겠습니까?</h4>
                <p>댓글 작성과 평점 부여를 위해 로그인이 필요합니다.</p>
                <button onclick="auth.signInWithPopup(provider)" class="auth-btn" style="margin: 1.5rem auto 0; padding: 0.8rem 2rem;">
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" width="18" alt="G">
                    LOGIN
                </button>
            </div>
        `;
    }

    new TradingView.widget({
        "autosize": true,
        "symbol": coin.symbol === "USDC" ? "COINBASE:USDCUSDT" : `BINANCE:${coin.symbol}USDT`,
        "interval": "D", "timezone": "Etc/UTC", "theme": document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light',
        "style": "1", "locale": "ko", "container_id": "tradingview_widget"
    });

    loadComments(coin.symbol);
}

function setupDetailLogic(symbol) {
    const slider = document.getElementById('ratingSlider');
    const valDisplay = document.getElementById('sliderVal');
    const input = document.getElementById('commentInput');
    const btn = document.getElementById('submitComment');

    if (slider) slider.oninput = (e) => valDisplay.textContent = e.target.value;
    if (btn) btn.onclick = () => {
        const text = input.value.trim();
        if (!text) return alert('내용을 입력해주세요!');
        let comments = JSON.parse(localStorage.getItem(`comments_${symbol}`) || '[]');
        comments.push({ id: Date.now(), text, rating: slider.value, user: currentUser.displayName, photo: currentUser.photoURL, date: new Date().toISOString(), up: 0, down: 0 });
        localStorage.setItem(`comments_${symbol}`, JSON.stringify(comments));
        input.value = '';
        renderDetail(mockCoins.find(c => c.symbol === symbol));
    };
}

function loadComments(symbol) {
    const list = document.getElementById('commentList');
    if (!list) return;
    let comments = JSON.parse(localStorage.getItem(`comments_${symbol}`) || '[]');
    comments.sort((a, b) => ((b.up || 0) - (b.down || 0)) - ((a.up || 0) - (a.down || 0)));
    list.innerHTML = comments.map((c, i) => `
        <li class="comment-item" style="background:var(--card-background); padding:2rem; border-radius:16px; margin-bottom:1.5rem; border:1px solid var(--input-border); position:relative;">
            ${i < 3 && (c.up || 0) > 0 ? `<span class="best-badge" style="position:absolute; top:-10px; right:20px; background:#ff4757; color:white; padding:4px 12px; border-radius:10px; font-size:0.75rem; font-weight:900;">BEST</span>` : ''}
            <div class="comment-meta" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; opacity:0.7; font-size:0.9rem;">
                <div style="display:flex; align-items:center; gap:8px;">
                    <img src="${c.photo || 'https://api.dicebear.com/7.x/identicon/svg?seed=' + c.user}" style="width:24px; height:24px; border-radius:50%;">
                    <strong>${c.user || '익명'} | ${c.rating}점</strong>
                </div>
                <span>${new Date(c.date).toLocaleString()}</span>
            </div>
            <div class="comment-text">${c.text}</div>
            <div class="voting-container" style="display:flex; gap:15px; margin-top:1rem;">
                <button class="vote-btn" onclick="handleVote('${symbol}', ${c.id}, 'up')">👍 ${c.up || 0}</button>
                <button class="vote-btn" onclick="handleVote('${symbol}', ${c.id}, 'down')">👎 ${c.down || 0}</button>
            </div>
        </li>
    `).join('');
}

window.handleVote = (symbol, commentId, type) => {
    if (!currentUser) return alert('로그인 후 이용 가능합니다!');
    let comments = JSON.parse(localStorage.getItem(`comments_${symbol}`) || '[]');
    const userVotedKey = `voted_${currentUser.uid}_${commentId}`;
    if (localStorage.getItem(userVotedKey)) return alert('이미 참여하셨습니다!');
    const comment = comments.find(c => c.id === commentId);
    if (comment) {
        comment[type] = (comment[type] || 0) + 1;
        localStorage.setItem(`comments_${symbol}`, JSON.stringify(comments));
        localStorage.setItem(userVotedKey, 'true');
        loadComments(symbol);
    }
};

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    const themeBtn = document.getElementById('themeToggle');
    if (!themeBtn) return;
    const themeIcon = themeBtn.querySelector('.icon');
    const themeText = themeBtn.querySelector('.text');
    themeIcon.innerHTML = theme === 'light' ? MOON_ICON : SUN_ICON;
    themeText.textContent = theme === 'light' ? '다크 모드' : '라이트 모드';
    if (window.location.hash && window.location.hash !== '#event') handleRoute();
}

document.getElementById('themeToggle').onclick = () => {
    const current = document.documentElement.getAttribute('data-theme');
    applyTheme(current === 'light' ? 'dark' : 'light');
};

applyTheme(localStorage.getItem('theme') || 'light');

function renderCoins(coins) {
    const coinList = document.getElementById('coin-list');
    if (!coinList) return;
    coinList.innerHTML = '';
    coins.forEach(coin => {
        const card = document.createElement('coin-card');
        card.setAttribute('coin', JSON.stringify(coin));
        coinList.appendChild(card);
    });
}

document.getElementById('searchInput').oninput = (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = mockCoins.filter(c => c.name.toLowerCase().includes(term) || c.symbol.toLowerCase().includes(term));
    renderCoins(filtered);
};

const script = document.createElement('script');
script.src = "https://s3.tradingview.com/tv.js";
script.onload = () => { handleRoute(); updateRealTimePrices(); setInterval(updateRealTimePrices, 10000); };
document.head.appendChild(script);
