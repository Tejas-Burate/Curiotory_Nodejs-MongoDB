import mongoose from "mongoose";

const meetingSchema = new mongoose.Schema({
  users: {
    type: Array,
    ref: "User",
    required: true,
  },
  languageId: {
    type: mongoose.Schema.Types.ObjectId, // Assuming it's an ObjectID reference
    ref: "Language",
    required: true,
  },
  meetingTitle: {
    type: String,
    required: true,
  },
  meetingStartDate: {
    type: Date,
    required: true,
  },
  meetingEndDate: {
    type: Date,
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

const Meeting = mongoose.model("Meeting", meetingSchema);

export default Meeting;
