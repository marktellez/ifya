import createHandler from "next-connect";
import { ObjectId } from "mongodb";
import dbPromise from "@/modules/db";

const handler = createHandler();
export default handler;

handler.get(async (req, res) => {
  const { _id } = req.query;
  const awards = await getAwards(_id);
  res.json({ awards });
});

handler.post(async (req, res) => {
  const { link, name, note, amount } = JSON.parse(req.body);

  const { insertedId } = await (
    await dbPromise
  )
    .db()
    .collection(`awards`)
    .insertOne({
      link: new ObjectId(link),
      name,
      note,
      amount,
    });

  res.json({ _id: insertedId });
});

export async function getAwards(_id) {
  return (
    await (
      await dbPromise
    )
      .db()
      .collection(`awards`)
      .aggregate([
        {
          $match: {
            link: ObjectId(_id),
          },
        },
        {
          $lookup: {
            localField: "link",
            from: "links",
            foreignField: "_id",
            as: "link",
          },
        },
        {
          $sort: { _id: -1 },
        },
      ])
      .toArray()
  ).map((award) => ({
    ...award,
    createdAt: ObjectId(award._id).getTimestamp(),
  }));
}
