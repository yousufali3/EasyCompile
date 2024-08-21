import mongoose from "mongoose";

// Define the schema
const CodeSchema = new mongoose.Schema(
  {
    fullCode: {
      html: { type: String, required: true },
      css: { type: String, required: true },
      javascript: { type: String, required: true },
    },
    title: { type: String, required: true },
    ownerInfo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    ownerName: { type: String, required: true },
  },
  { timestamps: true }
);

// Create and export the model
const Code = mongoose.model("Code", CodeSchema);
export default Code;
