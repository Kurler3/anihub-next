

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
            {
                posts.length > 0 ? (
                    <div className='flexStartStart gap-4 flex-col w-full flex-1'>

                        {
                            posts.map((post) => {

                                return (
                                    <Post
                                        key={`post_${post.id}`}
                                        post={post}
                                        currentUser={currentUser}
                                        currentPath='/social'
                                    />
                                )

                            })
                        }
                    </div>
                ) : (
                    <h1 className='mt-20 text-xl'>
                        No posts yet! 😢
                    </h1>
                )
            }

            {/* PAGINATION */}
            {
                (!page || page === 1) && posts.length === 0 ? null : (
                    <PaginationComponent
                        currentPage={
                            page ? typeof page === 'string' ? parseInt(page) : page : 1
                        }
                        data={pagination}
                    />
                )
            }


        </div>
    )
}

export default SocialPagePosts