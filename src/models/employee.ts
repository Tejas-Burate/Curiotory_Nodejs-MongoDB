import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  empId: {
    type: Number,
    required: true,
    unique: true,
  },
  empName: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
});

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;
