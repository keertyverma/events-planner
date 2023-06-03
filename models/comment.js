const { Schema, models, model } = require("mongoose");

const commentSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  text: {
    type: String,
    required: [true, "Text is required"],
  },
  eventId: {
    type: String,
    required: [true, "Event ID is required"],
  },
});

const Comment = models.Comment || model("Comment", commentSchema);

export default Comment;
