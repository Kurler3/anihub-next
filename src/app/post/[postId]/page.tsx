
import { getCurrentUser } from '@/lib/supabase/supabase-server';
import { getPostById } from '@/services';
import React from 'react'
import { notFound, redirect } from 'next/navigation'

type Props = {
    params: {
        postId: string;
    };
}

const PostPage = async ({
    params: { postId }
}: Props) => {

    // Get post
    const post = await getPostById(postId);

    if (!post) {
        redirect('/error?message=Post not found')
    }

    // Get current user (could be null)
    const currentUser = await getCurrentUser();

    return (
        <div>

        </div>
    )
}

export default PostPage