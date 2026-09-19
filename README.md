# PALETTE — Personal Color Language Tool

<div align="center">

```
  ____   _    _     _____ _____ _____ _____ 
 |  _ \ / \  | |   | ____|_   _|_   _| ____|
 | |_) / _ \ | |   |  _|   | |   | | |  _|  
 |  __/ ___ \| |___| |___  | |   | | | |___ 
 |_| /_/   \_\_____|_____| |_|   |_| |_____|
```

**Eight instinct-driven choices. A palette that is entirely yours.**

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-13.4-black?style=flat-square&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

[Live Demo](https://palette-color.vercel.app) • [Methodology](#-methodology) • [Features](#-features) • [Installation](#-getting-started) • [Architecture](#-architecture)

---

</div>

## ✦ Overview

**PALETTE** is an interactive color personality discovery instrument rooted in the **Swiss International Typographic Style**. Rather than asking clinical diagnostic questions, PALETTE prompts you with eight instinct-guided visual inquiries.

Through your raw, gut-level selections across abstract color pairings, the deterministic scoring engine computes your chromatic vector across five psychological traits, constructing a unique 5-color personal palette complete with poetic nomenclature, an architectural archetype, and exportable palette cards.

---

## ✦ Aesthetic Philosophy

Designed with strict adherence to modernist design principles:

- **Swiss Grid System**: Stark 1px mathematical borders, rigorous proportions, and intentional whitespace.
- **Monochrome Scaffolding**: Pure black (`#0a0a0a`) and white (`#ffffff`) chrome that steps aside to let the colors speak.
- **Typography-First Hierarchy**: Precision monospace metadata paired with modernist sans-serif display titles (`DM Mono` + `Inter`).
- **Tactile Micro-interactions**: Bespoke crosshair cursor system, subtle border highlights, and spring-physics transitions powered by Framer Motion.

---

## ✦ Features

- **8 Instinct-Driven Rounds**: Rapid-fire, evocative questions (e.g., *"Which feels like home?"*, *"Which feels like 2am?"*, *"Which feels like silence?"*).
- **Multi-Vector Trait Engine**: Real-time scoring across 5 core dimensions:
  - **Warmth** — Earthy, organic, welcoming tones vs. crisp neutrality.
  - **Structure** — Contrast, discipline, clarity, and architectural rigidity.
  - **Depth** — Deep saturation, shadow, introspection, and weight.
  - **Energy** — Vivid chromatic accents, impulse, and dynamism.
  - **Calm** — Muted harmonies, spaciousness, and low-frequency tranquility.
- **Dynamic 5-Color Synthesis**: A tailored 5-swatch palette curated with programmatic luminance contrast and balance.
- **Archetype & Narrative Reading**: Comprehensive personality profiles and poetic color titles.
- **High-Resolution Card Export**: One-click generation of a 2x retina-ready `.png` palette specimen card using `html2canvas`.
- **One-Click HEX Extraction**: Instant clipboard copy of the entire palette string.
- **Zero Backend Required**: Runs entirely client-side with zero telemetry and automatic local state persistence.

---

## ✦ Methodology

```
┌─────────────────┐       ┌─────────────────┐       ┌──────────────────┐
│   8 Intuitive   │ ───►  │  Vector Scoring │ ───►  │ Chromatic Match  │
│   Color Rounds  │       │  (5 Dimensions) │       │   (Color Pool)   │
└─────────────────┘       └─────────────────┘       └──────────────────┘
                                                              │
                                                              ▼
┌─────────────────┐       ┌─────────────────┐       ┌──────────────────┐
│ High-Res Export │ ◄───  │ Poetic Reading  │ ◄───  │ 5-Color Personal │
│  & Share Card   │       │   & Archetype   │       │  Palette Result  │
└─────────────────┘       └─────────────────┘       └──────────────────┘
```

Each choice in the 8 rounds contributes weighted coefficients to your trait profile:

$$\text{Trait Total}_k = \sum_{i=1}^{8} W_{i,k}$$

The top archetype pairings map directly into nuanced literary profiles—ranging from *The Architect* to *The Poet of Dusk*—yielding an intimate chromatic signature.

---

## ✦ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [React 18](https://react.dev/) |
| **Build Tool** | [Vite 5](https://vitejs.dev/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) & JSX |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) & Raw CSS Tokens |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Export** | [html2canvas](https://html2canvas.hertzen.com/) |
| **Deployment** | [Vercel](https://vercel.com/) |

---

## ✦ Project Structure

```
Palette-Color/
├── src/
│   ├── components/
│   │   ├── CursorCross.jsx    # Custom Swiss crosshair tracking cursor
│   │   ├── ProgressBar.jsx    # Minimalist round step progress indicator
│   │   └── ShareCard.jsx      # High-density printable specimen layout
│   ├── context/
│   │   └── PaletteContext.jsx # Global state management & round tracking
│   ├── data/
│   │   ├── poeticNames.js     # Literary naming dictionary for color codes
│   │   ├── readings.js        # Archetype profiles & personality readings
│   │   └── rounds.js          # 8 curated question rounds & color weights
│   ├── screens/
│   │   ├── LandingScreen.jsx  # Hero presentation & aesthetic manifesto
│   │   ├── RoundScreen.jsx    # 4-quadrant interactive selection viewport
│   │   └── ResultScreen.jsx   # Palette showcase, radar metrics & export
│   ├── utils/
│   │   ├── colorUtils.js      # Luminance, contrast ratio & hex utilities
│   │   ├── paletteEngine.js   # Deterministic score & swatch generator
│   │   └── storage.js         # localStorage hydration & caching
│   ├── App.jsx                # Screen switcher & transition orchestrator
│   ├── index.css              # Typography, grid resets & Swiss CSS tokens
│   └── main.tsx               # Application bootstrap
├── index.html                 # Document shell & meta headers
├── tailwind.config.js         # Tailwind configuration
├── vite.config.ts             # Vite build & alias configuration
└── package.json               # Dependencies & project scripts
```

---

## ✦ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18.0 or higher recommended)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/kishan34-Mac/Palette-Color.git
   cd Palette-Color
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. Open your browser at `http://localhost:5173`.

### Production Build

```bash
npm run build
npm run preview
```

---

## ✦ Deployment

This project is configured for zero-configuration deployment on **Vercel**:

```bash
npx vercel
```

Or connect the GitHub repository directly to Vercel. A [`vercel.json`](./vercel.json) configuration is already included in the root directory.

---

## ✦ License

This project is licensed under the **MIT License** — feel free to use, modify, and distribute.
