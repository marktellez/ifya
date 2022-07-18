import { getSession } from "next-auth/react";
import { jsonify } from "@/modules/db";
import Layout from "@/features/layout";

import { getCreator } from "@/api/creators/[_id]";
import { getLinks } from "@/api/creators/[_id]/links";

import CreatorAdmin from "@/features/creator/admin";

export default function Creator({ creator, links }) {
  return (
    <Layout>
      <CreatorAdmin {...{ creator, links }} />
    </Layout>
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

  const creator = await getCreator(session);
  const links = await getLinks(creator);

  console.log("links", links);
  console.log("session", session);
  return {
    props: {
      creator: jsonify(creator),
      links: jsonify(links),
    },
  };
}
