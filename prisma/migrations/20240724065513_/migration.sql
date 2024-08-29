/*
  Warnings:

  - A unique constraint covering the columns `[userId,messageId]` on the table `contact` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "contact_messageId_key";

-- CreateIndex
CREATE UNIQUE INDEX "contact_userId_messageId_key" ON "contact"("userId", "messageId");
