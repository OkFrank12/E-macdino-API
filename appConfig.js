import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import express from "express";
import mailRouter from "./router.js";

export const appConfig = (app) => {
  app.use(cors()).use(express.json()).use(helmet()).use(morgan("dev"));
  app.set("view engine", "ejs");

  app.use("/api", mailRouter);

  app.get("/", (req, res) => {
    try {
      return res.status(200).json({
        message: "You are welcome to E-Macdino App",
      });
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  });
};
