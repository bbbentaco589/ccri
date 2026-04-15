# CCRI (Coin Crypto Risk Index)

## Overview
A professional crypto analysis community featuring real-time market data, medal-based ratings, and upvote-driven discussions.

## Project Outline

### Design and Style
*   **Real-time UI:** Coin prices on the main page update automatically to match live market rates.
*   **Theming:** Clean Light/Dark modes with refined typography.
*   **Mobile First:** Responsive design with a hamburger menu for navigation.

### Features
*   **Live Price Ticker:** Integration with CoinCap API for real-time price updates every 10 seconds.
*   **100-Point Rating:** User ratings from 1 to 100 with dynamic medal display (Gold/Silver/Bronze).
*   **Votable Comments:** Upvote/Downvote system with popularity-based sorting and "BEST" highlights.
*   **Professional Charts:** Large-scale TradingView charts in the detail view.

## Current Plan
1.  **Real-time Integration (JS)**:
    *   Implement `updateRealTimePrices` function using CoinCap API.
    *   Set up a 10-second polling interval for the main list.
    *   Ensure price formatting matches global standards.
2.  **Deployment**: Commit and push to Git.
