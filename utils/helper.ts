import prisma from "../prisma";
import { messageOptions } from "../socket";

// io.on("connection" , socket =>{
//   socket
// })
export async function getSocketId(options: messageOptions): Promise<string[]> {
  if (options.destinationType == "user") {
    const user = await prisma.user.findUnique({
      where: { id: options.destinationId },
    });

    const socket = user?.socketId || "";
    return [socket];
  } else {
    const contacts = await prisma.contact.findMany({
      where: { type: "group", groupId: options.destinationId },
      include: { user: true },
    });

    const sockets = contacts.map((con) => con.user.socketId || "");
    return sockets;
  }
}

export async function addSocketToDB(userId: string, socketId: string) {
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { socketId },
  });
}
export async function removeSocketFromDb(userId: string) {
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { socketId: null },
  });
}

export async function createMessageDb(
  message: string,
  from: string,
  options: messageOptions
) {
  const data = {
    content: message,
    from,
    ...(options.destinationType === "group"
      ? { groupId: options.destinationId }
      : { to: options.destinationId }),
  };
  const createMessage = await prisma.message.create({
    data,
  });

  if (options.destinationType === "user") {
    await prisma.contact.updateMany({
      where: {
        OR: [
          { contactId: from, userId: options.destinationId },
          { userId: from, contactId: options.destinationId },
        ],
      },
      data: {
        messageId: createMessage.id,
      },
    });
  } else {
    await prisma.contact.updateMany({
      where: { groupId: options.destinationId },
      data: {
        messageId: createMessage.id,
      },
    });
  }

  return createMessage;
}

export async function markMessagesAsRead(
  userId: string,
  options: messageOptions
) {
  // console.log(x[0]);
  // console.log(typeof x[0].readBy);
  // console.log(x[0].readBy.length);
  if (options.destinationType === "user") {
    await prisma.message.updateMany({
      where: {
        from: options.destinationId,
        to: userId,
        NOT: { readBy: { has: userId } },
      },
      data: {
        readBy: { push: userId },
      },
    });
  } else if (options.destinationType === "group") {
    await prisma.message.updateMany({
      where: {
        groupId: options.destinationId,
        NOT: { readBy: { has: userId } },
      },
      data: {
        readBy: { push: userId },
      },
    });
  }
}
