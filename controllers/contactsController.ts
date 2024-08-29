import prisma from "../prisma";
import AppError from "../utils/AppError";
import catchAsync from "../utils/catchAsync";

export const getMyContacts = catchAsync(async (req, res, next) => {
  const fetchedData = await prisma.contact.findMany({
    where: { userId: req.user?.id },
    include: { lastMessage: true, contact: true, group: true },
    orderBy: {
      lastModified: "desc",
    },
  });

  const contacts = fetchedData.map((con) => {
    const contactData = con.type === "group" ? con.group : con.contact;

    return {
      message: con.lastMessage?.content,
      ...contactData,
      contactId: contactData?.id,
      type: con.type,
      id: con.id,
      password: undefined,
    };
  });

  res.status(200).json({
    data: {
      contacts,
    },
  });
});

export const addContact = catchAsync(async (req, res, next) => {
  const email = req.body.userEmail || req.body.email;
  console.log(req.body);

  if (!email)
    return next(new AppError(400, "please provide userEmail in request body"));

  if (email === req.user?.email)
    return next(new AppError(400, "can't add yourself to contact list"));

  const contact = await prisma.user.findUnique({ where: { email } });

  if (!contact || !contact.id)
    return next(new AppError(400, "no user exist with that email"));

  await prisma.contact.create({
    data: { userId: req.user?.id as string, contactId: contact.id },
  });

  res.status(200).json({
    message: "contact added",
  });
});
