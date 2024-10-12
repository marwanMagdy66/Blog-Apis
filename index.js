import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./DB/connection.js";
import authRouter from "./src/modules/auth/auth.router.js";
import postRouter from "./src/modules/post/post.router.js";
import interactionRouter from "./src/modules/interaction/interaction.router.js";
import cors from "cors";

dotenv.config();
const port = process.env.PORT;
const app = express();

//cors
app.use(cors());

//parsing
app.use(express.json());

//connect DB
await connectDB();

//router
app.use("/auth", authRouter);
app.use("/post", postRouter);
app.use("/interaction", interactionRouter);

//page not found handler
app.use("*", (req, res, next) => {
  return next(new Error("Page not found", { cause: 404 }));
});

//global error handler
app.use((err, req, res, next) => {
  const statusCode = err.cause ? err.cause : 500;
  res.status(statusCode).json({
    success: false,
    message: err.message,
    stack: err.stack,
  });
});

app.listen(port, console.log(`app lisen on port ${port}`));
