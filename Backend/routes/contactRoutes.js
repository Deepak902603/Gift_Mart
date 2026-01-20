import express from "express";
import Contact from "../models/Contact.js";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Save to DB
    const newMessage = new Contact({ name, email, subject, message });
    await newMessage.save();

    // Setup transporter
    const transporter = nodemailer.createTransport({
      service: "gmail", // or use host: "smtp.gmail.com"
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // App Password required
      },
    });

    // Send mail
    await transporter.sendMail({
      from: process.env.EMAIL_USER, // must match authenticated email
      replyTo: email, // user's email goes here
      to: process.env.EMAIL_USER,
      subject: `📩 New Contact: ${subject}`,
      text: `From: ${name} (${email})\n\n${message}`,
    });

    res.status(200).json({ success: true, message: "Message saved & email sent ✅" });
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({ success: false, message: "Error saving/sending message", error });
  }
});

export default router;
