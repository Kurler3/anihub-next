

import PaginationComponent from '@/components/ui/PaginationComponent';
import Post from '@/components/ui/post/Post';
import { getSocialPagePosts } from '@/services';
import { IUserWithFollowing } from '@/types'
import React from 'react'

type Props = {
    currentUser?: IUserWithFollowing;
    page?: number,
}

const SocialPagePosts = async ({
    currentUser,
    page,
}: Props) => {

    const {
        posts,
        pagination,
    } = await getSocialPagePosts({
        currentUser,
        page,
    })


    return (
        <div className='flex justify-between items-center flex-col gap-4 w-full h-full'>

            {/* POSTS */}
            <div className='flexStartStart gap-4 flex-col w-full'>
                {
                    posts.map((post) => {

                        return (
                            <Post
                                key={`post_${post.id}`}
                                post={post}
                                currentUser={currentUser}
                            />
                        )

                    })
                }
            </div>


            {/* PAGINATION */}
            <PaginationComponent
                currentPage={
                    page ? typeof page === 'string' ? parseInt(page) : page : 1
                }
                data={pagination}
            />

        </div>
    )
}

export default SocialPagePosts