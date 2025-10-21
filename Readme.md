# 🎥 YouTube Explorer

A modern web app built with **React + TypeScript** that allows users to search, watch, and explore YouTube videos, featuring a search history, integrated player, and Google OAuth2 authentication.

---

## 🚀 Tech Stack

- ⚛️ **React 19** — UI library for building interactive interfaces
- ⚡ **Vite** — Next-generation, blazing-fast build tool
- 🟦 **TypeScript** — Type-safe development for scalability and reliability
- 🧰 **Redux Toolkit** — Simplified global state management
- 📡 **Axios** — API requests and HTTP communication
- 🧪 **React Testing Library + Vitest** — Unit and integration testing
- 🎨 **Tailwind CSS** — Modern utility-first CSS framework
- 🔍 **YouTube Data API v3 + OAuth2** — Secure search and authentication via Google

---

## ✨ Features

### ✅ Core Requirements Implemented

- 🔎 **Video search** by keyword using YouTube API
- 🏠 **Home page** displaying the main video player and related/recommended sections
- 🧩 **State management** with Redux Toolkit for predictable and performant updates
- 🕓 **Persistent search history** stored locally (via `localStorage`)
- 🧱 **Componentized architecture** with clear separation of concerns

### 🌟 Extra Features

- 🔐 **Google Login (OAuth2)** for authenticated access to YouTube API
  > ⚠️ **Note:** To fully access OAuth2 login, the tester’s email must be pre-approved.  
  > Please contact the developer to have your email added to the whitelist.
- 🧪 **Unit tests** with Vitest and React Testing Library
- ♿ **Basic accessibility support** (ARIA roles, loading states, keyboard navigation)

---

## ⚙️ Setup & Installation

### 🔧 Prerequisites

- Node.js 18+
- A valid **YouTube Data API v3 key**

### 💻 Steps

```bash
# 1. Clone the repository
git clone https://github.com/brunobz/desafio-frontend.git
cd desafio-frontend

# 2. Install dependencies
npm install

# 3. Set environment variables
cp .env.local .env
# Add your YouTube API key and OAuth credentials

# 4. Run the local server
npm run dev

# 5. Open in browser
http://localhost:5173
```

---

## 🧪 Testing

Run all unit tests with:

```bash
npm run test
```

Tests cover:

- Rendering and logic of the `Home` component
- `SearchBar` interactions (input, history, submission)
- Mocked YouTube API calls (`useSearchVideosQuery`)
- Accessibility checks (roles and feedback messages)

---

## 🔐 OAuth2 & Google Login

This project integrates **OAuth2 authentication** for YouTube API access.  
Due to Google API restrictions, **the tester’s email must be whitelisted** for authentication to work.

> 🔒 To gain full access to the OAuth2 flow, please contact the developer to have your email added to the test users list.

---

## 👨‍💻 Developer

**Bruno Bianchini Zandavalle** — Frontend Engineer  
💼 Experienced in React, TypeScript, and Scalable Architecture  
🌐 [LinkedIn](https://www.linkedin.com/in/bruno-bianchini-zandavalle/) • [GitHub](https://github.com/brunobz)

---

> This project was built as part of a **Frontend Engineer technical assessment**, focusing on clean code, accessibility, and modern React best practices.
