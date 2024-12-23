import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
  getCurrentGuest,
  getGuestById,
  getGuests,
  isAuthenticated,
  loginGuest,
  logoutGuest,
  registerGuest,
  registerGuestByStaff,
} from "../controllers/guest.controller.js";
import { refreshAccessToken } from "../controllers/staff.controller.js";

const guestRouter = Router();

guestRouter.route("/register").post(upload.none(), registerGuest);
guestRouter.route("/login").post(upload.none(), loginGuest);
guestRouter.route("/refresh-token").post(refreshAccessToken);

// secured routes
guestRouter.route("/register-by-staff").post( verifyJwt ,upload.none(), registerGuestByStaff);
guestRouter.route("/auth-status").get(verifyJwt,isAuthenticated);
guestRouter.route("/get-guest").get(verifyJwt,getCurrentGuest);
guestRouter.route("/get-guest/:guestId").get(verifyJwt, getGuestById);
guestRouter.route("/logout").patch(verifyJwt, logoutGuest);
guestRouter.route("/all-guests").get(verifyJwt, getGuests);

export default guestRouter;
