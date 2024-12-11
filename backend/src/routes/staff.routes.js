import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js"
import { changeCurrentPassword, loginStaff, logoutStaff, refreshAccessToken, registerStaff } from "../controllers/staff.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const staffRouter = Router();

staffRouter.route("/register").post(upload.single("avatar"), registerStaff);
staffRouter.route("/login").post(loginStaff);
staffRouter.route("/refresh-token").post(refreshAccessToken);

// secured routes
staffRouter.route("/logout").post(verifyJwt,logoutStaff);
staffRouter.route("/change-password").post(verifyJwt, changeCurrentPassword);

export default staffRouter;
