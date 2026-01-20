import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";

const router = express.Router();

// Middleware for admin access (example, adjust to your auth system)
const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: "Access denied" });
  }
};

// Register User
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    // Exclude password from response
    const { password: pwd, ...userWithoutPassword } = newUser._doc;

    res.status(201).json({ message: "User registered successfully", user: userWithoutPassword });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering user" });
  }
});

// Get all users (Admin feature)
router.get("/", isAdmin, async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude passwords
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching users" });
  }
});

export default router;
