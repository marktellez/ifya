import { useState, useEffect } from "react";

import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import Button from "@/ui/buttons";
import TextField from "@/ui/forms/text-field";

export default function PaymentForm({ amount, link, onCharge = () => {} }) {
  const [paymentElement, setPaymentElement] = useState(undefined);
  const [loaded, setLoaded] = useState(false);
  const [busy, setBusy] = useState(false);

  const [values, setValues] = useState({
    name: "",
    note: "",
  });

  const [ready, setReady] = useState(false);
  const elements = useElements();
  const stripe = useStripe();

  async function charge() {
    setBusy(true);

    const { error } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (!error) {
      const req = await fetch(`/api/links/${link}/awards`, {
        method: "POST",
        body: JSON.stringify({
          name: values.name,
          note: values.note,
          amount,
          link,
        }),
      });
      const json = await req.json();
      console.dir(json);
    }

    onCharge(error);
  }

  useEffect(() => {
    if (!elements) return;
    setPaymentElement(elements.getElement(PaymentElement));
  }, [elements]);

  useEffect(() => {
    if (!paymentElement) return;

    paymentElement.on("change", (e) => setReady(e.complete));
    paymentElement.on("ready", () => setLoaded(true));
  }, [paymentElement]);

  return (
    <>
      <div className="flex flex-col gap-4 border-b border-t border-blue-500 py-8 my-8">
        <p className="font-thin text-sm">
          <span className="font-medium underline pr-2">note:</span>
          The name and note field can be used to thank you during livestreams,
          so if you would like to see your name and a thank you note, please
          leave it here, and please don't post anything obscene....
        </p>
        <TextField
          label="Your name"
          value={values.name}
          onChange={(name) =>
            setValues((prev) => ({
              ...prev,
              name,
            }))
          }
        />

        <TextField
          label="Want to leave a note?"
          multiline
          value={values.note}
          onChange={(note) =>
            setValues((prev) => ({
              ...prev,
              note,
            }))
          }
        />
      </div>
      <PaymentElement />
      <div className="my-8">
        <Button onClick={charge} disabled={busy || !ready}>
          Support this creator with ${amount}
        </Button>
      </div>
    </>
  );
}
