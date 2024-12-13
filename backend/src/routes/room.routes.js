import { Router } from "express";

import {
  addRoom,
  changeImage,
  deleteRoom,
  getRooms,
  getSingleRoom,
  updateRoom,
} from "../controllers/room.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const roomRouter = Router();

roomRouter.route("/add").post(verifyJwt, upload.single("image"), addRoom);
roomRouter.route("/get-rooms").get(verifyJwt, getRooms);
roomRouter.route("/get-room/:roomId").get(verifyJwt, getSingleRoom);
roomRouter.route("/update/:roomId").put(verifyJwt, upload.none(), updateRoom);
roomRouter.route("/delete/:roomId").delete(verifyJwt, deleteRoom);
roomRouter
  .route("/change-image/:roomId")
  .patch(verifyJwt, upload.single("image"), changeImage);

export default roomRouter;
