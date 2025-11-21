import React, { useEffect, useState } from "react";
import { detectCountry, getPricingByCountry, startSubscription } from "./SubscriptionHelper";

function SubscriptionPage() {
  const [country, setCountry] = useState("India");
  const [pricing, setPricing] = useState(getPricingByCountry("India"));

  useEffect(() => {
    async function loadCountry() {
      const detected = await detectCountry();
      setCountry(detected);
      setPricing(getPricingByCountry(detected));
    }
    loadCountry();
  }, []);

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Subscribe to DomGenie</h1>
      <p>
        Country: <strong>{country}</strong>
      </p>
      <p>
        Price: <strong>{pricing.price} {pricing.currency}</strong> / month
      </p>
      <button
        style={{ padding: "10px 20px", fontSize: "16px" }}
        onClick={() => startSubscription(pricing.currency)}
      >
        Get Plan
      </button>
    </div>
  );
}

export default SubscriptionPage;
