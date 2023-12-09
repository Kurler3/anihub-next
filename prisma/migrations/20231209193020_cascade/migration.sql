-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_parentCommentId_fkey";

-- DropForeignKey
ALTER TABLE "comments_dislikes" DROP CONSTRAINT "comments_dislikes_commentId_fkey";

-- DropForeignKey
ALTER TABLE "comments_dislikes" DROP CONSTRAINT "comments_dislikes_userId_fkey";

-- DropForeignKey
ALTER TABLE "comments_likes" DROP CONSTRAINT "comments_likes_commentId_fkey";

-- DropForeignKey
ALTER TABLE "comments_likes" DROP CONSTRAINT "comments_likes_userId_fkey";

-- DropForeignKey
ALTER TABLE "posts_dislikes" DROP CONSTRAINT "posts_dislikes_postId_fkey";

-- DropForeignKey
ALTER TABLE "posts_dislikes" DROP CONSTRAINT "posts_dislikes_userId_fkey";

-- DropForeignKey
ALTER TABLE "posts_likes" DROP CONSTRAINT "posts_likes_postId_fkey";

-- DropForeignKey
ALTER TABLE "posts_likes" DROP CONSTRAINT "posts_likes_userId_fkey";

-- DropForeignKey
ALTER TABLE "watchlist_animes" DROP CONSTRAINT "watchlist_animes_watchListId_fkey";

-- DropForeignKey
ALTER TABLE "watchlist_users" DROP CONSTRAINT "watchlist_users_watchlistId_fkey";

-- AddForeignKey
ALTER TABLE "posts_likes" ADD CONSTRAINT "posts_likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts_likes" ADD CONSTRAINT "posts_likes_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts_dislikes" ADD CONSTRAINT "posts_dislikes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts_dislikes" ADD CONSTRAINT "posts_dislikes_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_parentCommentId_fkey" FOREIGN KEY ("parentCommentId") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments_likes" ADD CONSTRAINT "comments_likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments_likes" ADD CONSTRAINT "comments_likes_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments_dislikes" ADD CONSTRAINT "comments_dislikes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments_dislikes" ADD CONSTRAINT "comments_dislikes_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "watchlist_users" ADD CONSTRAINT "watchlist_users_watchlistId_fkey" FOREIGN KEY ("watchlistId") REFERENCES "watchlists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "watchlist_animes" ADD CONSTRAINT "watchlist_animes_watchListId_fkey" FOREIGN KEY ("watchListId") REFERENCES "watchlists"("id") ON DELETE CASCADE ON UPDATE CASCADE;
