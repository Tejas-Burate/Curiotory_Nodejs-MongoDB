import express from "express";
import connectDb from "./config/db";
import dotenv from "dotenv";
import languageRoutes from "./routes/language";
import levelRoutes from "./routes/level";
import planRoutes from "./routes/plan";
import lessonRoutes from "./routes/lesson";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.static("public"));

app.use("/", languageRoutes);
app.use("/", levelRoutes);
app.use("/", planRoutes);
app.use("/", lessonRoutes);

// Connect to the database
connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
    process.exit(1);
  });
