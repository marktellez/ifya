import { getSession } from "next-auth/react";

import Layout from "@/features/layout";

export default function Homepage({ session }) {
  console.dir({ session });
  return (
    <Layout>
      <div className=" rounded-xl p-4 mt-8">
        <p className="my-8 text-gray-700 text-2xl font-medium">
          Signups are closed while we are in beta.
        </p>

        <p className="text-gray-600 text-md font-medium">
          <em className="font-black text-xl">Ifya</em> is a simple tool that
          allows creators to share a link with their fans, and the fans can
          choose to support the artist with a payment, or get the link for free.
        </p>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(req) {
  const session = await getSession(req);
  console.dir({ session });

  return {
    props: {
      session,
    },
  };
}
