/*
  Warnings:

  - You are about to drop the column `animeId` on the `anime_comments` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `anime_comments` table. All the data in the column will be lost.
  - You are about to drop the column `parentAnimeCommentId` on the `anime_comments` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `anime_comments` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `anime_comments` table. All the data in the column will be lost.
  - You are about to drop the column `animeCommentId` on the `anime_comments_dislikes` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `anime_comments_dislikes` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `anime_comments_dislikes` table. All the data in the column will be lost.
  - You are about to drop the column `animeCommentId` on the `anime_comments_likes` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `anime_comments_likes` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `anime_comments_likes` table. All the data in the column will be lost.
  - You are about to drop the column `animeId` on the `anime_likes` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `anime_likes` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `parentCommentId` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `postId` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `commentId` on the `comments_dislikes` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `comments_dislikes` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `comments_dislikes` table. All the data in the column will be lost.
  - You are about to drop the column `commentId` on the `comments_likes` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `comments_likes` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `comments_likes` table. All the data in the column will be lost.
  - The primary key for the `follow_requests` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `follow_requests` table. All the data in the column will be lost.
  - You are about to drop the column `followedUserId` on the `follow_requests` table. All the data in the column will be lost.
  - You are about to drop the column `followerUserId` on the `follow_requests` table. All the data in the column will be lost.
  - The primary key for the `follows` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `followedUserId` on the `follows` table. All the data in the column will be lost.
  - You are about to drop the column `followerUserId` on the `follows` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `posts_dislikes` table. All the data in the column will be lost.
  - You are about to drop the column `postId` on the `posts_dislikes` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `posts_dislikes` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `posts_likes` table. All the data in the column will be lost.
  - You are about to drop the column `postId` on the `posts_likes` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `posts_likes` table. All the data in the column will be lost.
  - You are about to drop the column `avatarUrl` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `isProfilePublic` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `users` table. All the data in the column will be lost.
  - The primary key for the `watchlist_animes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `animeId` on the `watchlist_animes` table. All the data in the column will be lost.
  - You are about to drop the column `animeImgUrl` on the `watchlist_animes` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `watchlist_animes` table. All the data in the column will be lost.
  - You are about to drop the column `watchListId` on the `watchlist_animes` table. All the data in the column will be lost.
  - The primary key for the `watchlist_users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `watchlist_users` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `watchlist_users` table. All the data in the column will be lost.
  - You are about to drop the column `watchlistId` on the `watchlist_users` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `watchlists` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `watchlists` table. All the data in the column will be lost.
  - Added the required column `anime_id` to the `anime_comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `anime_comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `anime_comment_id` to the `anime_comments_dislikes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `anime_comments_dislikes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `anime_comment_id` to the `anime_comments_likes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `anime_comments_likes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `anime_id` to the `anime_likes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `anime_likes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `post_id` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `comment_id` to the `comments_dislikes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `comments_dislikes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `comment_id` to the `comments_likes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `comments_likes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `followed_user_id` to the `follow_requests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `follower_user_id` to the `follow_requests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `followed_user_id` to the `follows` table without a default value. This is not possible if the table is not empty.
  - Added the required column `follower_user_id` to the `follows` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `post_id` to the `posts_dislikes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `posts_dislikes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `post_id` to the `posts_likes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `posts_likes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `anime_id` to the `watchlist_animes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `anime_img_url` to the `watchlist_animes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `watchlist_id` to the `watchlist_animes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `watchlist_users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `watchlist_id` to the `watchlist_users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `owner_id` to the `watchlists` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "anime_comments" DROP CONSTRAINT "anime_comments_parentAnimeCommentId_fkey";

-- DropForeignKey
ALTER TABLE "anime_comments" DROP CONSTRAINT "anime_comments_userId_fkey";

-- DropForeignKey
ALTER TABLE "anime_comments_dislikes" DROP CONSTRAINT "anime_comments_dislikes_animeCommentId_fkey";

-- DropForeignKey
ALTER TABLE "anime_comments_dislikes" DROP CONSTRAINT "anime_comments_dislikes_userId_fkey";

-- DropForeignKey
ALTER TABLE "anime_comments_likes" DROP CONSTRAINT "anime_comments_likes_animeCommentId_fkey";

-- DropForeignKey
ALTER TABLE "anime_comments_likes" DROP CONSTRAINT "anime_comments_likes_userId_fkey";

-- DropForeignKey
ALTER TABLE "anime_likes" DROP CONSTRAINT "anime_likes_userId_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_parentCommentId_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_postId_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_userId_fkey";

-- DropForeignKey
ALTER TABLE "comments_dislikes" DROP CONSTRAINT "comments_dislikes_commentId_fkey";

-- DropForeignKey
ALTER TABLE "comments_dislikes" DROP CONSTRAINT "comments_dislikes_userId_fkey";

-- DropForeignKey
ALTER TABLE "comments_likes" DROP CONSTRAINT "comments_likes_commentId_fkey";

-- DropForeignKey
ALTER TABLE "comments_likes" DROP CONSTRAINT "comments_likes_userId_fkey";

-- DropForeignKey
ALTER TABLE "follow_requests" DROP CONSTRAINT "follow_requests_followedUserId_fkey";

-- DropForeignKey
ALTER TABLE "follow_requests" DROP CONSTRAINT "follow_requests_followerUserId_fkey";

-- DropForeignKey
ALTER TABLE "follows" DROP CONSTRAINT "follows_followedUserId_fkey";

-- DropForeignKey
ALTER TABLE "follows" DROP CONSTRAINT "follows_followerUserId_fkey";

-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_userId_fkey";

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
ALTER TABLE "watchlist_users" DROP CONSTRAINT "watchlist_users_userId_fkey";

-- DropForeignKey
ALTER TABLE "watchlist_users" DROP CONSTRAINT "watchlist_users_watchlistId_fkey";

-- DropForeignKey
ALTER TABLE "watchlists" DROP CONSTRAINT "watchlists_ownerId_fkey";

-- AlterTable
ALTER TABLE "anime_comments" DROP COLUMN "animeId",
DROP COLUMN "createdAt",
DROP COLUMN "parentAnimeCommentId",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "anime_id" INTEGER NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "parent_anime_comment_id" INTEGER,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "anime_comments_dislikes" DROP COLUMN "animeCommentId",
DROP COLUMN "createdAt",
DROP COLUMN "userId",
ADD COLUMN     "anime_comment_id" INTEGER NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "anime_comments_likes" DROP COLUMN "animeCommentId",
DROP COLUMN "createdAt",
DROP COLUMN "userId",
ADD COLUMN     "anime_comment_id" INTEGER NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "anime_likes" DROP COLUMN "animeId",
DROP COLUMN "userId",
ADD COLUMN     "anime_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "comments" DROP COLUMN "createdAt",
DROP COLUMN "parentCommentId",
DROP COLUMN "postId",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "parent_comment_id" INTEGER,
ADD COLUMN     "post_id" INTEGER NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "comments_dislikes" DROP COLUMN "commentId",
DROP COLUMN "createdAt",
DROP COLUMN "userId",
ADD COLUMN     "comment_id" INTEGER NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "comments_likes" DROP COLUMN "commentId",
DROP COLUMN "createdAt",
DROP COLUMN "userId",
ADD COLUMN     "comment_id" INTEGER NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "follow_requests" DROP CONSTRAINT "follow_requests_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "followedUserId",
DROP COLUMN "followerUserId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "followed_user_id" TEXT NOT NULL,
ADD COLUMN     "follower_user_id" TEXT NOT NULL,
ADD CONSTRAINT "follow_requests_pkey" PRIMARY KEY ("follower_user_id", "followed_user_id");

-- AlterTable
ALTER TABLE "follows" DROP CONSTRAINT "follows_pkey",
DROP COLUMN "followedUserId",
DROP COLUMN "followerUserId",
ADD COLUMN     "followed_user_id" TEXT NOT NULL,
ADD COLUMN     "follower_user_id" TEXT NOT NULL,
ADD CONSTRAINT "follows_pkey" PRIMARY KEY ("followed_user_id", "follower_user_id");

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "posts_dislikes" DROP COLUMN "createdAt",
DROP COLUMN "postId",
DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "post_id" INTEGER NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "posts_likes" DROP COLUMN "createdAt",
DROP COLUMN "postId",
DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "post_id" INTEGER NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "avatarUrl",
DROP COLUMN "createdAt",
DROP COLUMN "isProfilePublic",
DROP COLUMN "updatedAt",
ADD COLUMN     "avatar_url" TEXT,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "is_profile_public" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "watchlist_animes" DROP CONSTRAINT "watchlist_animes_pkey",
DROP COLUMN "animeId",
DROP COLUMN "animeImgUrl",
DROP COLUMN "createdAt",
DROP COLUMN "watchListId",
ADD COLUMN     "anime_id" TEXT NOT NULL,
ADD COLUMN     "anime_img_url" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "watchlist_id" INTEGER NOT NULL,
ADD CONSTRAINT "watchlist_animes_pkey" PRIMARY KEY ("watchlist_id", "anime_id");

-- AlterTable
ALTER TABLE "watchlist_users" DROP CONSTRAINT "watchlist_users_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "userId",
DROP COLUMN "watchlistId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "user_id" TEXT NOT NULL,
ADD COLUMN     "watchlist_id" INTEGER NOT NULL,
ADD CONSTRAINT "watchlist_users_pkey" PRIMARY KEY ("user_id", "watchlist_id");

-- AlterTable
ALTER TABLE "watchlists" DROP COLUMN "createdAt",
DROP COLUMN "ownerId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "owner_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "anime_likes" ADD CONSTRAINT "anime_likes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follows" ADD CONSTRAINT "follows_follower_user_id_fkey" FOREIGN KEY ("follower_user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follows" ADD CONSTRAINT "follows_followed_user_id_fkey" FOREIGN KEY ("followed_user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follow_requests" ADD CONSTRAINT "follow_requests_follower_user_id_fkey" FOREIGN KEY ("follower_user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follow_requests" ADD CONSTRAINT "follow_requests_followed_user_id_fkey" FOREIGN KEY ("followed_user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts_likes" ADD CONSTRAINT "posts_likes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts_likes" ADD CONSTRAINT "posts_likes_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts_dislikes" ADD CONSTRAINT "posts_dislikes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts_dislikes" ADD CONSTRAINT "posts_dislikes_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_parent_comment_id_fkey" FOREIGN KEY ("parent_comment_id") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments_likes" ADD CONSTRAINT "comments_likes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments_likes" ADD CONSTRAINT "comments_likes_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments_dislikes" ADD CONSTRAINT "comments_dislikes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments_dislikes" ADD CONSTRAINT "comments_dislikes_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anime_comments" ADD CONSTRAINT "anime_comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anime_comments" ADD CONSTRAINT "anime_comments_parent_anime_comment_id_fkey" FOREIGN KEY ("parent_anime_comment_id") REFERENCES "anime_comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anime_comments_likes" ADD CONSTRAINT "anime_comments_likes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anime_comments_likes" ADD CONSTRAINT "anime_comments_likes_anime_comment_id_fkey" FOREIGN KEY ("anime_comment_id") REFERENCES "anime_comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anime_comments_dislikes" ADD CONSTRAINT "anime_comments_dislikes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anime_comments_dislikes" ADD CONSTRAINT "anime_comments_dislikes_anime_comment_id_fkey" FOREIGN KEY ("anime_comment_id") REFERENCES "anime_comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "watchlists" ADD CONSTRAINT "watchlists_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "watchlist_users" ADD CONSTRAINT "watchlist_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "watchlist_users" ADD CONSTRAINT "watchlist_users_watchlist_id_fkey" FOREIGN KEY ("watchlist_id") REFERENCES "watchlists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "watchlist_animes" ADD CONSTRAINT "watchlist_animes_watchlist_id_fkey" FOREIGN KEY ("watchlist_id") REFERENCES "watchlists"("id") ON DELETE CASCADE ON UPDATE CASCADE;
