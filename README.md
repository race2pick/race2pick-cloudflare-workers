# 🎯 Race2Pick URL Shortener Worker

This Cloudflare Worker acts as a **simple API** for shortening and storing player data from [race2pick.github.io](https://race2pick.github.io).
The shortened data is stored using **Cloudflare KV (Key-Value Store)** for fast and reliable access.

---

## 🚀 Features

* ✂️ Shorten player string data.
* 💾 Store shortened data in **Cloudflare KV**.
* 🔗 Retrieve original data by short key.
* ⚡ Built with **Cloudflare Workers** for high performance and low latency.

---

## ⚙️ Configuration

### 1. Install Dependencies

```bash
npm install
```

### 2. Generate Worker Configuration Types

```bash
npm run cf-typegen
```


---

## ▶️ Run Locally

Start the Worker locally with:

```bash
npm run dev
```

The Worker will be available at `http://127.0.0.1:8787`.

---

## 🌐 Deploy to Cloudflare

Deploy the Worker using:

```bash
npm run deploy
```

---

## 📜 License

This project is licensed under the GNU General Public License (GPL). See [LICENSE](LICENSE) for details.

---

> **💡 Notes**:
>
> This project is designed to support **[Race2Pick](https://race2pick.github.io)**


