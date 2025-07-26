import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    lowercase: true,
  },
  image: {
    type: String, // URL or file path
    default: "",
  },
});

export default mongoose.model("Category", categorySchema);
