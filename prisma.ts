import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient().$extends({
  result: {
    message: {
      //   isRead: {
      //     needs: {
      //       destinationType: true,
      //       groupId: true,
      //       readBy: true,
      //     },
      //     compute: async (message) => {
      //       if (message.destinationType === "group" && message.groupId) {
      //         const contacts: any[] = await prisma.contact.findMany({
      //           where: { groupId: message.groupId },
      //         });
      //         return contacts.length === message.readBy.length;
      //       } else {
      //         return message.readBy.length === 1;
      //       }
      //     },
      //   },
    },
  },
});

export default prisma;
