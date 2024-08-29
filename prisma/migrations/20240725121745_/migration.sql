/*
  Warnings:

  - You are about to drop the column `title` on the `group` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,contactId,groupId]` on the table `contact` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `group` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "contact_userId_contactId_key";

-- AlterTable
ALTER TABLE "group" DROP COLUMN "title",
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "contact_userId_contactId_groupId_key" ON "contact"("userId", "contactId", "groupId");
