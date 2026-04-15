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
                    width: 40px;
                    height: 40px;
                    margin-right: 1rem;
                    border-radius: 50%;
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
                    <img src="https://api.dicebear.com/7.x/identicon/svg?seed=${coin.symbol}" alt="${coin.name} logo">
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
    { name: "Bitcoin", symbol: "BTC", price: 65000, riskIndex: 20 },
    { name: "Ethereum", symbol: "ETH", price: 3500, riskIndex: 35 },
    { name: "Ripple", symbol: "XRP", price: 0.5, riskIndex: 75 },
    { name: "Litecoin", symbol: "LTC", price: 150, riskIndex: 50 },
    { name: "Cardano", symbol: "ADA", price: 0.45, riskIndex: 60 },
    { name: "Solana", symbol: "SOL", price: 150, riskIndex: 40 },
];

const coinList = document.getElementById('coin-list');
const searchInput = document.getElementById('searchInput');
const themeToggle = document.getElementById('themeToggle');

// Theme Logic
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
updateToggleText(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateToggleText(newTheme);
});

function updateToggleText(theme) {
    themeToggle.textContent = theme === 'light' ? 'Dark Mode' : 'Light Mode';
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
