import dbPromise from "@/modules/db";

export async function getLinks() {
  await (
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
    ])
    .toArray();
}
export default async function Links(req, res) {
  res.json({ links: getLinks() });
}
