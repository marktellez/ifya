import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import { jsonify } from "@/modules/db";
import useInterval from "@/hooks/use-interval";
import useSound from "use-sound";

import { getAwards } from "@/api/links/[_id]/awards";

import { parseMoney } from "@/modules/string";

export default function DonationStream({ awards }) {
  const [play] = useSound("/sounds/bravo.wav");
  const [_awards, setAwards] = useState(awards);
  const [lastAwardId, setLastAwardId] = useState(awards[0]?._id);

  async function refresh() {
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

  if (!awards[0]) return "";

  const { name, amount, note } = awards[0];
  return (
    <div className="px-4 h-screen w-screen bg-[#b2020c] text-white flex flex-col items-center justify-center">
      <h1 className="text-7xl font-black mb-16 drop-shadow-sm">My Heroes</h1>

      <div className="border-[8px] border-white p-4 w-full ">
        <div className="">
          <div className="font-black text-4xl text-[#f3ed22]">
            {parseMoney(amount)} was given!
          </div>
          <div className="font-black text-3xl">THANK YOU!</div>
        </div>
        <div className="text-xl font-medium text-[#f3ed22] mt-8">{name}</div>
        <div className="text-lg">{note}</div>
      </div>

      <div className="mt-16">
        <p className="text-lg font-medium">
          To support Mark&apos;s content creation efforts,{" "}
          <span className="underline">you can give</span> as little at $1!
        </p>
        <p className=" font-thin">
          And since Mark built the tool you can find in the description, he
          keeps almost 100% of it!
        </p>
      </div>
    </div>
  );
}

export async function getServerSideProps(req) {
  const session = await getSession(req);

  if (!session)
    return {
      redirect: {
        permanent: false,
        destination: "/api/auth/signin",
      },
    };
  const {
    params: { _id },
  } = req;

  return {
    props: {
      awards: jsonify(await getAwards(_id)),
    },
  };
}
