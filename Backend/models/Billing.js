import mongoose from "mongoose";

const billingSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is required"],
      trim: true,
      minlength: [2, "First name must be at least 2 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required"],
      trim: true,
      minlength: [2, "Last name must be at least 2 characters"],
    },
    company: {
      type: String,
      trim: true,
      default: "",
    },
    country: {
      type: String,
      required: [true, "Country is required"],
      trim: true,
    },
    streetAddress: {
      type: String,
      required: [true, "Street Address is required"],
      trim: true,
    },
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },
    postcode: {
      type: String,
      required: [true, "Postcode/Zip is required"],
      trim: true,
      match: [/^\d{6}$/, "Please provide a valid 6-digit postcode"], // Change if global
    },
    state: {
      type: String,
      required: [true, "State is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email Address is required"],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      match: [/^\d{10}$/, "Please provide a valid 10-digit phone number"], // or use +91 regex
    },
  },
  { timestamps: true }
);

const Billing = mongoose.model("Billing", billingSchema);
export default Billing;
