import { Router } from "express";

import {
  addRoom,
  getRooms,
  getSingleRoom,
  changeImage,
  updateRoom,
  updateRoomStatus,
  deleteRoom,
} from "../controllers/room.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const roomRouter = Router();

roomRouter.route("/add").post(verifyJwt, upload.single("image"), addRoom);
roomRouter.route("/get-rooms").get(getRooms);
roomRouter.route("/get-room/:roomId").get(getSingleRoom);
roomRouter.route("/update/:roomId").put(verifyJwt, upload.none(), updateRoom);
roomRouter
.route("/change-image/:roomId")
.patch(verifyJwt, upload.single("image"), changeImage);
roomRouter.route("/change-status/:roomId").patch(verifyJwt, updateRoomStatus);
roomRouter.route("/delete/:roomId").delete(verifyJwt, deleteRoom);

export default roomRouter;
