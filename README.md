<div align="center">

# 🎵 MoodTune

[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)](http://makeapullrequest.com)

> A quiet, reflective AI music companion that turns your emotional state into personalized Turkish music playlists.

</div>

---

## ✨ Features

- 🌿 **Thoughtful 4-Step Flow**: A calm, single-question flow exploring mood, context, genre preferences, and emotional direction without distracting tech noise.
- 🎭 **Cultural Nuance Integration**: Deeply respects authentic Turkish emotional registers like *efkarlanmak* and distinct genres (arabesk, türkü, sanat müziği, rock, pop).
- 🔒 **Secure Backend Proxy**: Server-side integration shields your Gemini API keys from client exposure while enforcing structured JSON responses.
- 🎧 **Search-Ready Recommendations**: Instant search redirection links for Spotify and YouTube Music without playback clutter or intrusive tracking.
- 🎨 **Warm & Organic Aesthetic**: Crafted with warm cream tones, muted terracotta accents, and generous whitespace—deliberately avoiding generic neon AI templates.
- 📱 **Mobile-First & Private**: High-performance responsive design with zero persistent data logging for maximum user privacy.

---

## 🛠️ Tech Stack

- [React](https://reactjs.org/) - Frontend UI Framework
- [TypeScript](https://www.typescriptlang.org/) - Type-Safe Codebase
- [Vite](https://vitejs.dev/) - Next-Generation Frontend Tooling
- [Tailwind CSS](https://tailwindcss.com/) - Utility-First Styling
- [Node.js / Express](https://nodejs.org/) - Lightweight API Proxy Server
- [Google Gemini API](https://ai.google.dev/) - Generative AI Engine for Structured Recommendations

---

## 🚀 Quick Start & Setup

### Prerequisites
- Node.js (v18.0 or higher)
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/mertbatubulbul/moodtune.git
cd moodtune
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run the Development Server
```bash
npm run dev
```

---

## 🔑 Configuration & API Keys

MoodTune requires a Google Gemini API key to generate intelligent playlist selections securely through its backend proxy.

1. Obtain a Gemini API Key from [Google AI Studio](https://aistudio.google.com/).
2. Create a `.env` file in the root directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   PORT=5000
   ```

> **Security Note**: Never commit your `.env` file to version control. The included Express proxy handles all requests to Gemini server-side to keep your key hidden from client bundles.

---

## 🎯 How It Works

1. **Express Your Mood**: Select or type your current feeling (*mutlu*, *yorgun*, *nostaljik*, *hüzünlü*).
2. **Provide Context**: Tap quick shortcuts or type why you're feeling this way (*iş*, *ilişki*, *hava durumu*, *özlem*).
3. **Select Turkish Genres**: Choose your favorite music styles (*arabesk*, *türkü*, *pop*, *rock*, *sanat müziği*).
4. **Choose Emotional Direction**: Decide whether you want to lift your spirits or sink into the feeling (*efkarlanmak*).
5. **Receive Your Playlist**: Gemini generates 8–12 tailored Turkish songs complete with personal explanations and direct streaming search links.

---

## 📦 Building for Production

To build the client bundle and verify production-ready assets:

```bash
# Build the frontend
npm run build

# Preview the production build
npm run preview
```

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">

**Created By Mert Batu BULBUL**
* 🎓 AI Engineering & Full Stack Developer * 💻 React *

**Don't forget to star ⭐ this repo if you found it useful!**

</div>

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page or open a pull request.
