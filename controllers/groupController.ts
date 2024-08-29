import prisma from "../prisma";
import catchAsync from "../utils/catchAsync";

export const getGroupData = catchAsync(async (req, res, next) => {
  const groupData = await prisma.group.findUnique({
    where: { id: req.params.groupId },
    include: { contact: true },
  });

  res.status(200).json({
    data: {
      group: groupData,
    },
  });
});

export const createGroup = catchAsync(async (req, res, next) => {
  const group = await prisma.group.create({
    data: { name: req.body.name || `new group ${Date.now()}` },
  });

  const contact = await prisma.contact.create({
    data: {
      userId: req.user?.id as string,
      groupId: group.id,
      type: "group",
    },
  });
  res.status(200).json({
    data: {
      group,
    },
  });
});

export const addUserToGroup = catchAsync(async (req, res, next) => {
  const { userId, groupId } = req.body;
  const contact = await prisma.contact.create({
    data: { userId, groupId, type: "group" },
  });

  console.log(contact);

  res.status(200).json({
    message: "user added successfully",
  });
});

export const removeUserFromGroup = catchAsync(async (req, res, next) => {
  const { userId, groupId } = req.body;
  await prisma.contact.deleteMany({ where: { userId, groupId } });

  res.status(200).json({
    message: "user removed successfully",
  });
});
