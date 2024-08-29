import { Request, Response } from "express";
import prisma from "../prisma";
import appError from "../utils/AppError";
import catchAsync from "../utils/catchAsync";
import argon2 from "argon2";
import jwt, { JwtPayload } from "jsonwebtoken";

const signToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });
};

const signSendToken = (id: string, statusCode: number, res: Response) => {
  const token = signToken(id);
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    // domain: "http://localhost:3000",
    sameSite: "none",
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });
  res.status(statusCode).json({
    token,
  });
};

export const signup = catchAsync(async (req, res, next) => {
  const { email, password, confirmPassword, name } = req.body;
  if (!email || !password || !confirmPassword || !name)
    return next(new appError(400, "please provide all fields "));

  if (password !== confirmPassword)
    return next(new appError(400, " confirmation password does not match"));

  const passwordHash = await argon2.hash(password);
  const user = await prisma.user.create({
    data: { email, password: passwordHash, name },
  });

  return signSendToken(user.id, 201, res);
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new appError(400, "please provide email and password"));

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await argon2.verify(user.password, password)))
    return next(new appError(400, "invalid email or password"));

  return signSendToken(user.id, 200, res);
});

export const protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization?.startsWith("Bearer")
  )
    token = req.headers.authorization.split(" ")[1];
  else if (req.cookies.token) token = req.cookies.token;

  if (!token)
    return res.status(401).json({ message: "please login to gain access" });

  const decoded = jwt.decode(token, { json: true });
  if (!decoded || !decoded?.id)
    return res
      .status(401)
      .json({ message: "invalid token , login again to gain access" });

  const user = await prisma.user.findUnique({ where: { id: decoded.id } });

  if (!user) return next(new appError(401, "user no longer exist"));

  req.user = user;
  next();
});
