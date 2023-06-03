const { Schema, models, model } = require("mongoose");

const newsLetterSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
});

const NewsLetter = models.NewsLetter || model("NewsLetter", newsLetterSchema);

export default NewsLetter;
