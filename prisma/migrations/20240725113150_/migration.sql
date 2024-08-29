-- CreateEnum
CREATE TYPE "contactType" AS ENUM ('user', 'group');

-- DropForeignKey
ALTER TABLE "contact" DROP CONSTRAINT "contact_contactId_fkey";

-- AlterTable
ALTER TABLE "contact" ADD COLUMN     "groupId" TEXT,
ADD COLUMN     "type" "contactType" NOT NULL DEFAULT 'user',
ALTER COLUMN "contactId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "group" (
    "id" TEXT NOT NULL,
    "contactId" TEXT[],

    CONSTRAINT "group_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "contact" ADD CONSTRAINT "contact_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contact" ADD CONSTRAINT "contact_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE SET NULL ON UPDATE CASCADE;
