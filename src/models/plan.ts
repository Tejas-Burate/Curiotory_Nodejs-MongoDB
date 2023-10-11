import mongoose from "mongoose";

// Define the Plan Schema
const planSchema = new mongoose.Schema({
  planName: {
    type: String,
    required: true,
  },

  languageId: {
    type: mongoose.Schema.Types.ObjectId, // Assuming it's an ObjectID reference
    ref: "Language",
    required: true,
  },
  levels: {
    type: Object,
    required: true,
  },
  planSubtitle: {
    type: String,
    required: true,
  },
  planPrice: {
    type: Number,
    required: true,
  },
  planDuration: {
    type: Number,
    required: true,
  },
  planDesc: {
    type: Object, // Assuming JSON data will be stored as an object
    required: true,
  },
  status: {
    type: String,
    enum: ["Active", "Deactive"],
    required: true,
  },
  isLivePlan: {
    type: Number,
    required: true,
  },
  dateCreated: {
    type: Date,
    required: true,
  },
  dateModified: {
    type: Date,
    required: true,
  },
});

// Create a Mongoose model based on the schema
const Plan = mongoose.model("Plan", planSchema);

export default Plan;
