import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import errorController from "./controllers/errorController";
import userRouter from "./routes/userRouter";
import contactsRouter from "./routes/contactsRouter";
import messagesRouter from "./routes/messagesRouter";
import groupRouter from "./routes/groupRouter";
import cors from "cors";
import http from "http";
import multer from "multer";

const app = express();

const corsConfig = { origin: ["http://localhost:5173"], credentials: true };

app.use(cors(corsConfig));
app.use(morgan("dev"));
app.use(rateLimit({ limit: 5000, windowMs: 60 * 60 * 1000 }));

app.use(bodyParser.json({ limit: "10kb" }));
app.use(cookieParser());

app.use("/api/users", userRouter);
app.use("/api/contacts", contactsRouter);
app.use("/api/messages", messagesRouter);
app.use("/api/groups", groupRouter);

app.use(errorController);

export const httpServer = http.createServer(app);

import peerServer from "./peerServer";

app.use("/call", peerServer);

app.all("*", (req, res, next) => {
  res.status(404).json({
    message: "invalid url",
  });
});
