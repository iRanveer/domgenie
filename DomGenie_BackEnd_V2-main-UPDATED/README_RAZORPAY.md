# DomGenie Backend (Updated with Razorpay Subscription API)

## Setup

1. Install dependencies:
   ```bash
   npm install razorpay dotenv
   ```

2. Create a `.env` file in the root directory with:
   ```env
   RAZORPAY_KEY_ID=your_key_here
   RAZORPAY_KEY_SECRET=your_secret_here
   ```

3. In your main server file (`server.js` or `app.js`), add:
   ```js
   const subscriptionRoutes = require("./routes/subscription");
   app.use("/api", subscriptionRoutes);
   ```

4. Start your backend server:
   ```bash
   npm start
   ```

## API Endpoint

**POST** `/api/create-subscription`

Body:
```json
{ "currency": "USD" }
```

Supported currencies: `USD`, `CAD`, `INR`
