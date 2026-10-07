# EMBER & SPICE — 3D Interactive Restaurant Platform

> **"Crafted Fire. Authentic Flavor."**
> A production-grade, immersive 3D restaurant management, table reservation, and online food ordering platform built on a modern MERN-ready architecture.

---

## 🌟 Executive Overview

**Ember & Spice** is an elite culinary platform celebrating Awadhi dum gastronomy and open-charcoal hearth cooking. The application bridges the gap between high-end restaurant brand experiences and mission-critical SaaS restaurant management. It delivers:

1. **Cinematic 3D Role-Based Authentication**: Immersive Three.js environment featuring floating spices, rotating banquet charger plates, steam effects, dynamic lighting, and instant role switching (`Customer`, `Owner`, `Staff`).
2. **Customer Experience**:
   - **Hero with 3D Handi Centerpiece**: Interactive 3D clay handi with drag-to-inspect rotation and floating saffron embers.
   - **A La Carte Menu**: Multi-facet filtering by category, veg/non-veg, spice heat level, and price range with real-time sorting.
   - **Food Detail View**: 360° interactive 3D dish inspection pedestal, nutritional breakdown ribbon, and allergen warnings.
   - **Customization Engine**: Portion sizes with dynamic price deltas, heat intensity, and gourmet add-ons.
   - **Interactive Table Booking**: Architectural visual floor plan (Window Garden, Main Dining Hall, Charcoal Hearth Bar, Outdoor Terrace) with live seating availability.
   - **Real-Time Order Tracking**: Animated 6-stage order timeline and simulated live progression from kitchen hearth to doorstep valet.
   - **VIP Diner Profile & Favorites**: Manage addresses, dietary palates, past order reordering, and PDF tax invoices.
3. **Restaurant Owner Executive Suite**:
   - **Real-time KPI Telemetry**: Today's revenue, order counts, active kitchen load, and table occupancy.
   - **Recharts Analytics Engine**: Revenue velocity area charts, top dish turnover bars, and hourly kitchen rush histograms.
   - **Order Dispatch Management**: Live order advancement and status state machine.
   - **Menu & Taxonomy CRUD**: Add/edit dishes with image previews, stock status toggles, and category management.
   - **Floor & Table Management**: Real-time seating configuration and occupancy toggles.
   - **Promotions & Offers**: Percentage and flat discount vouchers with minimum spend rules.
   - **Pantry Inventory**: Raw commodity tracking with low-stock warnings.
   - **CRM & Staff Rosters**: Lifetime spend tracking and station shift assignments.
4. **Staff & Kitchen POS Terminal**:
   - **Kitchen Display System (KDS)**: Real-time Kitchen Order Tickets (KOT) with station timers and dish tickets.
   - **Waiter Floor Station**: Table status visualizer and food pickup notifications.
   - **Cashier Terminal**: Billing ledger and settled receipts.

---

## 🛠 Technology Stack

### Frontend & 3D Engineering
- **React 18** (`react`, `react-dom`)
- **Vite 5** (High-speed build tool & dev server)
- **Three.js** & **React Three Fiber (R3F)** (`@react-three/fiber`, `@react-three/drei`)
- **Framer Motion 11** (Fluid micro-interactions and modal transitions)
- **Tailwind CSS 3** (Custom design tokens, glassmorphism, and responsive breakpoints)
- **Lucide React** (Clean, consistent iconography)
- **Recharts 2** (Interactive SaaS analytics and volume distributions)
- **React Router DOM 6** (Role-guarded routes with nested layouts)
- **Axios** (Centralized API client with JWT interceptors)
- **Canvas Confetti** (Celebratory order confirmation bursts)

### Backend-Ready Architecture
- Designed for seamless integration with **Node.js**, **Express.js**, and **MongoDB Atlas**
- Clean service layer abstraction (`src/services/`) and REST API client (`src/api/`) allowing direct backend connectivity with zero frontend component modification

---

## 🚀 Quickstart & Installation

### Prerequisites
- Node.js `v18+` or `v20+` or `v22+`
- npm `v9+` or `v10+`

### Setup Instructions

1. Clone or navigate to the repository directory:
   ```bash
   cd Restro
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.

---

## 🔑 Demo Credentials (1-Click Instant Login)

The 3D Login screen provides 1-click test credential chips for all three personas:

| Role | Email | Password | Access Portal |
| :--- | :--- | :--- | :--- |
| **Customer** | `customer@demo.com` | `password123` | `/customer/home` |
| **Restaurant Owner** | `owner@demo.com` | `password123` | `/owner/dashboard` |
| **Kitchen / Staff** | `staff@demo.com` | `password123` | `/staff/dashboard` |

> *Note: For guest exploration, click **"Continue as Guest Diner"** on the login screen.*

---

## 📁 Project Architecture & Directory Structure

```
c:\Users\ASUS\Desktop\Projects\Restro\
├── backend-planned/            # Express.js + Socket.io planned controller & route templates
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
├── docs/                       # Complete engineering documentation
│   ├── API.md                  # RESTful API specifications and JSON schemas
│   ├── ARCHITECTURE.md         # Component and data sync flowcharts
│   ├── DATABASE.md             # MongoDB / Mongoose schema definitions
│   └── FUTURE_BACKEND.md       # Integration guide for connecting live Express backend
├── public/
├── src/
│   ├── api/                    # Raw Axios client & backend endpoint contracts
│   │   ├── axios.js
│   │   ├── auth.api.js
│   │   ├── menu.api.js
│   │   ├── order.api.js
│   │   ├── booking.api.js
│   │   └── admin.api.js
│   ├── components/
│   │   ├── 3d/                 # Three.js / R3F Canvas components
│   │   │   ├── LoginScene3D.jsx
│   │   │   ├── Hero3D.jsx
│   │   │   └── FoodViewer3D.jsx
│   │   ├── common/             # Reusable UI primitives
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Drawer.jsx
│   │   │   ├── EmptyState.jsx
│   │   │   ├── LoadingSkeleton.jsx
│   │   │   ├── ErrorBoundary.jsx
│   │   │   ├── GlobalSearchModal.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   └── restaurant/         # Domain-specific components
│   │       ├── FoodCard.jsx
│   │       ├── CustomizationModal.jsx
│   │       ├── FloorPlanVisualizer.jsx
│   │       └── OrderTimeline.jsx
│   ├── context/                # Global reactive state providers
│   │   ├── AuthContext.jsx
│   │   ├── CartContext.jsx
│   │   ├── ThemeContext.jsx
│   │   ├── NotificationContext.jsx
│   │   └── RestaurantContext.jsx (Unified sync layer)
│   ├── data/
│   │   └── mockData.js         # Realistic Indian fine-dining dataset
│   ├── layouts/
│   │   ├── CustomerLayout.jsx
│   │   ├── OwnerLayout.jsx
│   │   └── StaffLayout.jsx
│   ├── pages/
│   │   ├── auth/LoginPage.jsx
│   │   ├── customer/           # 10 complete customer flows
│   │   ├── owner/              # 12 complete owner SaaS views
│   │   ├── staff/StaffDashboardPage.jsx
│   │   └── error/              # 404, 403, 500 error boundaries
│   ├── routes/
│   │   └── AppRoutes.jsx
│   ├── services/               # Decoupled business logic & persistence
│   │   ├── authService.js
│   │   ├── orderService.js
│   │   ├── bookingService.js
│   │   ├── paymentService.js
│   │   ├── socketService.js
│   │   └── storageService.js
│   ├── styles/
│   │   └── index.css
│   ├── App.jsx
│   └── main.jsx
├── .env.example
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 🔄 Live State Synchronization Between Customer & Owner

Even without an external database, the platform features a reactive sync engine powered by `RestaurantContext`:
1. **Menu Item Modifications**: If the Owner disables stock or creates a new kebab in `/owner/menu`, it immediately reflects in the Customer `/customer/menu` catalog.
2. **Order Lifecycle**: When a Customer completes checkout at `/customer/checkout`, the order appears in the Owner `/owner/orders` queue and Kitchen `/staff/dashboard` KDS. Advancing the status updates the Customer's live `/customer/orders/:id/track` timeline.
3. **Table Seating**: Reserving a table in `/customer/book-table` updates the table's state on the Owner's floor plan to `Reserved`.

---

## 📄 License & Attribution

Crafted for **Ember & Spice Fine Indian Dining**. Open-source architectural blueprint for modern food-tech platforms.
