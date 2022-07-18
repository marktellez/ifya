import createHandler from "next-connect";
import { ObjectId } from "mongodb";

import dbPromise from "@/modules/db";

const handler = createHandler();
export default handler;

handler.post(async (req, res) => {
  const { _id, name, photo, www, company, email } = JSON.parse(req.body);

  const { insertedId } = await (await dbPromise)
    .db()
    .collection(`creators`)
    .insertOne({ name, photo, www, company, email });
  res.json({ _id: insertedId });
});
