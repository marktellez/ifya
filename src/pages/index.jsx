import dbPromise, { jsonify } from "@/modules/db";
import Layout from "@/features/layout/homepage";

export default function Homepage({ products }) {
  return (
    <Layout>
      <div className=" bg-blue-600 rounded-xl p-4 opacity-90 ">
        <p className="my-2 text-xl text-white prose prose-invert ">
          Signups are closed while we are in beta.
        </p>

        <p className="text-white prose prose-invert">
          <em className="font-black text-xl">Ifya</em> is a simple tool that
          allows creators to share a link with their fans, and the fans can
          choose to support the artist with a payment, or get the link for free.
        </p>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(req) {
  const products = await (await dbPromise)
    .db()
    .collection(`products`)
    .find({})
    .toArray();

  return {
    props: {
      products: jsonify(products),
    },
  };
}
