import { Router } from "express";
import { loginGuest, registerGuest } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.route('/register').post(registerGuest)
userRouter.route('/login').post(loginGuest)

export default userRouter;