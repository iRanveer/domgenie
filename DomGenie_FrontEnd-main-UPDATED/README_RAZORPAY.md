# DomGenie Frontend (Updated with Razorpay + Country Pricing)

## Setup

1. Install dependencies (if not already):
   ```bash
   npm install
   ```

2. Create `.env` file in the root:
   ```env
   REACT_APP_RAZORPAY_KEY_ID=your_key_here
   ```

3. The frontend now includes:
   - `SubscriptionHelper.js` (handles country detection, pricing, and Razorpay checkout)
   - `SubscriptionPage.js` (sample page to show pricing and trigger subscription)

4. Run the project:
   ```bash
   npm start
   ```

When a user visits the subscription page:
- Their country is auto-detected
- Price is shown in USD, CAD, or INR
- Clicking **Get Plan** calls the backend and opens Razorpay checkout
