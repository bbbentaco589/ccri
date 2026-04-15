const SUN_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
const MOON_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;

const mockCoins = [
    { name: "Bitcoin", symbol: "BTC", price: 65000, riskIndex: 20, logo: "https://assets.coincap.io/assets/icons/btc@2x.png", desc: "Bitcoin is a decentralized digital currency, without a central bank or single administrator, that can be sent from user to user on the peer-to-peer bitcoin network without the need for intermediaries." },
    { name: "Ethereum", symbol: "ETH", price: 3500, riskIndex: 35, logo: "https://assets.coincap.io/assets/icons/eth@2x.png", desc: "Ethereum is a decentralized, open-source blockchain with smart contract functionality. Ether is the native cryptocurrency of the platform." },
    { name: "Ripple", symbol: "XRP", price: 0.5, riskIndex: 75, logo: "https://assets.coincap.io/assets/icons/xrp@2x.png", desc: "XRP is the currency used by Ripple's payment network. It's built for enterprise use and aims to offer banks and financial institutions a fast, cost-effective way to conduct cross-border transactions." },
    { name: "Litecoin", symbol: "LTC", price: 150, riskIndex: 50, logo: "https://assets.coincap.io/assets/icons/ltc@2x.png", desc: "Litecoin is a peer-to-peer cryptocurrency and open-source software project released under the MIT/X11 license. It was an early bitcoin spinoff or altcoin." },
    { name: "Cardano", symbol: "ADA", price: 0.45, riskIndex: 60, logo: "https://assets.coincap.io/assets/icons/ada@2x.png", desc: "Cardano is a public blockchain platform. It is open-source and decentralized, with consensus achieved using proof of stake." },
    { name: "Solana", symbol: "SOL", price: 150, riskIndex: 40, logo: "https://assets.coincap.io/assets/icons/sol@2x.png", desc: "Solana is a public blockchain platform with smart contract functionality. Its native cryptocurrency is SOL." }
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
                .risk-index { width: 100%; background: var(--footer-bg); border-radius: 8px; overflow: hidden; margin-top: 1rem; }
                .risk-index-fill { height: 12px; background: var(--primary-color); width: ${coin.riskIndex}%; transition: width 0.5s; }
            </style>
            <div class="card">
                <div class="card-header">
                    <img src="${coin.logo}" alt="${coin.name}" onerror="this.src='https://api.dicebear.com/7.x/identicon/svg?seed=${coin.symbol}'">
                    <h3>${coin.name} (${coin.symbol})</h3>
                </div>
                <p>Price: $${coin.price.toLocaleString()}</p>
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

// --- Routing Logic ---
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

// --- Render Detail Page ---
function renderDetail(coin) {
    detailContent.innerHTML = `
        <div class="detail-header">
            <img src="${coin.logo}" alt="${coin.name}" onerror="this.src='https://api.dicebear.com/7.x/identicon/svg?seed=${coin.symbol}'">
            <h2>${coin.name} (${coin.symbol})</h2>
        </div>
        <div id="tradingview_widget" class="chart-container"></div>
        <div class="description-section">
            <h3>About ${coin.name}</h3>
            <p>${coin.desc}</p>
        </div>
        <div class="rating-section">
            <h3>Community Rating</h3>
            <p>Select your rating (0-10):</p>
            <div id="starContainer" class="star-rating">
                ${Array(10).fill().map((_, i) => `<span class="star" data-index="${i}">★</span>`).join('')}
                <span id="ratingValue" class="rating-value">0.0</span>
            </div>
        </div>
        <div class="comments-section">
            <h3>Comments</h3>
            <div class="comment-form">
                <textarea id="commentInput" placeholder="Write a comment..."></textarea>
                <button id="submitComment">Post Comment</button>
            </div>
            <ul id="commentList" class="comment-list"></ul>
        </div>
    `;

    // Initialize TradingView Widget
    new TradingView.widget({
        "width": "100%",
        "height": "100%",
        "symbol": `BINANCE:${coin.symbol}USDT`,
        "interval": "D",
        "timezone": "Etc/UTC",
        "theme": document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light',
        "style": "1",
        "locale": "en",
        "toolbar_bg": "#f1f3f6",
        "enable_publishing": false,
        "allow_symbol_change": true,
        "container_id": "tradingview_widget"
    });

    setupRatingSystem(coin.symbol);
    setupCommentSystem(coin.symbol);
}

// --- Star Rating System (0-10, 0.5 step) ---
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

// --- Comment System ---
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

// --- Theme Logic ---
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    const themeIcon = themeToggle.querySelector('.icon');
    const themeText = themeToggle.querySelector('.text');
    if (theme === 'light') { themeIcon.innerHTML = MOON_ICON; themeText.textContent = 'Dark Mode'; }
    else { themeIcon.innerHTML = SUN_ICON; themeText.textContent = 'Light Mode'; }
    if (window.location.hash) handleRoute(); // Refresh chart theme
}

themeToggle.addEventListener('click', () => {
    const newTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
});

applyTheme(localStorage.getItem('theme') || 'light');

// --- Initial Render ---
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

// Load TradingView Script then Init
const script = document.createElement('script');
script.src = "https://s3.tradingview.com/tv.js";
script.onload = () => { handleRoute(); renderCoins(mockCoins); };
document.head.appendChild(script);
