"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
// Create a Mongoose schema for the Role
const roleSchema = new mongoose.Schema({
    roleId: {
        type: Number,
        required: true,
        unique: true, // Ensure roleId is unique
    },
    roleName: {
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
const Role = mongoose.model("Role", roleSchema);
exports.default = Role;
