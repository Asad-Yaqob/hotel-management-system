import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js"
import { loginStaff, logoutStaff, registerStaff } from "../controllers/staff.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const staffRouter = Router();

staffRouter.route("/register").post(upload.single("avatar"), registerStaff);
staffRouter.route("/login").post(loginStaff);

// secured routes
staffRouter.route("/logout").post(verifyJwt,logoutStaff)

export default staffRouter;
