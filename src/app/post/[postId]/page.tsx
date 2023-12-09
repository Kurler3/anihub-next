
import { getCurrentUser } from '@/lib/supabase/supabase-server';
import { getPostById } from '@/services';
import React from 'react'
import { redirect } from 'next/navigation'
import Post from '@/components/ui/post/Post';
import { IPost } from '@/types';

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
    const currentUser = await getCurrentUser();

    // If post owner or not
    const isOwner = currentUser?.id === post.userId;

    return (
        <div className='w-full flexStartCenter flex-col p-4 gap-4 h-full'>

            {/* POST */}
            <Post
                post={post}
                isOwner={isOwner}
            />


        </div>
    )
}

export default PostPage