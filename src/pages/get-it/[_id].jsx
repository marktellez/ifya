import Image from "next/image";
import { useEffect, useState } from "react";
import { ObjectId } from "mongodb";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import dbPromise, { jsonify } from "@/modules/db";

import Pay from "@/features/payment";

import MoneyField from "@/ui/forms/money-field";
import BuyButton from "@/ui/buttons/buy";
import HeartIcon from "@/ui/icons/heart";

export default function GetIt({ creator, product, paymentIntent }) {
  const [amount, setAmount] = useState("1");
  const [paying, setPaying] = useState(false);
  const [clientSecret, setClientSecret] = useState(undefined);
  const [showLink, setShowLink] = useState(false);

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );

  useEffect(async () => {
    if (!paying) return;
    const req = await fetch(`/api/payment-intents?amount=${amount}`);
    const json = await req.json();

    setClientSecret(json.client_secret);
  }, [clientSecret, paying]);

  return (
    <main className="container mx-auto">
      <div>
        <div className="mt-8 italic text-2xl text-blue-500 font-medium">
          If ya like it...
        </div>

        <h1 className="-my-14 ml-3 flex items-center text-5xl font-black">
          Show some
          <HeartIcon className="transform -rotate-6 text-red-500 -mx-4 h-48 w-48" />
          to {creator.name}!
        </h1>
      </div>

      <section className="px-8 mt-24">
        <h2 className="mb-6 text-2xl font-medium tracking-tight text-gray-700">
          {product.title}
        </h2>

        <div className="p-6 mb-8 bg-gray-50 rounded-md">
          <h3 className="max-w-2xl text-sm text-gray-500">
            Note from the creator:
          </h3>

          {product.description.split("\r").map((line) => (
            <p className="font-thin md:text-xl ">{line}</p>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4  rounded border-gray-300 p-8">
        {paying ? (
          clientSecret && (
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret,
              }}>
              <Pay total={amount} onCharge={() => setShowLink(true)} />
            </Elements>
          )
        ) : showLink ? (
          <div className="border p-4 bg-blue-600">
            <h2 className="font-semibold text-3xl my-2 text-white">
              Here is what you came for!
            </h2>
            <div>
              <a className=" text-white" href={product.downloadUrl}>
                {product.downloadUrl}
              </a>
            </div>
          </div>
        ) : (
          <div>
            <div className="italic text-gray-500 font-bold text-sm">
              This is awesome!
            </div>
            <div className="flex items-center gap-4">
              <div className="text-2xl text-gray-700 drop font-semibold">
                I want to give {creator.name}{" "}
              </div>
              <MoneyField
                value={amount}
                onChange={(amount) => setAmount(amount)}
              />
              <BuyButton
                disabled={isNaN(parseInt(amount))}
                onClick={() => {
                  setShowLink(parseInt(amount) === 0);
                  setPaying(parseInt(amount) > 0);
                }}>
                {amount > 0
                  ? `Support my work with $${amount}`
                  : "Just gimmie the stuff, I'm broke"}
              </BuyButton>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

export async function getServerSideProps(req) {
  const products = await (
    await dbPromise
  )
    .db()
    .collection(`products`)
    .aggregate([
      {
        $match: { _id: new ObjectId(req.query._id) },
      },
      {
        $lookup: {
          localField: "account",
          from: "accounts",
          foreignField: "_id",
          as: "account",
        },
      },
    ])
    .toArray();

  return {
    props: {
      product: jsonify(products[0]),
      creator: jsonify(products[0].account[0]),
    },
  };
}
