# 🏡 Property Listing Platform

![Responsive](https://img.shields.io/badge/Responsive-Yes-brightgreen)
![Frontend Only](https://img.shields.io/badge/Frontend-Focused-blue)
![Tech Stack](https://img.shields.io/badge/Tech%20Stack-React%2C%20TypeScript%2C%20TailwindCSS-orange)

> A sleek, modern, and interactive frontend application that helps users search, filter, and discover properties in real-time — across all devices.

---

## 🌐 Live Demo

👉 **Deployed Here:** [https://property-listing-1.web.app/](https://property-listing-1.web.app/)

---

## 👨‍💻 Team Members

- 👑 **Shivam Shrivastava** – Team Lead  
- 👨‍💻 **Rahul Kumar** – Team Member  
- 👨‍💻 **D. Lakshmi Narasimha** – Team Member

---

## ✨ Features

### 🔍 Advanced Real-Time Filtering
- Filter by 🏠 Property Type, 💰 Price Range, 📍 Location, and 🛠 Amenities.
- Map-based search with draggable boundaries and real-time updates.
- Multi-select dropdowns, sliders, and a clean filter UI across all screen sizes.

### 🖼 Interactive Property Details
- 📸 Image carousel and immersive video tours.
- 🗺 Interactive map with nearby points of interest.
- 🧾 Sectioned info cards for Price, Availability, Neighborhood, etc.
- 🏠 Clickable Floor Plans and 360° Virtual Tours.

### 🤖 AI-Powered HomeFinder Bot
- Built-in chatbot assistant to help users find properties using conversational queries.
- Suggests homes based on preferences and filters.
- Enhances user engagement with intelligent replies.

### 🔐 Google Sign-In Authentication
- Seamless and secure login with Google.
- Personalizes user experience and enables property saving across sessions.

### 📬 Smart Inquiry System
- Quick and accessible inquiry forms on each property.
- Real-time validation with user-friendly error prompts.
- Automated email confirmations and on-page success messages.
- Agent contact cards with social links and direct call/email options.

### 📱 Mobile-Optimized Experience
- Touch-enabled components: swipeable carousels, sliders, and more.
- Responsive grids and layouts optimized for all devices.
- Collapsible side menus and smart navigation for small screens.

### ❤️ Favorites & Property Comparison
- Save properties to a persistent favorites list (via localStorage).
- Compare properties side-by-side with feature highlights and key differences.

### 🧭 Sorting & View Options
- Sort by Price, Date Added, or Proximity.
- Choose from Grid View, List View, or Map View for personalized browsing.

---

## 📁 Folder Structure

```bash
property-listing-platform/
├── src/
│   ├── components/
│   │   ├── FeaturedProperties.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── HeroSection.tsx
│   │   ├── HomeFinderBot.tsx
│   │   ├── PropertyCard.tsx
│   │   ├── PropertyComparison.tsx
│   │   ├── PropertyFeatures.tsx
│   │   ├── PropertyImageGallery.tsx
│   │   ├── PropertyMap.tsx
│   │   └── PropertySearchFilters.tsx
│   ├── context/
│   │   └── FavoritesContext.tsx
│   ├── data/
│   │   └── properties.js
│   ├── pages/
│   │   ├── ContactPage.tsx
│   │   ├── FavoritesPage.tsx
│   │   ├── HomePage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── PropertiesPage.tsx
│   │   ├── PropertyDetailsPage.tsx
│   │   └── ProtectedRoute.tsx
│   ├── styles/
│   │   └── tailwind.css
│   ├── types/
│   │   ├── index.ts
│   │   └── properties.ts
│   ├── utils/
│   │   └── formatters.ts
│   ├── App.tsx
│   ├── firebase.ts
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── .firebaserc
├── .gitignore
├── apphosting.yaml
├── eslint.config.js
├── firebase.json
├── index.html
├── package-lock.json
├── package.json
├── pnpm-lock.yaml
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
└── tsconfig.node.json
