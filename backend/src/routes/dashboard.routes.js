import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { getReport } from "../controllers/dashboard.controller.js";

const dashboardRouter = Router();

dashboardRouter.route("/reports").post(verifyJwt, getReport);

export default dashboardRouter;
