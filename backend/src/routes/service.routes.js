import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { addService, getServices } from "../controllers/service.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const serviceRouter = Router();

serviceRouter.route("/get-services").get(verifyJwt, getServices);
serviceRouter.route("/add").post(verifyJwt, upload.none(), addService);

export default serviceRouter;
