import createHandler from "next-connect";
import { ObjectId } from "mongodb";
import dbPromise from "@/modules/db";

const handler = createHandler();
export default handler;

handler.get(async (req, res) => {
  const links = await getLinks();
  res.json({ links });
});

handler.post(async (req, res) => {
  const { url, text, creator } = JSON.parse(req.body);

  const { insertedId } = await (
    await dbPromise
  )
    .db()
    .collection(`links`)
    .insertOne({
      creator: new ObjectId(creator),
      url,
      text,
    });

  res.setHeader("Access-Control-Allow-Origin", "*"); // lock this down later
  res.json({ _id: insertedId });
});

export async function getLinks() {
  return await (
    await dbPromise
  )
    .db()
    .collection(`links`)
    .aggregate([
      {
        $lookup: {
          localField: "creator",
          from: "creators",
          foreignField: "_id",
          as: "creator",
        },
      },
      {
        $addField: {
          createdAt: { $toDate: "$_id" },
        },
      },
    ])
    .toArray();
}
