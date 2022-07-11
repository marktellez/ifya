import dbPromise, { jsonify } from "@/modules/db";

export default function Homepage({ products }) {
  return (
    <main className="mt-16 container mx-auto">
      <h1>If Ya Like It, Show Some ❤️</h1>
      {products.map((product) => (
        <div>{product.title}</div>
      ))}
    </main>
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
