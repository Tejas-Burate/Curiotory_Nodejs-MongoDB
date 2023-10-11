"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const language_1 = __importDefault(require("./routes/language"));
const level_1 = __importDefault(require("./routes/level"));
const plan_1 = __importDefault(require("./routes/plan"));
const lesson_1 = __importDefault(require("./routes/lesson"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
app.use(express_1.default.json());
app.use(express_1.default.static("public"));
app.use("/", language_1.default);
app.use("/", level_1.default);
app.use("/", plan_1.default);
app.use("/", lesson_1.default);
// Connect to the database
(0, db_1.default)()
    .then(() => {
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
})
    .catch((err) => {
    console.error("Error connecting to the database:", err);
    process.exit(1);
});
