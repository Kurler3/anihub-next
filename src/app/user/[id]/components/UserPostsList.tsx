import { IFullUser, IUser } from '@/types'
import React from 'react'
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import Link from 'next/link';
import Image from 'next/image';
import moment from 'moment';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { handleError } from '@/lib/utils';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

type Props = {
    user: IFullUser;
    isOwner: boolean;
    currentUser: IUser;
}

const UserPostsList = ({ user, isOwner, currentUser }: Props) => {

    // Handle create post
    const handleCreatePost = async (e: FormData) => {
        'use server'

        const currentUserId = e.get('currentUserId') as string;
        const body = e.get('body') as string;
        const title = e.get('title') as string;

        if (title.length === 0 || body.length === 0) {
            return;
        }

        try {

            await prisma.post.create({
                data: {
                    userId: currentUserId,
                    body,
                    title
                }
            })

            e.set('body', '');
            e.set('title', '')

            revalidatePath(`/user/${currentUserId}`);



        } catch (error) {
            handleError(error, 'Something went wrong while creating post');
        }

    }

    return (
        <>

            {/* IF OWNER => SHOW MAKE POST INPUT */}
            {
                isOwner && (
                    <form action={handleCreatePost} className='w-[90%] flex justify-center items-start gap-2'>
                        <Image
                            src={currentUser.avatarUrl!}
                            alt="Profile Pic"
                            width={40}
                            height={40}
                            className='rounded-full'
                        />
                        <div className='flex justify-start items-center w-full flex-col gap-3'>
                            <input
                                name='title'
                                className="input bg-bgLight input-ghost w-full focus:outline-none"
                                placeholder='Title'
                            />
                            <textarea name='body' className="textarea bg-bgLight textarea-ghost resize-none w-full focus:outline-none " placeholder="Share your thoughts..."></textarea>
                        </div>

                        <button type='submit' className="h-full btn bg-highlightedColor text-white hover:bg-highlightedHover">
                            Send
                        </button>
                        <input
                            type='hidden'
                            name='currentUserId'
                            value={currentUser.id}
                            className='hidden'
                        />
                    </form>
                )
            }



            {
                user.posts.length > 0 ? user.posts.map((post) => {

                    // Is current user liking post
                    const isCurrentUserLikingPost = currentUser ? post.likes.find((like) => like.userId === currentUser.id) : false;

                    // Is current user disliking post
                    const isCurrentUserDislikingPost = currentUser ? post.dislikes.find((dislike) => dislike.userId === currentUser.id) : false;

                    return (
                        <Link
                            key={`post_${post.id}`}
                            href={`/post/${post.id}`}
                            className='w-[90%] flexStartStart flex-col bg-bgLight p-4 rounded-md gap-2 shadow-xl hover:bg-bgLighter transition'
                        >


                            {/* AVATAR + TITLE */}
                            <div className='flexStartCenter gap-4'>

                                <Image
                                    src={user.avatarUrl!}
                                    alt="Profile Pic"
                                    width={50}
                                    height={50}
                                    className='rounded-full'
                                />

                                <div className='flexCenterStart flex-col gap-4'>

                                    {/* USERNAME + CREATED AT */}
                                    <div className='flexCenterCenter gap-2'>

                                        {/* USERNAME */}
                                        <Link href={`/user/${user.id}`}>
                                            <div className='text-white hover:underline cursor-pointer text-xs'>
                                                {user.username} {isOwner ? '(You)' : ''}
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

                            {/* ACTIONS (like, dislike, comment, edit (for owner only), delete (for owner only)) */}
                            <div className='flex justify-start items-center gap-2'>

                                {/* LIKE BTN */}

                                <ThumbUpAltOutlinedIcon
                                    className={`${isCurrentUserLikingPost ? 'text-red-400' : ''}`}
                                />


                                {/* ABSOLUTE LIKES */}
                                <div className='text-white text-sm'>
                                    {post.likes.length - post.dislikes.length}
                                </div>

                                {/* DISLIKE BTN */}

                                <ThumbDownOutlinedIcon
                                    className={`${isCurrentUserDislikingPost ? 'text-blue-400' : ''}`}
                                />



                                {/* ADD COMMENT TO COMMENT BTN */}
                                <div
                                    className='flexCenterCenter gap-2  transition cursor-pointer p-1 text-sm rounded-md'
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
                                            {/* <div className='flexCenterCenter gap-1  transition cursor-pointer p-1 text-sm rounded-md'>

                                                <ModeEditOutlineIcon />

                                                <span>Edit</span>
                                            </div> */}

                                            {/* DELETE */}
                                            <div className='flexCenterCenter gap-1  transition cursor-pointer p-1 text-sm rounded-md'>
                                                <DeleteOutlineIcon />
                                                <span>Delete</span>
                                            </div>

                                        </>
                                    )
                                }

                            </div>


                        </Link>

                    )

                }) : (
                    <div className='text-lg mt-10'>
                        {
                            isOwner ? 'You haven\'t posted anything yet' : 'This user hasn\'t posted anything yet'
                        }
                    </div>
                )
            }

        </>
    )
}

export default UserPostsList