# EMBER & SPICE — Planned Database Schemas (MongoDB / Mongoose)

This document formalizes the planned MongoDB schemas that mirror the frontend data models.

---

## 1. User Schema (`users`)
```typescript
{
  _id: ObjectId,
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: ['customer', 'owner', 'staff', 'manager'], default: 'customer' },
  phone: { type: String, required: true },
  avatar: { type: String, default: '' },
  addresses: [{
    label: { type: String, enum: ['Home', 'Work', 'Other'], default: 'Home' },
    street: String,
    apartment: String,
    city: String,
    state: String,
    pincode: String,
    isDefault: Boolean
  }],
  favorites: [{ type: ObjectId, ref: 'Food' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}
```

---

## 2. Food Item Schema (`foods`)
```typescript
{
  _id: ObjectId,
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  category: { type: String, required: true, index: true },
  price: { type: Number, required: true, min: 0 },
  discountPrice: { type: Number, default: 0 },
  isVeg: { type: Boolean, required: true },
  spiceLevel: { type: String, enum: ['mild', 'medium', 'hot', 'extra-hot'], default: 'medium' },
  rating: { type: Number, default: 4.5, min: 0, max: 5 },
  reviewsCount: { type: Number, default: 0 },
  isBestseller: { type: Boolean, default: false },
  isFeatured: { type: Boolean, default: false },
  inStock: { type: Boolean, default: true },
  prepTime: { type: String, default: '25-30 mins' },
  calories: { type: String, default: '450 kcal' },
  image: { type: String, required: true },
  ingredients: [{ type: String }],
  allergens: [{ type: String }],
  nutritionalInfo: {
    protein: String,
    carbs: String,
    fat: String,
    fiber: String
  },
  customizations: {
    portions: [{ name: String, priceDelta: Number }],
    addOns: [{ name: String, price: Number }]
  },
  createdAt: { type: Date, default: Date.now }
}
```

---

## 3. Order Schema (`orders`)
```typescript
{
  _id: ObjectId,
  orderNumber: { type: String, required: true, unique: true, index: true },
  customer: {
    userId: { type: ObjectId, ref: 'User' },
    name: String,
    email: String,
    phone: String
  },
  orderType: { type: String, enum: ['delivery', 'takeaway', 'dine-in'], required: true },
  items: [{
    foodId: { type: ObjectId, ref: 'Food' },
    name: String,
    quantity: { type: Number, required: true, min: 1 },
    portion: String,
    spiceLevel: String,
    addOns: [String],
    unitPrice: Number,
    totalPrice: Number
  }],
  pricing: {
    subtotal: Number,
    discount: Number,
    couponCode: String,
    tax: Number,
    packagingFee: Number,
    deliveryFee: Number,
    total: Number
  },
  deliveryAddress: {
    street: String,
    apartment: String,
    city: String,
    pincode: String
  },
  deliveryNotes: String,
  payment: {
    method: { type: String, enum: ['UPI', 'CARD', 'NET_BANKING', 'COD', 'WALLET'] },
    status: { type: String, enum: ['pending', 'paid', 'failed'], default: 'paid' },
    transactionId: String
  },
  status: {
    type: String,
    enum: ['placed', 'confirmed', 'preparing', 'ready', 'out_for_delivery', 'delivered', 'cancelled'],
    default: 'placed',
    index: true
  },
  timeline: [{
    status: String,
    timestamp: { type: Date, default: Date.now },
    note: String
  }],
  tableId: { type: String }, // For dine-in
  createdAt: { type: Date, default: Date.now }
}
```

---

## 4. Table Schema (`tables`)
```typescript
{
  _id: ObjectId,
  code: { type: String, required: true, unique: true }, // e.g. T-01
  name: { type: String, required: true },
  capacity: { type: Number, required: true },
  section: { type: String, enum: ['main-hall', 'window', 'balcony', 'private-lounge', 'bar'] },
  status: { type: String, enum: ['available', 'reserved', 'occupied', 'maintenance'], default: 'available' },
  coordinates: {
    x: Number,
    y: Number,
    shape: { type: String, enum: ['rect', 'round'], default: 'rect' }
  }
}
```

---

## 5. Booking Schema (`bookings`)
```typescript
{
  _id: ObjectId,
  bookingNumber: { type: String, required: true, unique: true },
  customer: {
    userId: { type: ObjectId, ref: 'User' },
    name: String,
    phone: String,
    email: String
  },
  table: {
    tableId: { type: ObjectId, ref: 'Table' },
    code: String,
    name: String
  },
  date: { type: String, required: true },
  time: { type: String, required: true },
  guests: { type: Number, required: true },
  occasion: { type: String, default: 'Casual Dining' },
  specialRequests: String,
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'arrived', 'completed', 'cancelled', 'rejected'],
    default: 'confirmed'
  },
  createdAt: { type: Date, default: Date.now }
}
```
