import { ObjectId } from "mongodb";

import dbPromise from "@/modules/db";

export async function getLinks(creator) {
  const links = await (
    await dbPromise
  )
    .db()
    .collection(`links`)
    .aggregate([
      {
        $match: { creator: new ObjectId(creator._id) },
      },
    ])
    .toArray();

  return links;
}
