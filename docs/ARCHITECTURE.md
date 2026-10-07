# EMBER & SPICE — Architecture & System Design

## 1. High-Level Architectural Flow

```
                      +---------------------------------------+
                      |         User Devices / Browsers        |
                      |   (Mobile 320px+ -> Large 1440px+)    |
                      +-------------------+-------------------+
                                          |
                                          v
                      +---------------------------------------+
                      |      React 18 SPA (Vite + Tailwind)    |
                      |  - 3D Canvas (Three.js / R3F / Drei)  |
                      |  - Framer Motion Micro-Interactions   |
                      |  - Recharts SaaS Analytics Engine     |
                      +-------------------+-------------------+
                                          |
                                          v
                      +---------------------------------------+
                      |     Presentation / Page Layer         |
                      |  /customer/*  |  /owner/*  |  /staff/* |
                      +-------------------+-------------------+
                                          |
                                          v
                      +---------------------------------------+
                      |     State & Context Management        |
                      |  AuthContext, CartContext, ThemeCtx   |
                      |  RestaurantCtx (Shared sync layer)    |
                      +-------------------+-------------------+
                                          |
                                          v
                      +---------------------------------------+
                      |       Service Abstraction Layer       |
                      |  authService, orderService, etc.      |
                      +-------------------+-------------------+
                                          |
                                          v
                      +---------------------------------------+
                      |          HTTP / API Layer             |
                      |     Axios Client + Interceptors       |
                      +-------------------+-------------------+
                                          |
                                          | (Future HTTP / WSS)
                                          v
                      +---------------------------------------+
                      |        PLANNED BACKEND SERVICES       |
                      |  Express.js REST APIs + Socket.io     |
                      +-------------------+-------------------+
                                          |
                                          v
                      +---------------------------------------+
                      |        MongoDB Atlas Database         |
                      |  Mongoose Models & Geospatial Indexes |
                      +---------------------------------------+
```

---

## 2. Directory Structure Conventions

- **`src/api/`**: Raw Axios instances, HTTP endpoints, query serialization, token injection interceptors.
- **`src/services/`**: Pure business services that bridge UI state and API responses. When offline or during frontend demo mode, services interact seamlessly with localStorage/in-memory sync providers.
- **`src/context/`**: Global reactive state (User session, shopping cart with discount calculations, toast notifications, active restaurant data).
- **`src/components/3d/`**: Isolated Three.js/React Three Fiber scenes with fallback shaders and performance tiering.
- **`src/components/restaurant/`**: Domain components including the interactive SVG/Canvas restaurant floor plan visualizer, food cards, live order timeline.
- **`src/pages/`**: Role-isolated page trees (`customer/`, `owner/`, `staff/`).

---

## 3. Data Synchronization Model

In the current frontend implementation:
- A centralized `RestaurantContext` acts as the single source of truth for dynamic entities (Menu items, Orders, Table bookings, Live table occupancy status, Customer reviews).
- Any action taken by the **Owner** (e.g., changing Order `ORD-89421` status from `Preparing` to `Out for Delivery`, or updating Table `T-02` to `Reserved`) immediately updates the reactive store.
- When switching to the **Customer** or **Staff** views, they immediately observe the updated status, demonstrating real-world full-stack interactivity without requiring an external database.

---

## 4. 3D Performance & Degradation Strategy

1. **Hardware Acceleration Detection**: R3F WebGL canvas renders dynamic shadows and ambient occlusion on desktop viewports.
2. **Mobile / Reduced-Motion Fallback**: Automatically disables high-cost bloom post-processing on mobile devices (< 768px) and honors `prefers-reduced-motion: reduce`.
3. **Lazy Mount**: 3D scenes are suspended via React `Suspense` with an elegant glowing loader, preventing main-thread blocking during initial DOM hydration.
