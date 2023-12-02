/*
  Warnings:

  - The primary key for the `follow_requests` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `followerId` on the `follow_requests` table. All the data in the column will be lost.
  - You are about to drop the column `followingId` on the `follow_requests` table. All the data in the column will be lost.
  - The primary key for the `follows` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `followerId` on the `follows` table. All the data in the column will be lost.
  - You are about to drop the column `followingId` on the `follows` table. All the data in the column will be lost.
  - You are about to drop the `AnimeLike` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `followedUserId` to the `follow_requests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `followerUserId` to the `follow_requests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `followedUserId` to the `follows` table without a default value. This is not possible if the table is not empty.
  - Added the required column `followerUserId` to the `follows` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AnimeLike" DROP CONSTRAINT "AnimeLike_userId_fkey";

-- DropForeignKey
ALTER TABLE "follow_requests" DROP CONSTRAINT "follow_requests_followerId_fkey";

-- DropForeignKey
ALTER TABLE "follow_requests" DROP CONSTRAINT "follow_requests_followingId_fkey";

-- DropForeignKey
ALTER TABLE "follows" DROP CONSTRAINT "follows_followerId_fkey";

-- DropForeignKey
ALTER TABLE "follows" DROP CONSTRAINT "follows_followingId_fkey";

-- AlterTable
ALTER TABLE "follow_requests" DROP CONSTRAINT "follow_requests_pkey",
DROP COLUMN "followerId",
DROP COLUMN "followingId",
ADD COLUMN     "followedUserId" TEXT NOT NULL,
ADD COLUMN     "followerUserId" TEXT NOT NULL,
ADD CONSTRAINT "follow_requests_pkey" PRIMARY KEY ("followerUserId", "followedUserId");

-- AlterTable
ALTER TABLE "follows" DROP CONSTRAINT "follows_pkey",
DROP COLUMN "followerId",
DROP COLUMN "followingId",
ADD COLUMN     "followedUserId" TEXT NOT NULL,
ADD COLUMN     "followerUserId" TEXT NOT NULL,
ADD CONSTRAINT "follows_pkey" PRIMARY KEY ("followedUserId", "followerUserId");

-- DropTable
DROP TABLE "AnimeLike";

-- CreateTable
CREATE TABLE "anime_likes" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "animeId" TEXT NOT NULL,

    CONSTRAINT "anime_likes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "anime_likes" ADD CONSTRAINT "anime_likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follows" ADD CONSTRAINT "follows_followerUserId_fkey" FOREIGN KEY ("followerUserId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follows" ADD CONSTRAINT "follows_followedUserId_fkey" FOREIGN KEY ("followedUserId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follow_requests" ADD CONSTRAINT "follow_requests_followerUserId_fkey" FOREIGN KEY ("followerUserId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follow_requests" ADD CONSTRAINT "follow_requests_followedUserId_fkey" FOREIGN KEY ("followedUserId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
