# EMBER & SPICE — Backend Implementation Roadmap & Guide

This roadmap details the exact steps and file locations for connecting an Express.js + MongoDB backend to the Ember & Spice frontend.

---

## 1. Planned Backend Structure (`backend-planned/`)

```
backend-planned/
├── config/
│   ├── db.js             // Mongoose connection to MongoDB Atlas
│   └── cors.js           // Allowed origins (e.g. http://localhost:5173)
├── controllers/
│   ├── authController.js    // JWT signing, bcrypt password hashing, cookie/header issuance
│   ├── menuController.js    // CRUD operations for foods, categories, stock toggling
│   ├── orderController.js   // Order placement, status state machine, bill computation
│   ├── bookingController.js // Table reservations, double-booking prevention locks
│   ├── paymentController.js // Razorpay order generation & HMAC signature verification
│   └── analyticsController.js// Aggregation pipelines for revenue, popular dishes & peak hours
├── middleware/
│   ├── authMiddleware.js    // JWT bearer extraction & req.user attachment
│   ├── roleMiddleware.js    // Restrict access by 'owner' | 'staff' | 'customer'
│   └── errorHandler.js      // Centralized error interceptor
├── models/
│   ├── User.js
│   ├── Food.js
│   ├── Order.js
│   ├── Table.js
│   ├── Booking.js
│   └── Review.js
├── routes/
│   ├── authRoutes.js
│   ├── menuRoutes.js
│   ├── orderRoutes.js
│   ├── bookingRoutes.js
│   ├── paymentRoutes.js
│   └── adminRoutes.js
└── server.js                // Express entry point + Socket.io server
```

---

## 2. Frontend Connection Switch

In the frontend, every service in `src/services/` (e.g., `authService.js`, `orderService.js`, `bookingService.js`) contains:
```javascript
// Currently using Mock / LocalStorage sync provider
// To switch to live Express backend:
// Set VITE_API_BASE_URL=http://localhost:5000/api in .env
// And enable the axios HTTP callers in src/api/*.api.js
```

Each frontend service provides a clean interface that maps 1:1 with the Express controllers, meaning **zero redesign or component modification** will be needed when introducing the backend.
