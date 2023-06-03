import NewsLetter from "@/models/newsletter";
import { connectToDB } from "@/utils/database";

async function handler(req, res) {
  if (req.method === "POST") {
    const { email } = req.body;

    if (!email || !email.includes("@")) {
      return res.status(422).json({ message: "Invalid email address" });
    }

    try {
      // store data in db
      await connectToDB();

      // check if email already exists
      let newsletter = await NewsLetter.findOne({ email });
      if (newsletter) {
        return res.status(400).json({ message: "Email already registered!" });
      }

      newsletter = await NewsLetter.create({
        email,
      });

      return res.status(201).json({ message: "signed up!", newsletter });
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  } else {
    return res.status(200).json({ message: "success" });
  }
}

export default handler;
