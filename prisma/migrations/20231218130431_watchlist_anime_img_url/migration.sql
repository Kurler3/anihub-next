/*
  Warnings:

  - Added the required column `animeImgUrl` to the `watchlist_animes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "watchlist_animes" ADD COLUMN     "animeImgUrl" TEXT NOT NULL;
