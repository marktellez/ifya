import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import { jsonify } from "@/modules/db";
import useInterval from "@/hooks/use-interval";
import useSound from "use-sound";

import { getAwards } from "@/api/links/[_id]/awards";

import HeartIcon from "@/ui/icons/heart";
import { parseMoney } from "@/modules/string";

export default function DonationStream({ awards }) {
  const [play] = useSound("/sounds/bravo.wav");
  const [_awards, setAwards] = useState(awards);
  const [lastAwardId, setLastAwardId] = useState(awards[0]?._id);

  async function refresh() {
    if (!awards[0]) return;
    const res = await fetch(`/api/links/${awards[0].link[0]._id}/awards`);
    const json = await res.json();
    setAwards(json.awards);
  }

  useInterval(refresh, 5000);

  useEffect(() => {
    if (!awards[0]) return;
    if (lastAwardId === _awards[0]._id) return;
    play();
    setLastAwardId(_awards[0]._id);
  }, [_awards]);

  return (
    <div className="px-4 h-screen w-screen bg-white text-black flex flex-col items-center justify-center">
      <div className="mx-auto relative w-[260px] flex items-center justify-center ">
        <div>
          <div className="z-40 absolute left-0 top-[40px] md:top-[70px] text-3xl font-medium tracking-wide drop-shadow-sm">
            If ya like it...
          </div>
          <div className="absolute right-0 top-[70px] md:top-[100px] z-50  text-4xl font-bold drop-shadow-sm">
            Show some
          </div>
        </div>

        <HeartIcon className="transform -mt-8 md:mt-0 -rotate-6 text-red-500  h-[220px] w-[220px] drop-shadow-lg" />
      </div>

      <div className="border-[8px] border-white p-4 w-full text-center">
        {awards[0] ? (
          <>
            <div className="">
              <div className="font-black text-4xl text-blue-500">
                {parseMoney(awards[0].amount)} was given!
              </div>
              <div className="font-black text-3xl">THANK YOU!</div>
            </div>
            <div className="text-xl font-medium text-blue-500 mt-8">
              {awards[0].name}
            </div>
            <div className="text-lg">{awards[0].note}</div>
          </>
        ) : (
          <div>The tipjar is empty!</div>
        )}
      </div>

      <div className="mt-16">
        <p className="text-lg font-medium">
          To support Mark&apos;s content creation efforts,{" "}
          <span className="underline">you can give</span> as little at $1!
        </p>
        <p>The link is ⬇ in the description</p>
        <p className=" font-thin">
          And since Mark built the tool he keeps almost 100% of it!
        </p>
      </div>
    </div>
  );
}

export async function getServerSideProps(req) {
  const session = await getSession(req);

  const {
    params: { _id },
  } = req;

  return {
    props: {
      awards: jsonify(await getAwards(_id)),
    },
  };
}
