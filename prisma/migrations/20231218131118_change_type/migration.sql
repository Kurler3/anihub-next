/*
  Warnings:

  - The primary key for the `watchlist_animes` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "watchlist_animes" DROP CONSTRAINT "watchlist_animes_pkey",
ALTER COLUMN "animeId" SET DATA TYPE TEXT,
ADD CONSTRAINT "watchlist_animes_pkey" PRIMARY KEY ("watchListId", "animeId");
