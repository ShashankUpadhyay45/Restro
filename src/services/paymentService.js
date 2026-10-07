/**
 * Payment Service Abstraction
 * Supports Razorpay, UPI, Credit/Debit cards, Cash on Delivery, and Net Banking.
 */
export const paymentService = {
  processPayment: async ({ method, amount, orderDetails }) => {
    // Simulated payment processing delay
    await new Promise(r => setTimeout(r, 900));

    // In a live environment:
    // 1. Call POST /api/payments/create-order
    // 2. Open Razorpay modal or redirect to UPI app
    // 3. Call POST /api/payments/verify with signature

    const isSuccess = true; // 99% simulation success
    if (isSuccess) {
      return {
        success: true,
        transactionId: `TXN_EMB_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}`,
        method,
        amount,
        timestamp: new Date().toISOString()
      };
    } else {
      throw new Error("Payment gateway declined transaction. Please try another method.");
    }
  }
};
