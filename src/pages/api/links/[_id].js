import createHandler from "next-connect";
import { ObjectId } from "mongodb";
import dbPromise from "@/modules/db";

const handler = createHandler();
export default handler;

handler.get(async (req, res) => {
  res.json({ link: await getLink(req.query._id) });
});

handler.put(async (req, res) => {
  const { creator, url, text } = JSON.parse(req.body);
  const { upsertedId } = await (
    await dbPromise
  )
    .db()
    .collection(`links`)
    .updateOne(
      { _id: ObjectId(req.query._id) },
      {
        $set: {
          creator: new ObjectId(creator),
          url,
          text,
        },
      }
    );
  res.json({ _id: upsertedId });
});

export async function getLink(_id) {
  const links = await (
    await dbPromise
  )
    .db()
    .collection(`links`)
    .aggregate([
      {
        $match: { _id: new ObjectId(_id) },
      },
      {
        $lookup: {
          localField: "creator",
          from: "creators",
          foreignField: "_id",
          as: "creator",
        },
      },
    ])
    .toArray();

  return {
    ...links[0],
    creator: {
      ...links[0].creator[0],
    },
  };
}
