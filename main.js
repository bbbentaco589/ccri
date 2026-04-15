const SUN_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
const MOON_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;

class CoinCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const coin = JSON.parse(this.getAttribute('coin'));

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    height: 100%;
                }
                .card {
                    padding: 1.5rem;
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    color: var(--text-color);
                }
                .card-header {
                    display: flex;
                    align-items: center;
                    margin-bottom: 1rem;
                }
                .card-header img {
                    width: 32px;
                    height: 32px;
                    margin-right: 0.8rem;
                    object-fit: contain;
                    border-radius: 50%;
                    background: #fff;
                    padding: 2px;
                }
                .card-header h3 {
                    margin: 0;
                    font-size: 1.2rem;
                    font-weight: bold;
                }
                .card-body p {
                    margin: 0.5rem 0;
                }
                .risk-index {
                    width: 100%;
                    background-color: var(--footer-bg);
                    border-radius: 8px;
                    overflow: hidden;
                    margin-top: 1rem;
                }
                .risk-index-fill {
                    height: 20px;
                    background-color: var(--primary-color);
                    width: ${coin.riskIndex}%;
                    text-align: center;
                    line-height: 20px;
                    color: white;
                    font-size: 0.8rem;
                    font-weight: bold;
                    background-image: linear-gradient(45deg, rgba(255,255,255,.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,.15) 50%, rgba(255,255,255,.15) 75%, transparent 75%, transparent);
                    transition: width 0.5s ease;
                }
            </style>
            <div class="card">
                <div class="card-header">
                    <img src="${coin.logo}" alt="${coin.name} logo" onerror="this.src='https://api.dicebear.com/7.x/identicon/svg?seed=${coin.symbol}'">
                    <h3>${coin.name} (${coin.symbol})</h3>
                </div>
                <div class="card-body">
                    <p><strong>Price:</strong> $${coin.price.toLocaleString()}</p>
                    <div class="risk-index">
                        <div class="risk-index-fill">${coin.riskIndex}%</div>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('coin-card', CoinCard);

const mockCoins = [
    { 
        name: "Bitcoin", 
        symbol: "BTC", 
        price: 65000, 
        riskIndex: 20, 
        logo: "https://assets.coincap.io/assets/icons/btc@2x.png" 
    },
    { 
        name: "Ethereum", 
        symbol: "ETH", 
        price: 3500, 
        riskIndex: 35, 
        logo: "https://assets.coincap.io/assets/icons/eth@2x.png" 
    },
    { 
        name: "Ripple", 
        symbol: "XRP", 
        price: 0.5, 
        riskIndex: 75, 
        logo: "https://assets.coincap.io/assets/icons/xrp@2x.png" 
    },
    { 
        name: "Litecoin", 
        symbol: "LTC", 
        price: 150, 
        riskIndex: 50, 
        logo: "https://assets.coincap.io/assets/icons/ltc@2x.png" 
    },
    { 
        name: "Cardano", 
        symbol: "ADA", 
        price: 0.45, 
        riskIndex: 60, 
        logo: "https://assets.coincap.io/assets/icons/ada@2x.png" 
    },
    { 
        name: "Solana", 
        symbol: "SOL", 
        price: 150, 
        riskIndex: 40, 
        logo: "https://assets.coincap.io/assets/icons/sol@2x.png" 
    },
];

const coinList = document.getElementById('coin-list');
const searchInput = document.getElementById('searchInput');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('.icon');
const themeText = themeToggle.querySelector('.text');

// Theme Logic
const savedTheme = localStorage.getItem('theme') || 'light';
applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
});

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    if (theme === 'light') {
        themeIcon.innerHTML = MOON_ICON;
        themeText.textContent = 'Dark Mode';
    } else {
        themeIcon.innerHTML = SUN_ICON;
        themeText.textContent = 'Light Mode';
    }
}

function renderCoins(coins) {
    coinList.innerHTML = '';
    coins.forEach(coin => {
        const coinCard = document.createElement('coin-card');
        coinCard.setAttribute('coin', JSON.stringify(coin));
        coinList.appendChild(coinCard);
    });
}

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredCoins = mockCoins.filter(coin => 
        coin.name.toLowerCase().includes(searchTerm) || 
        coin.symbol.toLowerCase().includes(searchTerm)
    );
    renderCoins(filteredCoins);
});

renderCoins(mockCoins);
