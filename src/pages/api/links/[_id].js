import { ObjectId } from "mongodb";
import dbPromise from "@/modules/db";

export async function getLink(_id) {
  console.dir(_id);
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

export default async function Links(req, res) {
  res.json({ link: await getLink(req.query._id) });
}
