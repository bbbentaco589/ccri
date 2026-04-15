# CCRI (Coin Crypto Risk Index)

## Overview
A secure, community-driven crypto analysis platform with Firebase Google Auth and precision charts.

## Project Outline

### Design and Style
*   **Responsive Charts:** Fixed mobile empty spaces by using a flexible aspect-ratio container and TradingView's `autosize`.
*   **Auth-Integrated UI:** Dynamic navigation bar that shows "Login" or "User Profile" based on auth state.
*   **Theming:** High-visibility Light/Dark modes with refined toggle.

### Features
*   **Google Auth:** Firebase Authentication integration for secure user login.
*   **Protected Comments:** Comment section accessible only to authenticated users. Guest users see a login prompt.
*   **Live Price Ticker:** 10-second interval updates via CoinCap API.
*   **Medal System:** Dynamic ranking (Gold/Silver/Bronze) based on 100-pt community ratings.

## Current Plan
1.  **Firebase Integration (HTML)**: Add Firebase SDK scripts.
2.  **Auth Logic (JS)**: Implement Google Login/Logout and state monitoring.
3.  **Chart Refinement (CSS/JS)**: 
    *   Apply `autosize: true` to TradingView widget.
    *   Use `vh` and `calc` for better mobile chart scaling.
4.  **Protected UI**: Toggle comment form visibility based on login status.
5.  **Deployment**: Commit and push to Git.
