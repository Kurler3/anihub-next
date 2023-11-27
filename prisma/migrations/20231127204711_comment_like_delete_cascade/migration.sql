-- DropForeignKey
ALTER TABLE "anime_comments" DROP CONSTRAINT "anime_comments_parentAnimeCommentId_fkey";

-- DropForeignKey
ALTER TABLE "anime_comments_dislikes" DROP CONSTRAINT "anime_comments_dislikes_animeCommentId_fkey";

-- DropForeignKey
ALTER TABLE "anime_comments_likes" DROP CONSTRAINT "anime_comments_likes_animeCommentId_fkey";

-- DropForeignKey
ALTER TABLE "comments_dislikes" DROP CONSTRAINT "comments_dislikes_commentId_fkey";

-- AddForeignKey
ALTER TABLE "comments_dislikes" ADD CONSTRAINT "comments_dislikes_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "comments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anime_comments" ADD CONSTRAINT "anime_comments_parentAnimeCommentId_fkey" FOREIGN KEY ("parentAnimeCommentId") REFERENCES "anime_comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anime_comments_likes" ADD CONSTRAINT "anime_comments_likes_animeCommentId_fkey" FOREIGN KEY ("animeCommentId") REFERENCES "anime_comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anime_comments_dislikes" ADD CONSTRAINT "anime_comments_dislikes_animeCommentId_fkey" FOREIGN KEY ("animeCommentId") REFERENCES "anime_comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
