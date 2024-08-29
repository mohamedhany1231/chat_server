-- AlterTable
ALTER TABLE "user" ADD COLUMN     "contactId" TEXT;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
