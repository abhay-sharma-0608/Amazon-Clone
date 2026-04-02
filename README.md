# Amazon Clone — React + Vite

A fully functional Amazon.in clone built with React, Vite, and React Router.

## Features

- 🏠 **Homepage** — Hero banner, category grid, deals & best sellers sections
- 🔍 **Search** — Live search across title, brand, and category with filter chips
- 📂 **Category pages** — Browse by Electronics, Fashion, Books, Home, Toys
- 📦 **Product detail** — Full product view with image, pricing, discount, Prime badge
- 🛒 **Shopping cart** — Slide-in panel, quantity controls, remove items, subtotal
- ⚡ **Buy Now** — Instant purchase flow
- 🍞 **Toast notifications** — Confirmation on add-to-cart
- 📱 **Responsive** — Mobile-friendly layout

## Tech Stack

- **React 18** — UI components
- **Vite 5** — Build tool & dev server
- **React Router v6** — Client-side routing
- **CSS Modules** — Scoped component styles

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
amazon-clone/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx / .module.css
│   │   ├── ProductCard.jsx / .module.css
│   │   ├── CartPanel.jsx / .module.css
│   │   └── Toast.jsx / .module.css
│   ├── context/
│   │   └── CartContext.jsx
│   ├── data/
│   │   └── products.js
│   ├── pages/
│   │   ├── Home.jsx / .module.css
│   │   ├── Category.jsx / .module.css
│   │   ├── Search.jsx / .module.css
│   │   └── ProductDetail.jsx / .module.css
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
└── package.json
```

## Extending the Project

- Add **Firebase / Supabase** for auth and real database
- Add **Stripe** for real payments
- Add **real product images** via an API (e.g. Fake Store API)
- Add **user reviews** and ratings functionality
- Add **address/checkout** multi-step flow
