import { useState } from "react";

import MoneyField from "@/ui/forms/money-field";
import BuyButton from "@/ui/buttons/buy";
import HeartIcon from "@/ui/icons/heart";
import BrokenHeartIcon from "@/ui/icons/broken-heart";
export default function Amount({
  amount,
  onChange = () => {},
  onNext = () => {},
}) {
  return (
    <>
      <h2 className="my-2 text-lg text-blue-500 font-medium">
        Yes, I want it!
      </h2>

      <div className="flex items-center gap-4">
        <div className="w-[100px]">
          <MoneyField value={amount} onChange={onChange} />
        </div>
        {parseInt(amount) > 0 && (
          <p className="font-thin">And I want to support this creator!</p>
        )}
      </div>
      <div className="my-8 ml-32">
        <BuyButton disabled={isNaN(parseInt(amount))} onClick={() => onNext()}>
          {amount > 0 ? (
            <div className="flex items-center gap-2">
              <HeartIcon className="transform -rotate-6 w-12 text-red-500" />
              <div className="font-black text-2xl">Give ${amount} now</div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <BrokenHeartIcon className="transform -rotate-6 w-12 text-red-500" />
              <div className="font-black text-2xl">I'm broke</div>
            </div>
          )}
        </BuyButton>
        <p className="font-thin italic text-sm my-2">
          You will receive your link after this step.
        </p>
      </div>
    </>
  );
}
