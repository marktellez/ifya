import { useState, useEffect } from "react";

import { loadStripe } from "@stripe/stripe-js";

import { Elements } from "@stripe/react-stripe-js";

import Form from "./form";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function Payment({ amount, link, onCharge }) {
  const [clientSecret, setClientSecret] = useState(undefined);

  useEffect(() => {
    (async () => {
      const req = await fetch(`/api/payment-intents?amount=${amount}`);
      const json = await req.json();

      setClientSecret(json.client_secret);
    })();
  }, [amount]);

  return clientSecret ? (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
      }}>
      <Form {...{ amount, link, onCharge }} />
    </Elements>
  ) : (
    ""
  );
}
