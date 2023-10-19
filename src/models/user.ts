import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  roleId: {
    type: mongoose.Schema.Types.ObjectId, // Assuming it's an ObjectID reference
    ref: "Role",
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  otp: {
    type: Number,
    required: true,
  },
  languageId: {
    type: mongoose.Schema.Types.ObjectId, // Assuming it's an ObjectID reference
    ref: "Language",
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["Staged", "Provisioned", "Active", "Recovery"],
    required: true,
  },
  profileImage: {
    type: String,
    required: true,
  },
  deviceRegistrationToken: {
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

const User = mongoose.model("User", userSchema);

export default User;
