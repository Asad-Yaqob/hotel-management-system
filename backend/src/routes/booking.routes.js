import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

import {
  checkAvailability,
  getBookings,
  reserveRoomByGuest,
  reserveRoomByStaff,
} from "../controllers/booking.controller.js";

const bookingRouter = Router();

bookingRouter.route("/requests").get(verifyJwt, getBookings);
bookingRouter
  .route("/check-availability")
  .post(verifyJwt, upload.none(), checkAvailability);
bookingRouter
  .route("/reserve")
  .post(verifyJwt, upload.none(), reserveRoomByGuest);
bookingRouter
  .route("/reserve-by-staff")
  .post(verifyJwt, upload.none(), reserveRoomByStaff);

export default bookingRouter;
