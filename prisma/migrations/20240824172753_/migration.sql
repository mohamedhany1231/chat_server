/*
  Warnings:

  - A unique constraint covering the columns `[userId,groupId]` on the table `contact` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,contactId]` on the table `contact` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "contact_userId_contactId_groupId_key";

-- CreateIndex
CREATE UNIQUE INDEX "contact_userId_groupId_key" ON "contact"("userId", "groupId");

-- CreateIndex
CREATE UNIQUE INDEX "contact_userId_contactId_key" ON "contact"("userId", "contactId");
