function handler(req, res) {
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

    const newComment = {
      _id: new Date().toISOString(),
      eventId,
      email,
      name,
      text,
    };

    return res
      .status(201)
      .json({ message: "added comment", comment: newComment });
  }

  if (req.method === "GET") {
    // fetch comments for given eventId
    return res.status(200).json({
      message: "success",
      comments: [
        {
          _id: "2023-06-03T03:41:50.864Z",
          eventId: "e2",
          email: "test@test.com",
          name: "kv",
          text: "newdafd",
        },
        {
          _id: "2023-06-03T03:41:50.864sasZ",
          eventId: "e2",
          email: "test2@test.com",
          name: "sumo",
          text: "dasdadasd",
        },
      ],
    });
  }
}
export default handler;
