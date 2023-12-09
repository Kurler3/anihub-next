

import { IPost, IUser } from '@/types'
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link'
import React from 'react'
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { redirect } from 'next/navigation';

type Props = {
    post: IPost;
    isOwner: boolean;
    currentUser?: IUser;
}

const Post = ({
    post,
    isOwner,
    currentUser
}: Props) => {

    // Handle like post
    const handleLikePost = async (e: FormData) => {
        'use server'

        const currentUserId = e.get('currentUserId') as string;

        if (!currentUserId) {
            redirect('/need-auth');
        }

        try {

            // Get existing like.

            // Get existing dislike.

            // If was liking => remove the like.

            // Else create like.

            // If has dislike => remove dislike.


            // Revalidate page.

        } catch (error) {
            console.error('Error trying to like post...', error);
        }

    }

    // Handle dislike post
    const handleDislikePost = async (e: FormData) => {
        'use server'

        const currentUserId = e.get('currentUserId') as string;

        if (!currentUserId) {
            redirect('/need-auth');
        }

        try {

            // Get existing like.

            // Get existing dislike.

            // If was disliking => remove the dislike.

            // Else create dislike.

            // If has like => remove like.

            // Revalidate page.

        } catch (error) {
            console.error('Error trying to dislike post...', error);
        }
    }

    // Handle delete post
    const handleDeletePost = async (e: FormData) => {
        'use server'

        const currentUserId = e.get('currentUserId') as string;

        if (!currentUserId) {
            redirect('/need-auth');
        }

        try {

            // Delete post.

            // Revalidate page.


        } catch (error) {
            console.error('Error trying to delete post...', error);
        }

    }

    // Return html
    return (
        (
            <div
                className='w-[90%] min-h-[200px] flex justify-between items-start flex-col bg-bgLight p-4 rounded-md gap-2 shadow-xl  transition'
            >

                {/* AVATAR + TITLE + BODY */}
                <div className='flex flex-col justify-start items-start w-full gap-2'>

                    {/* AVATAR + TITLE */}
                    <div className='flexStartCenter gap-4'>

                        <Image
                            src={post.user.avatarUrl!}
                            alt="Profile Pic"
                            width={50}
                            height={50}
                            className='rounded-full'
                        />

                        <div className='flexCenterStart flex-col gap-4'>

                            {/* USERNAME + CREATED AT */}
                            <div className='flexCenterCenter gap-2'>

                                {/* USERNAME */}
                                <Link href={`/user/${post.user.id}`}>
                                    <div className='text-white hover:underline cursor-pointer text-xs'>
                                        {post.user.username} {isOwner ? '(You)' : ''}
                                    </div>
                                </Link>

                                {/* BULLET */}
                                <div className='text-smallInfoColor text-center'>
                                    &#8226;
                                </div>

                                {/* CREATED AT */}
                                <div className='text-smallInfoColor text-center text-sm'>
                                    {moment(post.createdAt).fromNow()}

                                </div>
                            </div>

                            {/* TITLE */}
                            <div className='text-white text-xl'>
                                {post.title}
                            </div>

                        </div>

                    </div>

                    {/* BODY */}
                    <div className='w-full p-2 resize-none max-w-8xl border-red-100 break-all transition text-sm'>
                        {
                            post.body
                        }
                    </div>
                </div>


                {/* ACTIONS (like, dislike, comment, edit (for owner only), delete (for owner only)) */}
                <div className='flex justify-start items-center gap-2'>

                    {/* LIKE BTN */}
                    <form action={handleLikePost}>
                        <button type='submit'>
                            <ThumbUpAltOutlinedIcon
                            />
                        </button>
                    </form>



                    {/* ABSOLUTE LIKES */}
                    <div className='text-white text-sm'>
                        {post.likes.length - post.dislikes.length}
                    </div>

                    {/* DISLIKE BTN */}

                    <ThumbDownOutlinedIcon
                    />



                    {/* ADD COMMENT TO COMMENT BTN */}
                    <div
                        className='flexCenterCenter gap-2 hover:bg-bgLight transition cursor-pointer p-1 text-sm rounded-md'
                    >
                        <ChatBubbleOutlineOutlinedIcon

                        />
                        <span>Reply</span>
                    </div>


                    {/* EDIT + DELETE BTNS */}
                    {
                        isOwner && (
                            <>

                                {/* EDIT */}
                                {/* <div className='flexCenterCenter gap-1 hover:bg-bgLight transition cursor-pointer p-1 text-sm rounded-md'>

                                    <ModeEditOutlineIcon />

                                    <span>Edit</span>
                                </div> */}

                                {/* DELETE */}
                                <form action={handleDeletePost}>
                                    <div className='flexCenterCenter gap-1 hover:bg-bgLight transition cursor-pointer p-1 text-sm rounded-md'>
                                        <button type='submit'>
                                            <DeleteOutlineIcon />
                                        </button>
                                        <span>Delete</span>
                                    </div>
                                </form>


                            </>
                        )
                    }

                </div>


            </div>

        )
    )
}

export default Post