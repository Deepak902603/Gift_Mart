import express from "express";
import Billing from "../models/Billing.js";

const router = express.Router();

// Save billing details
router.post("/", async (req, res) => {
  try {
    const billing = new Billing(req.body);
    await billing.save();
    res.status(201).json({ message: "Billing details saved", billing });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Error saving billing details", error });
  }
});

// Get all billing records
router.get("/", async (req, res) => {
  try {
    const billings = await Billing.find();
    res.json(billings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching billing records", error });
  }
});

// Get billing by ID
router.get("/:id", async (req, res) => {
  try {
    const billing = await Billing.findById(req.params.id);
    if (!billing) {
      return res.status(404).json({ message: "Billing record not found" });
    }
    res.json(billing);
  } catch (error) {
    res.status(500).json({ message: "Error fetching billing record", error });
  }
});

// Update billing by ID
router.put("/:id", async (req, res) => {
  try {
    const billing = await Billing.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!billing) {
      return res.status(404).json({ message: "Billing record not found" });
    }
    res.json({ message: "Billing updated successfully", billing });
  } catch (error) {
    res.status(500).json({ message: "Error updating billing record", error });
  }
});

// Delete billing by ID
router.delete("/:id", async (req, res) => {
  try {
    const billing = await Billing.findByIdAndDelete(req.params.id);
    if (!billing) {
      return res.status(404).json({ message: "Billing record not found" });
    }
    res.json({ message: "Billing deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting billing record", error });
  }
});

export default router;
