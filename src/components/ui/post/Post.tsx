

import { IPost, IUser } from '@/types'
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link'
import React from 'react'
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { deletePost, dislikePost, likePost } from '@/services';

type Props = {
    post: IPost;
    currentUser?: IUser;
}

const Post = ({
    post,
    currentUser
}: Props) => {

    //////////////////////////////////////
    // VARS //////////////////////////////
    //////////////////////////////////////

    const isOwner = currentUser ? post.userId === currentUser.id : false;

    // Is liking
    const isLiking = currentUser ? post.likes.find((like) => like.userId === currentUser.id) : false;

    // Is disliking
    const isDisliking = currentUser ? post.dislikes.find((dislike) => dislike.userId === currentUser.id) : false;

    //////////////////////////////////////
    // FUNCTIONS /////////////////////////
    //////////////////////////////////////

    // Handle like post
    const handleLikePost = async (e: FormData) => {
        'use server'
        const currentUserId = e.get('currentUserId') as string;
        const postId = e.get('postId') as string;
        const numPostId = parseInt(postId)
        // Like post
        await likePost({
            postId: numPostId,
            userId: currentUserId,
        })
    }

    // Handle dislike post
    const handleDislikePost = async (e: FormData) => {
        'use server'
        const currentUserId = e.get('currentUserId') as string;
        const postId = e.get('postId') as string;
        const numPostId = parseInt(postId)
        await dislikePost({
            postId: numPostId,
            userId: currentUserId,
        })
    }

    // Handle delete post
    const handleDeletePost = async (e: FormData) => {
        'use server'
        const postId = e.get('postId') as string;
        await deletePost(parseInt(postId));
    }

    /////////////////////////////////////////////
    // RETURN HTML //////////////////////////////
    /////////////////////////////////////////////

    return (
        (
            <div
                className='w-full min-h-[300px] flex justify-between items-start flex-col bg-[#3b3b3b] p-4 rounded-md gap-2 shadow-xl  transition'
            >

                {/* AVATAR + TITLE + BODY */}
                <Link href={`/post/${post.id}`} className='flex-1 w-full hover:bg-bgLight p-2 rounded-md transition'>

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
                        <div className='w-full  p-2 resize-none max-w-8xl border-red-100 break-all transition text-sm'>
                            {
                                post.body
                            }
                        </div>
                    </div>
                </Link>
                {/* ACTIONS (like, dislike, comment, edit (for owner only), delete (for owner only)) */}
                <div className='flex justify-start items-center gap-2'>

                    {/* LIKE BTN */}
                    <form action={handleLikePost}>
                        <button type='submit'>
                            <ThumbUpAltOutlinedIcon
                                className={`${isLiking ? 'text-red-400' : 'hover:text-red-400'}`}
                            />
                        </button>
                        <input
                            type='hidden'
                            name='currentUserId'
                            value={currentUser?.id}
                        />
                        <input
                            type='hidden'
                            name='postId'
                            value={post.id}
                        />
                    </form>

                    {/* ABSOLUTE LIKES */}
                    <div className='text-white text-sm'>
                        {post.likes.length - post.dislikes.length}
                    </div>

                    {/* DISLIKE BTN */}
                    <form action={handleDislikePost}>
                        <button type='submit'>
                            <ThumbDownOutlinedIcon
                                className={`${isDisliking ? 'text-blue-400' : 'hover:text-blue-400'}`}
                            />
                        </button>
                        <input
                            type='hidden'
                            name='currentUserId'
                            value={currentUser?.id}
                        />
                        <input
                            type='hidden'
                            name='postId'
                            value={post.id}
                        />
                    </form>


                    {/* ADD COMMENT TO COMMENT BTN */}
                    {/* <div
                        className='flexCenterCenter gap-2 hover:bg-bgLighter transition cursor-pointer p-1 text-sm rounded-md'
                    >
                        <ChatBubbleOutlineOutlinedIcon

                        />
                        <span>Reply</span>
                    </div> */}


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
                                    <div className='flexCenterCenter gap-1 hover:bg-bgLighter hover:text-red-400 transition cursor-pointer p-1 text-sm rounded-md'>
                                        <button type='submit'>
                                            <DeleteOutlineIcon />
                                        </button>
                                        <span>Delete</span>
                                    </div>
                                    <input
                                        type='hidden'
                                        name='postId'
                                        value={post.id}
                                    />
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