// SubscriptionHelper.js

// Function to detect country using ipapi.co (free API)
export async function detectCountry() {
  try {
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();
    return data.country_name;
  } catch (err) {
    console.error("Country detection failed:", err);
    return "India"; // default fallback
  }
}

// Map country -> currency & price
export function getPricingByCountry(country) {
  const mapping = {
    USA: { currency: "USD", price: 20 },
    Canada: { currency: "CAD", price: 25 },
    India: { currency: "INR", price: 999 },
  };
  return mapping[country] || mapping["India"];
}

// Function to start subscription checkout
export async function startSubscription(currency) {
  try {
    const response = await fetch("/api/create-subscription", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currency }),
    });

    const data = await response.json();
    if (!data.id) throw new Error("No subscription id returned");

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID || "rzp_test_xxxx",
      subscription_id: data.id,
      name: "DomGenie Subscription",
      description: "Recurring Plan",
      handler: function (response) {
        alert("Payment successful: " + response.razorpay_payment_id);
      },
      theme: { color: "#3399cc" },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (error) {
    console.error("Subscription error:", error);
    alert("Error creating subscription");
  }
}
