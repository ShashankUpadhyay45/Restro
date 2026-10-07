// BACKEND IMPLEMENTATION REQUIRED
// Controllers: authController.js, orderController.js, bookingController.js, menuController.js, adminController.js
// Planned logic:
// - authController.login -> Validate credentials, issue JWT, return User payload
// - orderController.createOrder -> Validate item availability, calculate totals, insert Order, broadcast Socket event
// - bookingController.createBooking -> Check table availability for date/time, lock slot, emit notification
// - menuController.getMenu -> Return filtered food catalog with pagination and aggregation
