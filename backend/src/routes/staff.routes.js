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
import { loginStatus } from "../controllers/guest.controller.js";

const staffRouter = Router();

staffRouter.route("/register").post(upload.single("avatar"), registerStaff);
staffRouter.route("/login").post(loginStaff);
staffRouter.route("/refresh-token").post(refreshAccessToken);
staffRouter.route("/auth-status").get(loginStatus);

// secured routes
staffRouter.route("/logout").patch(verifyJwt, logoutStaff);
staffRouter.route("/change-password").patch(verifyJwt, changeCurrentPassword);
staffRouter
  .route("/change-avatar")
  .patch(verifyJwt, upload.single("avatar"), changeAvatar);
staffRouter.route("/change-details").put(verifyJwt, changeDetails);

export default staffRouter;
