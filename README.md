# 👑 ZURIELLE ATELIER — Royal Bridal Lehenga E-Commerce Platform

> Production-Ready, High-Fashion MERN South Asian Bridal Couture & Lehenga E-Commerce Web Application featuring an **Interactive 3D Bespoke Customizer Studio**, **Cloudinary High-Resolution Asset Management**, and a **Real-Time Admin Management Atelier**.

---

## ✨ Project Highlights

1. **Light Luxury Bridal Aesthetics**:
   - Palette inspired by **Ivory (`#FDFBF7`)**, **Warm Cream**, **Champagne Gold (`#C5A880`)**, and **Blush Rose**.
   - Strict **8px Border Radius Standard** across cards, modals, buttons, inputs, and image containers.
   - Typography powered by **Inter** with editorial serif accents (**Cinzel**).
   - **Lenis Smooth Scrolling** and subtle **GSAP** reveals.

2. **Interactive 8-Step Lehenga Customizer Studio (`/customize/:id`)**:
   - **Step 1: Design Cut** (24-Kali Flared Ghera, Maharani Box Pleats, Sweetheart Choli, Corset Peplum, Sleeve lengths).
   - **Step 2: Royal Colors** (Base fabric swatches, Zari thread metallic tint, Dupatta contrast harmonies).
   - **Step 3: Pure Fabric Selection** (80g Pure Raw Silk, Italian Micro-Velvet, Tissue Organza, Tulle Net).
   - **Step 4: Embroidery Intensity** (Imperial Heavy Zardozi 350+ hrs, Medium Gotapatti, Starlight Mirrors).
   - **Step 5: Dupatta Styling** (Single vs Double Bridal Dupatta with Scalloped Borders).
   - **Step 6: Monogram Personalization** (Bride & Groom Names / Wedding Date zari calligraphy).
   - **Step 7: Made-To-Measure Fitting** (Standard XS-XXL or Custom Body Measurements in inches with visual guide).
   - **Step 8: Review & Commission** (Itemized spec sheet and real-time dynamic pricing calculation).

3. **Cloudinary Stream Media Pipeline**:
   - Multi-image drag-and-drop uploader streaming memory buffers directly to Cloudinary CDN via `/api/upload/multiple`.

4. **Complete E-Commerce & Customer Portal**:
   - Multi-facet Shop Catalog (`/shop`) with occasion, fabric, color, price range, and size filters.
   - High-Res Zoom Gallery and Size Chart Modal on Product Detail Page (`/product/:slug`).
   - Shopping Bag with bespoke item summary and coupon voucher validator (`ROYAL10`, `BRIDAL15`).
   - Multi-step Checkout (`/checkout`) with Insured Bridal Courier options.
   - Order Confirmation (`/order-confirmation/:id`) with **Live 7-Stage Stitching Timeline** (*Order Placed → Confirmed → Designing → Stitching → Quality Check → Shipped → Delivered*).
   - Customer Portal (`/account`) for orders, saved custom designs, measurement profiles, and address book.

5. **Full Admin Atelier Panel (`/admin`)**:
   - Executive Analytics with Revenue & Occasion sales breakdown.
   - Inventory Management with Add/Edit/Delete products and Cloudinary uploader.
   - Customizer Options Manager (Dynamic fabrics, cuts, and surcharges in MongoDB).
   - Live Order Progression Queue with status timeline updater.
   - Homepage Hero CMS & Promo Vouchers generator.

---

## 🔑 Default Credentials

### 👑 Super Admin Account:
- **Email:** `admin@zurielle.com`
- **Password:** `admin12345password`
- **Role:** Administrator (Access to `/admin`)

### 👤 VIP Customer Account:
- **Email:** `ayesha@gmail.com`
- **Password:** `customer123password`
- **Role:** Customer

*(Quick-autofill buttons are built directly into the [Login Page](http://localhost:5175/login) for instant testing)*

---

## 🚀 Running Locally

### 1. Backend Server (`/server`):
```bash
cd server
npm install
npm run data:import    # Seeds MongoDB with realistic bridal couture & customizer options
node server.js         # Starts server on http://localhost:5000
```

### 2. Frontend Client (`/client`):
```bash
cd client
npm install
npm run dev            # Starts Vite on http://localhost:5175
```

---

## 📂 Architecture Overview

```
lahnga/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── admin/          # Admin Layout, Cloudinary Uploader
│   │   │   ├── cart/           # Slide-out Cart Drawer
│   │   │   ├── common/         # ProductCard, QuickViewModal, SmoothScroll
│   │   │   ├── customizer/     # 8-Step Wizard & Customizer Live Preview Canvas
│   │   │   ├── home/           # All 13 Luxury Homepage Sections (Hero Swiper, Collections, etc.)
│   │   │   ├── layout/         # AnnouncementBar, Navbar, Footer, Mobile Drawer, Search Modal
│   │   │   └── shop/           # FilterSidebar, SizeChartModal, ProductReviews
│   │   ├── constants/
│   │   │   └── theme.js        # Centralized Design System Tokens (8px radius, colors, fonts)
│   │   ├── pages/
│   │   │   ├── admin/          # Admin Dashboard, Products, Customizer, Orders, CMS
│   │   │   ├── AccountPage.jsx
│   │   │   ├── CartPage.jsx
│   │   │   ├── CheckoutPage.jsx
│   │   │   ├── CustomizerPage.jsx
│   │   │   ├── HomePage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── OrderConfirmationPage.jsx
│   │   │   ├── ProductDetailPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   └── ShopPage.jsx
│   │   ├── redux/              # Redux Store & Slices (auth, cart, customizer, wishlist, ui)
│   │   └── services/           # Axios API Client with JWT interceptors
│   └── package.json
│
├── server/
│   ├── config/                 # MongoDB & Cloudinary SDK Configurations
│   ├── controllers/            # Auth, Products, Categories, Customizer, Orders, CMS
│   ├── data/                   # Realistic Luxury Bridal Seed Data
│   ├── middleware/             # JWT Verification, Role Authorization, Error Handlers
│   ├── models/                 # Mongoose Schemas (User, Product, Order, CustomDesign, etc.)
│   ├── routes/                 # Express REST Endpoints
│   ├── utils/                  # Cloudinary Stream Uploader & JWT Token Generator
│   ├── seeder.js               # Database Seeder Runner
│   └── server.js               # Main Express Server Entry Point
└── README.md
```

---

© 2026 ZURIELLE ATELIER COUTURE. All rights reserved.
