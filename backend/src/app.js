import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// import routes
import guestRouter from "./routes/guest.routes.js";
import staffRouter from "./routes/staff.routes.js";
import roomRouter from "./routes/room.routes.js";
import cleaningRouter from "./routes/cleaning.routes.js";

// declare routes
app.use("/api/v1/guest", guestRouter);
app.use("/api/v1/staff", staffRouter);
app.use("/api/v1/room", roomRouter);
app.use("/api/v1/cleaning", cleaningRouter);

export default app;
