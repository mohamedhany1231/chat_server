/*
  Warnings:

  - Added the required column `title` to the `group` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "group" ADD COLUMN     "title" TEXT NOT NULL;
