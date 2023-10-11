"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const employeeSchema = new mongoose_1.default.Schema({
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
const Employee = mongoose_1.default.model("Employee", employeeSchema);
exports.default = Employee;
