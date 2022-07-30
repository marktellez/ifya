import { useState } from "react";

import CreatorProfile from "@/features/creator/profile";

import Amount from "./amount";
import Payment from "./payment";
import Link from "./link";

export default function GetLink({
  _id,
  url,
  text,
  creator,
  creator: { name, photo, company, www },
}) {
  const [amount, setAmount] = useState("1");
  const [step, setStep] = useState("amount");
  const [paid, setPaid] = useState(false);

  function getStep() {
    switch (step) {
      case "amount":
        return (
          <Amount
            {...{
              amount,
              onChange: setAmount,
              onNext: () => (amount > 0 ? setStep("payment") : setStep("link")),
            }}
          />
        );
      case "payment":
        return (
          <Payment
            {...{
              amount,
              link: _id,
              onCharge: () => {
                setPaid(true);
                setStep("link");
              },
            }}
          />
        );
      case "link":
        return <Link {...{ url, paid }} />;
    }
  }

  return (
    <div className="md:flex gap-4 my-16">
      <div className="md:w-1/3 ">
        <CreatorProfile {...creator} />
      </div>

      <div className="md:w-2/3 mt-6">
        <div className="my-8">
          <h2 className="my-2 text-lg text-blue-500 font-medium">
            What is this?
          </h2>

          <div className="my-2 font-thin">
            {text?.split("\r").map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </div>

        <div className="my-8">{getStep()}</div>
      </div>
    </div>
  );
}
