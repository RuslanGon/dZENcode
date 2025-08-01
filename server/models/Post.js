import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  homepage: { type: String, required: false },
  captcha: { type: String, required: true },
  text: { type: String, required: true },
}, { timestamps: true });

const PostModel = mongoose.model("Post", postSchema);

export default PostModel;
