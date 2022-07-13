import { useState, useEffect } from "react";

import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import Button from "@/ui/buttons";

export default function PaymentForm({ amount, onCharge = () => {} }) {
  const [paymentElement, setPaymentElement] = useState(undefined);
  const [loaded, setLoaded] = useState(false);
  const [busy, setBusy] = useState(false);

  const [ready, setReady] = useState(false);
  const elements = useElements();
  const stripe = useStripe();

  async function charge() {
    setBusy(true);
    const { error } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });
    onCharge(error);
  }

  useEffect(() => {
    if (!elements) return;
    setPaymentElement(elements.getElement(PaymentElement));
  }, [elements]);

  useEffect(() => {
    if (!paymentElement) return;
    paymentElement.on("change", (e) => {
      setReady(e.complete);
    });
    paymentElement.on("ready", () => {
      setLoaded(true);
    });
  }, [paymentElement]);

  return (
    <>
      <PaymentElement />
      <div className="my-4">
        <Button onClick={charge} disabled={busy || !ready}>
          Support this creator with ${amount}
        </Button>
      </div>
    </>
  );
}
