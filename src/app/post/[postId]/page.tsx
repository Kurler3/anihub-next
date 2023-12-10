
import { getCurrentUser } from '@/lib/supabase/supabase-server';
import { getPostById } from '@/services';
import React from 'react'
import { redirect } from 'next/navigation'
import Post from '@/components/ui/post/Post';
import { IPost, IUser } from '@/types';
import Image from 'next/image';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import PostComment from '@/components/ui/post/PostComment';

type Props = {
    params: {
        postId: string;
    };
}

const PostPage = async ({
    params: { postId }
}: Props) => {

    // Get post
    const post = await getPostById(postId) as unknown as IPost;

    if (!post) {
        redirect('/error?message=Post not found')
    }

    // Get current user (could be null)
    const currentUser = await getCurrentUser() as unknown as IUser;

    // If post owner or not
    const isOwner = currentUser?.id === post.userId;

    ////////////////////////////////////////////
    // FUNCTIONS ///////////////////////////////
    ////////////////////////////////////////////

    const handleCreateComment = async (e: FormData) => {
        'use server'

        const comment = e.get('comment') as string;
        const postId = e.get('postId') as string;
        const userId = e.get('userId') as string;

        try {

            await prisma.comment.create({
                data: {
                    userId,
                    postId: parseInt(postId),
                    content: comment,
                }
            })

            revalidatePath(`/post/${postId}`)

        } catch (error) {
            console.error('Error while commenting post...', error);
            redirect('/error?message=Error while commenting post')
        }

    }

    ////////////////////////////////////////////
    // RENDER //////////////////////////////////
    ////////////////////////////////////////////

    return (
        <div className='w-full flexStartCenter flex-col p-8 gap-4 h-full'>

            {/* POST */}
            <Post
                post={post}
                isOwner={isOwner}
                currentUser={currentUser}
            />

            {/* ADD COMMENT FORM */}
            {
                currentUser && (

                    <form action={handleCreateComment} className='w-full flexCenterCenter gap-2'>
                        <Image
                            src={currentUser.avatarUrl!}
                            alt="Profile Pic"
                            width={40}
                            height={40}
                            className='rounded-full'
                        />
                        <textarea name='comment' className="textarea bg-bgLight textarea-ghost resize-none w-full focus:outline-none " placeholder="Share your thoughts about this post..."></textarea>
                        <input type='hidden' name='postId' value={post.id} />
                        <input type='hidden' name='userId' value={currentUser.id} />
                        <button type='submit' className="h-full btn bg-highlightedColor text-white hover:bg-highlightedHover">
                            Send
                        </button>
                    </form>
                )
            }


            {/* COMMENTS */}
            <div className='h-full flexStartStart w-full flex-col gap-4'>

                {
                    post.comments.map((comment) => {

                        return (
                            <PostComment
                                key={`post_comment_${comment.id}`}
                                postComment={comment}
                                userId={currentUser?.id}
                            />
                        )
                    })
                }
            </div>

        </div>
    )
}

export default PostPage