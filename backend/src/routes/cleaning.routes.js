import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
  cleaningTasks,
  getRoomsStatus,
  scheduleCleaning,
  updateStatus,
} from "../controllers/cleaning.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const cleaningRouter = Router();

cleaningRouter.route("/rooms-status").get(verifyJwt, getRoomsStatus);
cleaningRouter.route("/tasks").get(verifyJwt, cleaningTasks);
cleaningRouter
  .route("/schedule-task")
  .post(verifyJwt, upload.none(), scheduleCleaning);
cleaningRouter
  .route("/update/:cleaningId")
  .patch(verifyJwt, upload.none(), updateStatus);

export default cleaningRouter;
