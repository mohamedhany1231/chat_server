/*
  Warnings:

  - A unique constraint covering the columns `[socketId]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "socketId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "user_socketId_key" ON "user"("socketId");
