import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Hash passwords
    const adminPassword = await bcrypt.hash("tutu12345", 10);
    const userPassword = await bcrypt.hash("user123", 10);

    // Create or update Admin
    const admin = await User.findOneAndUpdate(
      { email: "admin@curepay.com" },
      {
        name: "Admin",
        email: "admin@curepay.com",
        password: adminPassword,
        role: "admin",
        wallet_balance: 10000,
      },
      { upsert: true, new: true }
    );

    // Update Omal’s wallet balance (give him money 💸)
    const omal = await User.findOneAndUpdate(
      { email: "omal@example.com" },
      { wallet_balance: 500 },
      { new: true }
    );

    console.log("✅ Admin user:", admin);
    console.log("✅ Updated Omal’s balance:", omal);
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding users:", err);
    process.exit(1);
  }
};

seedUsers();
