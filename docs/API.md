# EMBER & SPICE — REST API Specification & Contract

This document outlines the planned RESTful API contracts for the Ember & Spice Restaurant Ecosystem.
The frontend has service layers and API client placeholders configured to match these exact endpoints.

---

## Base URL
```
Development: http://localhost:5000/api
Production:  https://api.emberandspice.com/api
```

---

## Authentication & Authorization (`/api/auth`)

### 1. User Login
- **Endpoint**: `POST /api/auth/login`
- **Access**: Public
- **Headers**: `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "email": "customer@demo.com",
    "password": "Password123!",
    "role": "customer" // "customer" | "owner" | "staff"
  }
  ```
- **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "d8f934e8-8d4e-4f76-9d32-...",
    "user": {
      "id": "usr_c101",
      "name": "Aarav Sharma",
      "email": "customer@demo.com",
      "role": "customer",
      "phone": "+91 98765 43210",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
    }
  }
  ```
- **Error Responses**:
  - `400 Bad Request`: `{"success": false, "message": "Invalid email or password format"}`
  - `401 Unauthorized`: `{"success": false, "message": "Invalid credentials"}`

### 2. User Registration
- **Endpoint**: `POST /api/auth/register`
- **Access**: Public
- **Request Body**:
  ```json
  {
    "name": "Priya Nair",
    "email": "priya@example.com",
    "password": "SecurePassword123!",
    "phone": "+91 91234 56789",
    "role": "customer"
  }
  ```
- **Success Response (201 Created)**: Returns JWT token and newly created user profile.

### 3. Current User Profile
- **Endpoint**: `GET /api/auth/me`
- **Access**: Authenticated (Bearer Token)
- **Headers**: `Authorization: Bearer <token>`
- **Success Response (200 OK)**: Returns user object.

### 4. Refresh Token
- **Endpoint**: `POST /api/auth/refresh`
- **Request Body**: `{"refreshToken": "<refresh_token>"}`
- **Success Response (200 OK)**: Returns new `token`.

---

## Food Menu & Categories (`/api/menu`, `/api/categories`)

### 1. Get All Dishes
- **Endpoint**: `GET /api/menu`
- **Access**: Public
- **Query Parameters**:
  - `category`: string (e.g. `kebabs-starters`, `biryani-rice`, `breads`)
  - `dietary`: `veg` | `non-veg` | `vegan` | `all`
  - `spiceLevel`: `mild` | `medium` | `hot` | `extra-hot`
  - `search`: string
  - `sortBy`: `popular` | `price-low` | `price-high` | `rating` | `newest`
  - `minPrice`: number
  - `maxPrice`: number
- **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "count": 24,
    "data": [
      {
        "id": "food_01",
        "name": "Dum Pukht Murgh Biryani",
        "category": "biryani-rice",
        "price": 480,
        "discountPrice": 420,
        "isVeg": false,
        "spiceLevel": "medium",
        "rating": 4.9,
        "reviewsCount": 184,
        "isBestseller": true,
        "prepTime": "30 mins",
        "calories": "650 kcal",
        "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8",
        "description": "Slow-cooked fragrant basmati rice layered with saffron marinated chicken..."
      }
    ]
  }
  ```

### 2. Get Dish Details
- **Endpoint**: `GET /api/menu/:id`
- **Access**: Public
- **Success Response (200 OK)**: Detailed food profile with custom options (portion size, add-ons, allergens, nutritional facts).

### 3. Create/Update/Delete Dish (Admin / Owner)
- `POST /api/admin/menu` (201 Created)
- `PUT /api/admin/menu/:id` (200 OK)
- `DELETE /api/admin/menu/:id` (200 OK)
- `PATCH /api/admin/menu/:id/toggle-stock` (200 OK)

---

## Orders & Payments (`/api/orders`, `/api/payments`)

### 1. Create New Order
- **Endpoint**: `POST /api/orders`
- **Access**: Authenticated Customer
- **Request Body**:
  ```json
  {
    "orderType": "delivery", // "delivery" | "takeaway" | "dine-in"
    "items": [
      {
        "foodId": "food_01",
        "quantity": 2,
        "portion": "regular",
        "spiceLevel": "medium",
        "addOns": ["Extra Raita", "Roasted Papad"],
        "unitPrice": 420
      }
    ],
    "deliveryAddress": {
      "label": "Home",
      "street": "402 Royal Orchid Heights, Indiranagar",
      "city": "Bengaluru",
      "pincode": "560038"
    },
    "deliveryNotes": "Leave with security if doorbell not answered.",
    "pricing": {
      "subtotal": 840,
      "discount": 100,
      "couponCode": "EMBERFIRST",
      "tax": 42,
      "packagingFee": 30,
      "deliveryFee": 40,
      "total": 852
    },
    "paymentMethod": "UPI" // "UPI" | "CARD" | "NET_BANKING" | "COD"
  }
  ```
- **Success Response (201 Created)**:
  ```json
  {
    "success": true,
    "message": "Order placed successfully",
    "order": {
      "orderId": "ORD-89421",
      "status": "placed",
      "estimatedDeliveryTime": "35-45 mins",
      "createdAt": "2026-09-30T19:45:00.000Z"
    }
  }
  ```

### 2. Track Order Live Status
- **Endpoint**: `GET /api/orders/:id/track`
- **Access**: Customer / Staff / Admin
- **Success Response (200 OK)**:
  ```json
  {
    "orderId": "ORD-89421",
    "currentStatus": "preparing",
    "timeline": [
      { "status": "placed", "timestamp": "19:45", "completed": true },
      { "status": "confirmed", "timestamp": "19:48", "completed": true },
      { "status": "preparing", "timestamp": "19:55", "completed": true, "current": true },
      { "status": "ready", "timestamp": "20:10", "completed": false },
      { "status": "out_for_delivery", "timestamp": "20:15", "completed": false },
      { "status": "delivered", "timestamp": "20:30", "completed": false }
    ],
    "rider": {
      "name": "Vikram Singh",
      "phone": "+91 99887 76655",
      "vehicleNumber": "KA-01-EQ-4491"
    }
  }
  ```

---

## Table Reservations (`/api/bookings`)

### 1. Check Table Availability
- **Endpoint**: `GET /api/bookings/availability`
- **Parameters**: `date=2026-10-02&time=20:00&guests=4`
- **Success Response (200 OK)**: List of available tables with layout coordinates.

### 2. Create Table Reservation
- **Endpoint**: `POST /api/bookings`
- **Request Body**:
  ```json
  {
    "tableId": "T-04",
    "tableName": "Window Garden Table 4",
    "guests": 4,
    "date": "2026-10-02",
    "time": "20:00",
    "occasion": "Anniversary",
    "specialRequest": "Please arrange quiet corner with candlelight."
  }
  ```
- **Success Response (201 Created)**: Returns booking reservation token and table confirmation code.

---

## Owner / Admin Operations (`/api/admin/*`)
- `GET /api/admin/analytics/overview` — Revenue, order volume, live tables, top items.
- `GET /api/admin/orders` — Filter by status, search, pagination.
- `PATCH /api/admin/orders/:id/status` — Advance or cancel order status.
- `GET /api/admin/tables` — Real-time floor plan table states.
- `PATCH /api/admin/tables/:id/status` — Mark Available/Reserved/Occupied/Maintenance.
- `GET /api/admin/staff` — Staff roster and role access.
- `GET /api/admin/inventory` — Raw ingredient stock and low-inventory warnings.
