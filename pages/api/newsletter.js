function handler(req, res) {
  if (req.method === "POST") {
    const { email } = req.body;

    const newsletter = {
      id: new Date().toISOString(),
      email,
    };

    // TODO: store data
    return res.status(201).json({ message: "signed up!", newsletter });
  } else {
    res.status(200).json({ message: "success" });
  }
}

export default handler;
