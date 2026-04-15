# CCRI (Coin Crypto Risk Index)

## Overview
A secure, community-driven crypto analysis platform with Firebase Google Auth and high-performance mobile UI.

## Project Outline

### Design and Style
*   **Mobile-First Precision:** Fully responsive UI with synchronized margins for search and coin lists.
*   **Stable Navigation:** Fixed top-nav with a functional hamburger menu and integrated LOGIN/LOGOUT.
*   **Metallic Buttons:** Consistent premium purple metallic theme across all interactive elements.

### Features
*   **SPA Routing:** Clickable coin cards for seamless transitions to detailed charts and ratings.
*   **Real-time Prices:** Live data synchronization with CoinCap API.
*   **Medal System:** Dynamic Bronze/Silver/Gold tiers based on user ratings.
*   **Protected Feedback:** Google Auth restricted comment and rating system.

## Current Plan
1.  **Mobile UI Stabilization (CSS)**:
    *   Unify container paddings.
    *   Fix mobile menu alignment and overlap issues.
    *   Adjust chart aspect ratios for stability.
2.  **Navigation Fix (JS)**:
    *   Ensure `coin-card` click events set the correct hash.
    *   Verify `handleRoute` toggles views correctly.
3.  **Deployment**: Commit and push.
