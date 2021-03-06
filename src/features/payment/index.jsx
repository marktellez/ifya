import { useEffect, useState } from "react";

import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import Button from "@/ui/buttons";

export default function Pay({ onCharge = () => {}, total }) {
  const [paymentElement, setPaymentElement] = useState(undefined);
  const [busy, setBusy] = useState(false);
  const [ready, setReady] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const elements = useElements();
  const stripe = useStripe();

  useEffect(() => {
    if (!elements) return;
    setPaymentElement(elements.getElement(PaymentElement));
  }, [elements]);

  useEffect(() => {
    if (!paymentElement) return;
    paymentElement.on("change", (e) => setReady(e.complete));
    paymentElement.on("ready", () => setLoaded(true));
  }, [paymentElement]);

  async function charge() {
    setBusy(true);
    const { error } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });
    onCharge(error);
  }

  return (
    <>
      <PaymentElement />
      {loaded ? (
        <div className="my-4">
          <Button onClick={charge} disabled={busy || !ready}>
            Support this creator with ${total}
          </Button>
        </div>
      ) : (
        <div className="w-full flex justify-center">
          <svg
            className=" text-blue-500 animate-spin  h-16 w-16 "
            fill="none"
            viewBox="0 0 24 24">
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      )}
    </>
  );
}
