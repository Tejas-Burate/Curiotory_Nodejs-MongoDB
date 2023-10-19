const mongoose = require("mongoose");

// Create a Mongoose schema for the Role
const teacherDetailsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Assuming it's an ObjectID reference
    ref: "User",
    required: true,
  },
  proficiency: {
    type: String,
    required: true,
  },
  trainedAt: {
    type: String,
    required: true,
  },
  certification: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    required: false,
  },
  dateModified: {
    type: Date,
    required: false,
  },
});

// Create a Mongoose model for the Role using the schema
const TeacherDetails = mongoose.model("TeacherDetails", teacherDetailsSchema);

export default TeacherDetails;
