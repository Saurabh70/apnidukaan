# ApniDukaan: From Gali to Digital

An interactive pitch demo for **ApniDukaan**, a platform that brings India's neighbourhood kirana stores online with a digital and logistics layer.

The experience tells the story in two stages:

1. **Rahul General Store, circa 1999.** A hand-illustrated, retro kirana shopfront with a painted signboard, marigold toran, hanging bulb, price cards, tarazu and the classic "Udhaar Band Hai" sign.
2. **Rahul's digital dukaan.** One tap transforms the shop into a quick-commerce storefront with search, six categories, working add-to-cart, a cart drawer, a demo checkout and live order tracking.

> ApniDukaan doesn't replace Rahul's shop. It brings Rahul's shop to the customer's phone.

## Tech

React 18, Tailwind CSS 3, Framer Motion, Vite. All product art is drawn in SVG, so there are no external image assets.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build          # standard build into dist/
npm run build:single   # one self-contained HTML file in dist-single/
```

## Project layout

| File | What it is |
|---|---|
| `src/RetroStage.jsx` | Stage 1: the retro landing screen |
| `src/ShopFront.jsx` | The illustrated kirana shopfront (SVG) |
| `src/Transformation.jsx` | The shop-to-phone transformation sequence |
| `src/DigitalStore.jsx` | Stage 2: header, hero, catalogue, closing message |
| `src/Overlays.jsx` | Cart drawer, demo checkout, onboarding modal |
| `src/PackArt.jsx` | Stylised product pack illustrations |
| `src/data.js` | Sample catalogue and fees |

## Disclaimer

This is a concept demo. Product names are used for illustration only. Prices, fees and delivery times are sample data, and checkout takes no payment.
