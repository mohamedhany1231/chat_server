-- AlterTable
ALTER TABLE "contact" ALTER COLUMN "lastModified" DROP DEFAULT,
ALTER COLUMN "lastModified" SET DATA TYPE TIMESTAMP(3);
