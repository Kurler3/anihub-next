

import HorizontalSeparator from '@/components/HorizontalSeparator';
import Button from '@/components/ui/Button';
import { getCurrentUser } from '@/lib/supabase/supabase-server';
import { getUserById } from '@/services';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import LockIcon from '@mui/icons-material/Lock';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

type Props = {
    params: {
        id: string;
    };
}

const UserPage = async ({
    params: {
        id,
    }
}: Props) => {

    // Get current user
    const currentUser = await getCurrentUser();

    const user = await getUserById(id);

    if (!user) redirect('/error?message=User not found')


    const isCurrentUserFollowing = currentUser && currentUser.id !== user.id ? user.followers.some(follower => follower.followerUserId === currentUser.id) : false;

    const isRequestingFollow = currentUser && currentUser.id !== user.id ? user.followerRequests.some((followRequest) => followRequest.followerUserId === currentUser.id) : false;

    const isOwner = currentUser && currentUser.id === user.id;

    ////////////////////////////
    // SERVER ACTIONS //////////
    ////////////////////////////

    // Handle follow
    const handleFollow = async (e: FormData) => {
        'use server'

        const currentUserId = e.get('currentUserId') as string;
        const userId = e.get('userId') as string;

        try {

            // If user is not public => create follow request
            if (!user.isProfilePublic) {

                await prisma.followRequest.create({
                    data: {
                        followerUserId: currentUserId,
                        followedUserId: userId,
                    }
                })

                // else => create follow
            } else {

                await prisma.follow.create({
                    data: {
                        followerUserId: currentUserId,
                        followedUserId: userId,
                    }
                })

            }

            // Revalidate path.
            revalidatePath(`/user/${userId}`);

        } catch (error) {
            // Catch error
            console.log(error);

            redirect('/error?message=Error while following user')
        }
    }

    // Handle unfollow
    const handleUnfollow = async (e: FormData) => {
        'use server'

        const currentUserId = e.get('currentUserId') as string;
        const userId = e.get('userId') as string;

        try {

            await prisma.follow.delete({
                where: {
                    followedUserId_followerUserId: {
                        followerUserId: currentUserId,
                        followedUserId: userId,
                    }
                }
            })

            // Revalidate path.
            revalidatePath(`/user/${userId}`);

        } catch (error) {
            // Catch error
            console.log(error);

            redirect('/error?message=Error while following user')
        }

    }

    // Handle cancel follow request
    const handleCancelFollowRequest = async (e: FormData) => {
        'use server'

        const currentUserId = e.get('currentUserId') as string;
        const userId = e.get('userId') as string;

        try {

            await prisma.followRequest.delete({
                where: {
                    followerUserId_followedUserId: {
                        followerUserId: currentUserId,
                        followedUserId: userId
                    }
                }
            });

            // Revalidate path.
            revalidatePath(`/user/${userId}`);

        } catch (error) {
            // Catch error
            console.log(error);

            redirect('/error?message=Error while canceling the follow request')
        }

    }

    ////////////////////////////
    // RENDER //////////////////
    ////////////////////////////

    return (
        <div className='w-full flexStartCenter flex-col p-4 gap-4 h-full'>

            {/* TOP PART (USER INFO) */}
            <div className='flexStartStart w-full p-4 px-10 gap-10'>

                {/* AVATAR + NAME + BIO */}
                <div className='flexStartStart w-[20%] flex-col gap-4'>

                    <Image
                        src={user.avatarUrl!}
                        alt="Profile Pic"
                        width={130}
                        height={130}
                        className='rounded-full'
                    />

                    <h2 className='text-lg text-white'>
                        {user.username}
                    </h2>

                    <p className='text-xs md:text-sm p-2'>
                        {user.bio ?? 'An anime lover'}
                    </p>

                </div>

                {/* POSTS + FOLLOWERS + FOLLOWING + Follow BTN */}
                <div className='flex-1 h-full flexStartCenter flex-col gap-16 py-10'>

                    {/* POSTS + FOLLOWERS + FOLLOWING COUNT */}
                    <div className='flexCenterCenter gap-16 w-full'>

                        {/* POSTS */}
                        <div className='flexCenterCenter flex-col text-white py-2 px-8 rounded-md transition'>
                            <div className='text-xl'>{user.posts.length}</div>
                            <h2 className='text-lg'>Posts</h2>
                        </div>

                        {/* FOLLOWERS */}
                        <Link
                            href={`${isOwner ? '/me/connections?tab=followers' : `/user/${user.id}`}`}
                            className={`flexCenterCenter flex-col text-white px-8 py-2 rounded-md transition ${isOwner ? 'cursor-pointer hover:bg-bgColor' : 'cursor-default'}`}
                        >
                            <div className='text-xl'>{user.followers.length}</div>
                            <h2 className='text-lg'>Followers</h2>
                        </Link>

                        {/* FOLLOWING */}
                        <Link
                            href={`${isOwner ? '/me/connections?tab=followers' : `/user/${user.id}`}`}
                            className={`flexCenterCenter flex-col text-white px-8 py-2 rounded-md transition ${isOwner ? 'cursor-pointer hover:bg-bgColor' : 'cursor-default'}`}
                        >
                            <div className='text-xl'>{user.following.length}</div>
                            <h2 className='text-lg'>Following</h2>
                        </Link>

                    </div>

                    {/* FOLLOW / UNFOLLOW BTN / EDIT BTN */}
                    <div className='flexCenterCenter mr-6'>

                        {
                            currentUser ?
                                isOwner ? (
                                    <div className='flexCenterCenter gap-3'>

                                        {/* EDIT BTN */}
                                        <Link href='/me/edit'>
                                            <Button
                                                title='Edit'
                                                bgColor='bgLight'
                                                paddingX='12'
                                                bgHoverColor='bgLighter'
                                            />
                                        </Link>

                                        {
                                            user.followerRequests.length > 0 && (
                                                <Link href='/me/connections'>
                                                    <Button
                                                        title={`View follow requests (${user.followerRequests.length})`}
                                                        bgColor='highlightedColor'
                                                        paddingX='12'
                                                    />
                                                </Link>
                                            )
                                        }
                                    </div>

                                ) :
                                    isRequestingFollow ? (
                                        <form action={handleCancelFollowRequest}>
                                            <Button
                                                title='Cancel follow request'
                                                bgColor='bgLight'
                                                paddingX='12'
                                                bgHoverColor='bgLighter'
                                                type='submit'
                                            />
                                            <input
                                                type='hidden'
                                                className='hidden'
                                                name='currentUserId'
                                                value={currentUser!.id}
                                            />
                                            <input
                                                type='hidden'
                                                className='hidden'
                                                name='userId'
                                                value={user.id}
                                            />

                                        </form>
                                    ) :
                                        isCurrentUserFollowing ? (
                                            <form action={handleUnfollow}>
                                                <Button
                                                    title='Unfollow'
                                                    bgColor='bgLight'
                                                    paddingX='12'
                                                    bgHoverColor='bgLighter'
                                                    type='submit'
                                                />
                                                <input
                                                    type='hidden'
                                                    className='hidden'
                                                    name='currentUserId'
                                                    value={currentUser!.id}
                                                />
                                                <input
                                                    type='hidden'
                                                    className='hidden'
                                                    name='userId'
                                                    value={user.id}
                                                />
                                            </form>
                                        ) : (
                                            <form action={handleFollow}>
                                                <Button
                                                    title='Follow'
                                                    bgColor='highlightedColor'
                                                    paddingX='12'
                                                    type='submit'
                                                />
                                                <input
                                                    type='hidden'
                                                    className='hidden'
                                                    name='currentUserId'
                                                    value={currentUser!.id}
                                                />
                                                <input
                                                    type='hidden'
                                                    className='hidden'
                                                    name='userId'
                                                    value={user.id}
                                                />
                                            </form>
                                        )
                                : null
                        }

                    </div>


                </div>

            </div>

            {/* SEPARATOR */}
            <HorizontalSeparator
                width={80}
            />

            {/* POSTS TAB */}
            {
                user.isProfilePublic || isOwner || isCurrentUserFollowing ?
                    user.posts.length > 0 ? user.posts.map((post) => {

                        return (
                            <Link
                                key={`post_${post.id}`}
                                href={`/post/${post.id}`}
                                className='w-[90%] flexStartStart flex-col bg-bgLight p-4 rounded-md gap-2 shadow-xl'
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

                                    />


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
                                                <div className='flexCenterCenter gap-1 hover:bg-bgLight transition cursor-pointer p-1 text-sm rounded-md'>

                                                    <ModeEditOutlineIcon />

                                                    <span>Edit</span>
                                                </div>

                                                {/* DELETE */}
                                                <div className='flexCenterCenter gap-1 hover:bg-bgLight transition cursor-pointer p-1 text-sm rounded-md'>
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
                    ) :

                    <div className='flexCenterCenter flex-col m-auto p-8 rounded-md shadow-lg gap-8 bg-bgColor'>

                        <LockIcon fontSize='large' />

                        <div className='text-lg'>
                            Follow this user to see his posts
                        </div>
                    </div>

            }


        </div>
    )
}

export default UserPage