import Comment from "@/models/comment";
import { connectToDB } from "@/utils/database";

async function handler(req, res) {
  const eventId = req.query.eventId;

  if (req.method === "POST") {
    const { email, name, text } = req.body;

    // input validation
    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      return res.status(422).json({ message: "Invalid Input" });
    }

    try {
      await connectToDB();

      const newComment = await Comment.create({
        name,
        email,
        text,
        eventId,
      });

      return res
        .status(201)
        .json({ message: "added comment", comment: newComment });
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  }

  if (req.method === "GET") {
    // fetch comments for given eventId

    try {
      await connectToDB();
      const commentsByEventId = await Comment.find({ eventId: eventId })
        .select({
          __v: 0,
        })
        .sort({ _id: -1 });

      return res.status(200).json({
        message: "success",
        comments: commentsByEventId,
      });
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  }
}
export default handler;
