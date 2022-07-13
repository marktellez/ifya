import { jsonify } from "@/modules/db";
import Layout from "@/features/layout";

import { getLink } from "@/api/links/[_id]";

import Link from "@/features/link";

export default function GetIt(props) {
  return (
    <Layout>
      <Link {...props} />
    </Layout>
  );
}

export async function getServerSideProps(req) {
  const link = await getLink(req.query._id);

  return {
    props: {
      ...jsonify(link),
    },
  };
}
