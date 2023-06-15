import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { authRouter, todoRouter } from "./routes/index.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config({});

const app = express();
app.use(helmet());
app.use(helmet());
app.use(
  cors({
    origin: "*",
  })
);
app.use(cookieParser());
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());
app.use(express.json({ limit: "1mb" }));

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/todo", todoRouter);

export default app;
