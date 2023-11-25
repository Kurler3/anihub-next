/*
  Warnings:

  - You are about to drop the `comment_likes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "comment_likes" DROP CONSTRAINT "comment_likes_commentId_fkey";

-- DropForeignKey
ALTER TABLE "comment_likes" DROP CONSTRAINT "comment_likes_userId_fkey";

-- DropTable
DROP TABLE "comment_likes";

-- CreateTable
CREATE TABLE "comments_likes" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "commentId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "comments_likes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments_dislikes" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "commentId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "comments_dislikes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "anime_comments_likes" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "animeCommentId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "anime_comments_likes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "anime_comments_dislikes" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "animeCommentId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "anime_comments_dislikes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "comments_likes" ADD CONSTRAINT "comments_likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments_likes" ADD CONSTRAINT "comments_likes_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "comments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments_dislikes" ADD CONSTRAINT "comments_dislikes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments_dislikes" ADD CONSTRAINT "comments_dislikes_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "anime_comments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anime_comments_likes" ADD CONSTRAINT "anime_comments_likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anime_comments_likes" ADD CONSTRAINT "anime_comments_likes_animeCommentId_fkey" FOREIGN KEY ("animeCommentId") REFERENCES "anime_comments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anime_comments_dislikes" ADD CONSTRAINT "anime_comments_dislikes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anime_comments_dislikes" ADD CONSTRAINT "anime_comments_dislikes_animeCommentId_fkey" FOREIGN KEY ("animeCommentId") REFERENCES "anime_comments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
