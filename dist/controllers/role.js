"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDropdownRoleList = void 0;
const role_1 = __importDefault(require("../models/role"));
const getDropdownRoleList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const role = yield role_1.default.find({ roleId: { $in: [0, 3] } }, { dateModified: 0, dateCreated: 0 });
        console.log("role", role);
        if (role.length === 0) {
            res
                .status(404)
                .json({ status: 404, error: "404", message: "Roles data not found" });
            return;
        }
        res.status(200).json(role);
    }
    catch (error) {
        console.log("error", error);
        res
            .status(500)
            .json({ status: 500, error: "500", message: "Internal Server Error" });
    }
});
exports.getDropdownRoleList = getDropdownRoleList;
