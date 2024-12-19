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

// Handle preflight requests
app.options("*", cors({ origin: process.env.CORS_ORIGIN, credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// import routes
import guestRouter from "./routes/guest.routes.js";
import staffRouter from "./routes/staff.routes.js";
import roomRouter from "./routes/room.routes.js";
import cleaningRouter from "./routes/cleaning.routes.js";
import maintainenceRouter from "./routes/maintainence.routes.js";
import bookingRouter from "./routes/booking.routes.js";
import serviceRouter from "./routes/service.routes.js";
import dashboardRouter from "./routes/dashboard.routes.js";

// declare routes
app.use("/api/v1/guest", guestRouter);
app.use("/api/v1/staff", staffRouter);
app.use("/api/v1/room", roomRouter);
app.use("/api/v1/cleaning", cleaningRouter);
app.use("/api/v1/maintainence", maintainenceRouter);
app.use("/api/v1/booking", bookingRouter);
app.use("/api/v1/service", serviceRouter);
app.use("/api/v1/dashboard", dashboardRouter);

export default app;
