# Instagram Competitor Analysis

A full‑stack tool for quickly auditing any **public** Instagram account.  
Enter a username, fetch the latest posts, and sort them by likes, views, comments, or date to spot what really works for your competitors.

<br>

## ✨ Features
| Function | Details |
| --- | --- |
| 🔍 **Username lookup** | Scrapes a configurable number of recent posts for any public account |
| 📊 **Smart sorting** | Order results by <br>• Likes<br>• Comments<br>• Views (for Reels)<br>• Newest |
| 📝 **Actionable insights** | Surface top‑performing post types to guide your own content strategy |

<br>

## 📦 Tech stack

| Layer | Libraries |
| --- | --- |
| **Frontend** | Svelte 4, Vite, Tailwind CSS |
| **Backend** | Node.js, Svelte, ExpressJS |
| **Utilities** | dotenv, mathjs, SocialBlade API, Scraping Bee API |

> **Note:** All packages and scripts are listed in [`package.json`](./package.json).

<br>

## 🚀 Quick start

### 1 · Clone & install

```bash
git clone https://github.com/<you>/instagram-competitor-analysis-tools.git
cd instagram-competitor-analysis-tools
npm install
```

### 2 · Configure environment

Create a `.env` file in the project root:

```bash
# --- Instagram scraping ------------------------------------
INSTAGRAM_USERNAME=your_instagram_login
INSTAGRAM_PASSWORD=your_instagram_password
# (Needed only when you want to log in to raise the public‑post limit.)

# --- SocialBlade API (optional analytics) ------------------
SOCIALBLADE_USERNAME=your_sb_login
SOCIALBLADE_PASSWORD=your_sb_password

# --- Proxy settings (optional, but keeps you from being rate‑limited) ---
PROXY_USERNAME=my_proxy_user
PROXY_PASSWORD=my_proxy_pass
PUPPETEER_PROXY_ENDPOINT=http://gate.smartproxy.com:7000   # puppeteer traffic
AXIOS_PROXY_GATEWAY=https://my_proxy_user:my_proxy_pass@gate.smartproxy.com:7000  # Axios traffic

# --- ScrapingBee -----------------------
SCRAPING_BEE_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# --- Runtime configuration --------------------------------
PORT=3000                  # Express API port (defaults to 3000)
VITE_URL=http://localhost:5173  # URL the frontend is served from
VITE_API_BASE=/api         # Base path the frontend uses to call the backend

```

### 3 · Run in development

```bash
# Terminal 1 – backend API
npm run server           # http://localhost:3000

# Terminal 2 – frontend with live reload
npm run dev              # http://localhost:5173
```

Open `localhost:5173`, type an Instagram handle, choose number of posts, and start exploring.

> Want to play without hitting Instagram? Use the mock API:
> ```bash
> npm run mock-dev
> ```

### 4 · Build for production

```bash
npm run build   # bundles the Svelte app to /dist
npm run preview # serves the static build on :4173 for sanity‑checking
```

<br>

## 🛠️ Development scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Vite dev server (`VITE_MODE=dev`) |
| `npm run mock-dev` | Uses mocked responses (`VITE_MODE=mock`) |
| `npm run server` | Starts Express API (reads `.env`) |
| `npm run build` | Production build |
| `npm run preview` | Preview the built site |

<br>

## ⚠️ Disclaimer

This project scrapes publicly available Instagram data for **personal research and educational use**.  
Make sure your usage complies with Instagram’s Terms of Service and local regulations. The authors take no responsibility for misuse.
