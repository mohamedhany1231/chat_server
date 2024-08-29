import prisma from "../prisma";
import catchAsync from "../utils/catchAsync";

export const getChat = catchAsync(async (req, res, next) => {
  const page = Number(req.query.page) || 1;
  const count = Number(req.query.count) || 10;
  const skip = (page - 1) * count;

  // userID -> user chatting with

  const userId = req.params.userId;
  const messages = await prisma.message.findMany({
    where: {
      OR: [
        { to: req.user?.id, from: userId },
        { to: userId, from: req.user?.id },
      ],
    },
    orderBy: { sentAt: "desc" },
    skip: skip,
    take: count,
  });

  res.status(200).json({
    data: {
      messages,
    },
  });
});

export const getGroupChat = catchAsync(async (req, res, next) => {
  console.log(req.query);
  const page = Number(req.query.page) || 1;
  const count = Number(req.query.count) || 15;
  const skip = (page - 1) * count;

  // userID -> user chatting with
  const groupId = req.params.groupId;
  const messages = await prisma.message.findMany({
    where: {
      groupId,
    },
    orderBy: { sentAt: "desc" },
    skip: skip,
    take: count,
  });

  res.status(200).json({
    data: {
      messages,
    },
  });
});
