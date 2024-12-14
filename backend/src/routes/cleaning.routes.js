import { Router } from "express"
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { getRoomsStatus, markAsCompleted, scheduleCleaning } from "../controllers/cleaning.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const cleaningRouter = Router();

cleaningRouter.route("/rooms").get(verifyJwt, getRoomsStatus);
cleaningRouter.route("/schedule-task").post(verifyJwt, upload.none(), scheduleCleaning);
cleaningRouter.route("/mark-completed").post(verifyJwt, upload.none(),  markAsCompleted)

export default cleaningRouter;