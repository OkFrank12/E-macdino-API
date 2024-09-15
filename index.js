import express from "express";
import dotenv from "dotenv";
import { appConfig } from "./appConfig.js";
dotenv.config();

const port = 1234;
const app = express();
appConfig(app);

const server = app.listen(process.env.PORT || port, () => {
  console.log("Server is live");
});

process.on("uncaughtException", (error) => {
  console.error("uncaught-exception", error.message);
});

process.on("unhandledRejection", (reason) => {
  console.error("unhandled-rejection", reason.message);
  server.close(() => {
    process.exit(1);
  });
});
