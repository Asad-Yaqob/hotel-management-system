import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
  changeAvatar,
  changeCurrentPassword,
  changeDetails,
  loginStaff,
  logoutStaff,
  refreshAccessToken,
  registerStaff,
} from "../controllers/staff.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const staffRouter = Router();

staffRouter.route("/register").post(upload.single("avatar"), registerStaff);
staffRouter.route("/login").post(loginStaff);
staffRouter.route("/refresh-token").post(refreshAccessToken);

// secured routes
staffRouter.route("/logout").post(verifyJwt, logoutStaff);
staffRouter.route("/change-password").post(verifyJwt, changeCurrentPassword);
staffRouter
  .route("/change-avatar")
  .post(verifyJwt, upload.single("avatar"), changeAvatar);
staffRouter.route("/change-details").post(verifyJwt, changeDetails);

export default staffRouter;
