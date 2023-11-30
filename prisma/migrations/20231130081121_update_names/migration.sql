/*
  Warnings:

  - Added the required column `isPrivate` to the `watchlists` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "watchlists" ADD COLUMN     "isPrivate" BOOLEAN NOT NULL;
