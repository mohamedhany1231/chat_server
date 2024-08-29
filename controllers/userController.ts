import multer from "multer";
import prisma from "../prisma";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/AppError";
import streamifier from "streamifier";

import { v2 as cloudinary } from "cloudinary";
import { NextFunction, Request, Response } from "express";
import sharp from "sharp";
export const getMe = catchAsync(async (req, res, next) => {
  res.status(200).json({
    data: {
      user: req.user,
    },
  });
});
export const getUser = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  // console.log(id);
  const user = await prisma.user.findUnique({ where: { id } });

  // console.log(user);
  res.status(200).json({ data: { user } });
});

// multer
// const multerMem = multer.memoryStorage();

cloudinary.config({
  api_key: process.env.CLOUDINARY_KEY,
  cloud_name: process.env.CLOUDINARY_NAME,
  api_secret: process.env.CLOUDINARY_SECRET,
});
const multerStorage = multer.memoryStorage();

const multerFilter = (
  req: Request,
  file: any,
  cb: (x: any, y: boolean) => void
) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError(400, "Not an image! Please upload only images."), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

export const parseFormData = upload.single("photo");

export const resizeUserPhoto = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    req.body.photo = undefined;
    if (req.file) {
      const id = req.params.id || req.user?.id;
      const fileName = `user-${id}-${Date.now()}`;
      const img = await sharp(req.file.buffer)
        .resize(1080, 1080)
        .jpeg({ quality: 90 })
        .toBuffer();

      const folder = "chat/users";

      const cloudinaryStream = cloudinary.uploader.upload_stream(
        {
          folder,
          public_id: fileName,
        },
        (err, response) => {
          req.body.photo = response?.secure_url;

          next();
        }
      );

      streamifier.createReadStream(img).pipe(cloudinaryStream);
    } else {
      next();
    }
  }
);

export const updateMe = catchAsync(async (req, res, next) => {
  const data = {
    ...(req.body.photo && { photo: req.body.photo }),
    ...(req.body.name && { name: req.body.name }),
  };
  console.log(data);
  await prisma.user.update({
    where: { id: req.user?.id },
    data,
  });

  res.status(200).json({ message: "will update", data: {} });
});
