// types.d.ts
import { Request as ExpressRequest } from "express";
import { Socket as BaseSocket } from "socket.io";
import { IncomingMessage } from "http";

interface User {
  id: string;
  name: string;
  email: string;
}

interface CustomRequest extends ExpressRequest {
  user?: User;
}

// Extend Express Request
declare module "express-serve-static-core" {
  interface Request {
    user?: User;
  }
}
