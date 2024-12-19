import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
  getGuests,
  loginGuest,
  loginStatus,
  logoutGuest,
  registerGuest,
} from "../controllers/guest.controller.js";
import { refreshAccessToken } from "../controllers/staff.controller.js";

const guestRouter = Router();

guestRouter.route("/register").post(upload.none(), registerGuest);
guestRouter.route("/login").post(upload.none(), loginGuest);
guestRouter.route("/refresh-token").post(refreshAccessToken);
guestRouter.route("/auth-status").get(loginStatus);

// secured routes
guestRouter.route("/logout").patch(verifyJwt, logoutGuest);
guestRouter.route("/all-guests").get(verifyJwt, getGuests);

export default guestRouter;
