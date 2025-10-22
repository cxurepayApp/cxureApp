import mongoose from "mongoose";

const milestoneSchema = new mongoose.Schema(
  {
    transaction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction",
      required: true,
    },
    title: String,
    description: String,
    amount: Number,
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

export default mongoose.model("Milestone", milestoneSchema);
