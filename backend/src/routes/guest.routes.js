import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
  loginGuest,
  logoutGuest,
  registerGuest,
} from "../controllers/guest.controller.js";
import { refreshAccessToken } from "../controllers/staff.controller.js";

const guestRouter = Router();

guestRouter.route("/register").post(registerGuest);
guestRouter.route("/login").post(loginGuest);
guestRouter.route("/refresh-token").post(refreshAccessToken);

// secured routes
guestRouter.route("/logout").post(verifyJwt, logoutGuest);

export default guestRouter;
