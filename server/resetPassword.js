import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const resetPassword = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    const newPassword = await bcrypt.hash("user123", 10);

    const user = await User.findOneAndUpdate(
      { email: "omal@example.com" },
      { password: newPassword },
      { new: true }
    );

    if (!user) {
      console.log("❌ User not found");
    } else {
      console.log("✅ Password reset successful for:", user.email);
    }

    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
};

resetPassword();
