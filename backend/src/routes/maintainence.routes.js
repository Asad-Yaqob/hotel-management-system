import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
  allMaintainenRequests,
  requestForMaintainence,
  updateStatus,
} from "../controllers/maintainence.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const maintainenceRouter = Router();

maintainenceRouter.route("/requests").get(verifyJwt, allMaintainenRequests);
maintainenceRouter.route("/add").post(verifyJwt, upload.none(), requestForMaintainence);
maintainenceRouter.route("/update/:maintainenceId").patch(verifyJwt, upload.none(), updateStatus);

export default maintainenceRouter;
