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
const mongoose_1 = __importDefault(require("mongoose"));
const connectDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield mongoose_1.default.connect("mongodb+srv://ioweb3:ioweb3123@serverlessinstance0.nad5ffl.mongodb.net/curiotory?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } // Cast to the appropriate type
        );
        console.log("Database Connected:", connection.connection.host, connection.connection.name);
    }
    catch (err) {
        console.error("Error connecting to the database:", err);
        process.exit(1);
    }
});
exports.default = connectDb;