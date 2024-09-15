import { Router } from "express";
import { mailController } from "./controller/mailController.js";

const mailRouter = Router();

mailRouter.route("/order").post(mailController);

export default mailRouter;
