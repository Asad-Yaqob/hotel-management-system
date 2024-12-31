import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
  changeAvatar,
  changeCurrentPassword,
  changeDetails,
  getAllStaff,
  getStaffById,
  loginStaff,
  logoutStaff,
  refreshAccessToken,
  registerStaff,
  toggleStaffStatus,
} from "../controllers/staff.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import {  isAuthenticated } from "../controllers/guest.controller.js";

const staffRouter = Router();

staffRouter.route("/register").post(upload.single("avatar"), registerStaff);
staffRouter.route("/login").post(loginStaff);
staffRouter.route("/refresh-token").post(refreshAccessToken);
staffRouter.route("/auth-status").get(isAuthenticated);

// secured routes
staffRouter.route("/get-staff/:staffId").get(verifyJwt, getStaffById);
staffRouter.route("/all-staffs").get(verifyJwt, getAllStaff);
staffRouter.route("/logout").patch(verifyJwt, logoutStaff);
staffRouter.route("/change-password").patch(verifyJwt, upload.none(), changeCurrentPassword);
staffRouter
  .route("/change-avatar")
  .patch(verifyJwt, upload.single("avatar"), changeAvatar);
staffRouter.route("/change-details").put(verifyJwt, upload.none(), changeDetails);
staffRouter.route("/toggleStatus").patch(verifyJwt, toggleStaffStatus);

export default staffRouter;
