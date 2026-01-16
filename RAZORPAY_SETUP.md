# Razorpay Payment Gateway Integration Guide

## ✅ What's Been Done

### Backend Setup
1. **Installed Razorpay Package** - `npm install razorpay`
2. **Created Razorpay Routes** (`backend/routes/razorpayRoutes.js`):
   - `/api/razorpay/create-order` - Creates Razorpay order
   - `/api/razorpay/verify-payment` - Verifies payment signature
   - `/api/razorpay/payment/:paymentId` - Fetches payment details

3. **Updated server.js** - Added Razorpay routes

4. **Environment Variables** - Added to `.env`:
   ```
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   ```

### Frontend Setup
1. **Added Razorpay Script** - Added to `index.html`
2. **Updated CartModal** - Integrated Razorpay payment flow
3. **Payment Options** - Razorpay and Cash on Delivery

## 🔧 Setup Instructions

### Step 1: Get Razorpay Credentials
1. Go to [https://razorpay.com/](https://razorpay.com/)
2. Sign up / Log in to your account
3. Go to **Settings** → **API Keys**
4. Generate **Test Mode** keys (for development)
5. Copy:
   - **Key ID** (starts with `rzp_test_`)
   - **Key Secret**

### Step 2: Update Environment Variables
Open `backend/.env` and replace:
```env
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

With your actual keys:
```env
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_actual_secret_key
```

### Step 3: Restart Backend Server
```bash
cd backend
npm start
```

## 💳 How It Works

### Payment Flow:
1. **User selects items** and proceeds to checkout
2. **Enters shipping address**
3. **Selects payment method**:
   - **Razorpay** - Online payment (Cards, UPI, Wallets, NetBanking)
   - **Cash on Delivery** - Pay on delivery

4. **If Razorpay selected**:
   - Creates Razorpay order on backend
   - Opens Razorpay checkout modal
   - User completes payment
   - Payment verified on backend
   - Order saved to database
   - Redirects to success page

5. **If COD selected**:
   - Order saved directly to database
   - Redirects to success page

## 🎨 Features

### Razorpay Integration:
- ✅ Secure payment processing
- ✅ Multiple payment methods (Cards, UPI, Wallets, NetBanking)
- ✅ Payment signature verification
- ✅ Automatic order creation after successful payment
- ✅ Custom branding (Golden accent color)
- ✅ Pre-filled user details

### Cash on Delivery:
- ✅ Direct order placement
- ✅ No payment processing
- ✅ Marked as unpaid in database

## 🧪 Testing

### Test Mode Credentials (Razorpay):
- **Test Card**: 4111 1111 1111 1111
- **CVV**: Any 3 digits
- **Expiry**: Any future date
- **OTP**: 123456

### Test UPI:
- **UPI ID**: success@razorpay
- **PIN**: 1234

## 📝 Important Notes

1. **Test Mode**: Always use test keys during development
2. **Production**: Switch to live keys when deploying
3. **Webhook**: For production, set up Razorpay webhooks for payment status updates
4. **Security**: Never expose your Key Secret in frontend code

## 🚀 Going Live

When ready for production:
1. Get **Live Mode** API keys from Razorpay dashboard
2. Complete KYC verification
3. Update `.env` with live keys
4. Test thoroughly before launch
5. Set up webhooks for payment notifications

## 💡 Additional Features (Optional)

You can add:
- Email notifications after payment
- SMS notifications
- Payment receipts
- Refund functionality
- Subscription payments
- International payments

## 📞 Support

- Razorpay Docs: https://razorpay.com/docs/
- Razorpay Support: https://razorpay.com/support/

---

**Status**: ✅ Razorpay integration complete and ready to use!
