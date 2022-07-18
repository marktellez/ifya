import createHandler from "next-connect";
import { ObjectId } from "mongodb";

import dbPromise from "@/modules/db";

const handler = createHandler();
export default handler;

handler.get(async (req, res) => {
  res.json({ creator: await getCreator(req.query._id) });
});

handler.put(async (req, res) => {
  const { _id, name, photo, www, company } = JSON.parse(req.body);
  const { upsertedId } = await (
    await dbPromise
  )
    .db()
    .collection(`creators`)
    .updateOne(
      { _id: ObjectId(req.query._id) },
      {
        $set: { name, photo, www, company },
      }
    );
  res.json({ _id: upsertedId });
});

export async function getCreator({ email }) {
  console.log("email", email);

  const creators = await (
    await dbPromise
  )
    .db()
    .collection("creators")
    .aggregate([
      {
        $match: { email },
      },
    ])
    .toArray();

  console.log("creators", creators);
  return {
    ...creators[0],
  };
}
