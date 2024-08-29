import socketIo, { Socket } from "socket.io";

import { NextFunction, Request, Response } from "express";
import { protect } from "./controllers/authController";
import cookieParser from "cookie-parser";
import {
  addSocketToDB,
  createMessageDb,
  getSocketId,
  markMessagesAsRead,
  removeSocketFromDb,
} from "./utils/helper";
import { User } from "./decs";
import { httpServer } from "./app";
import prisma from "./prisma";

const corsConfig = { origin: ["http://localhost:5173"], credentials: true };

export const io = new socketIo.Server(httpServer, {
  cors: corsConfig,
  cookie: true,
});

export interface messageOptions {
  destinationId: string;
  destinationType: destination;
}
type destination = "group" | "user";

io.engine.use(cookieParser());
io.engine.use(protect);

// TODO: handle type

io.on("connection", async (socket) => {
  const user = (socket.request as Request).user as User;

  await addSocketToDB(user.id as string, socket.id);
  socket.on(
    "send-message",
    async (message: string, options: messageOptions) => {
      if (options) {
        const messageDb = await createMessageDb(message, user.id, options);
        const destinationSockets = await getSocketId(options);

        if (!destinationSockets) return;

        const sendingOptions: messageOptions = {
          destinationId:
            options.destinationType === "group"
              ? options.destinationId
              : user.id,

          destinationType: options.destinationType,
        };

        if (options.destinationType === "user") {
          const contact = await prisma.contact.findFirst({
            where: { contactId: user.id, userId: options.destinationId },
          });

          if (!contact) return;
        }

        destinationSockets.forEach((soc) => {
          socket.to(soc).emit("message", message, sendingOptions);
        });
      } else socket.broadcast.emit("message", message, socket.id);
    }
  );

  socket.on("typing", async (options: messageOptions) => {
    const destinationSockets = await getSocketId(options);
    destinationSockets.forEach((soc) => {
      const sentOptions: messageOptions = {
        destinationType: options.destinationType,
        destinationId:
          options.destinationType == "user" ? user.id : options.destinationId,
      };
      socket.to(soc).emit("typing", sentOptions, user.id);
    });
  });

  socket.on("readChat", async (chat: messageOptions) => {
    const destinationSockets = await getSocketId(chat);
    await markMessagesAsRead(user.id, chat);
    destinationSockets.forEach((soc) => {
      socket.to(soc).emit("userChatRead", user.id);
    });
  });

  socket.on("disconnect", () => {
    removeSocketFromDb(user.id);
  });
});
