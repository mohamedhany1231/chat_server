-- DropForeignKey
ALTER TABLE "message" DROP CONSTRAINT "message_to_fkey";

-- AlterTable
ALTER TABLE "message" ADD COLUMN     "groupId" TEXT,
ADD COLUMN     "type" "contactType" NOT NULL DEFAULT 'user',
ALTER COLUMN "to" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_to_fkey" FOREIGN KEY ("to") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE SET NULL ON UPDATE CASCADE;
