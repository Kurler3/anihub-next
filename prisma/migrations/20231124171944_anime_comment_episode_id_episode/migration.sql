/*
  Warnings:

  - You are about to drop the column `episodeId` on the `anime_comments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "anime_comments" DROP COLUMN "episodeId",
ADD COLUMN     "episode" INTEGER;
