import express from "express";
import connectDb from "./config/db";
import dotenv from "dotenv";
import languageRoutes from "./routes/language";
import levelRoutes from "./routes/level";
import planRoutes from "./routes/plan";
import lessonRoutes from "./routes/lesson";
import videoRoutes from "./routes/video";
import questionRoutes from "./routes/question";
import moduleRoutes from "./routes/module";
import testRoutes from "./routes/test";
import meetingRoutes from "./routes/meeting";
import userRoutes from "./routes/user";
import roleRoutes from "./routes/role";
import liveTestRoutes from "./routes/liveTest";
import homeRouter from "./routes/home";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.static("public"));

app.use("/", languageRoutes);
app.use("/", levelRoutes);
app.use("/", planRoutes);
app.use("/", lessonRoutes);
app.use("/", videoRoutes);
app.use("/", questionRoutes);
app.use("/", moduleRoutes);
app.use("/", testRoutes);
app.use("/", meetingRoutes);
app.use("/", userRoutes);
app.use("/", roleRoutes);
app.use("/", liveTestRoutes);
app.use("/", homeRouter);

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
