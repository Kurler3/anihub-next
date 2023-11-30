

import Button from '@/components/ui/Button';
import { getCurrentUser } from '@/lib/supabase/supabase-server';
import { getUserById } from '@/services';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react'

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


    const isCurrentUserFollowing = currentUser ? user.followers.some(follower => follower.followerId === currentUser.id) : false;

    ////////////////////////////
    // RENDER //////////////////
    ////////////////////////////

    return (
        <div className='w-full flexStartStart flex-col p-4 gap-4 h-full'>

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

                    <p className='text-xs md:text-sm'>
                        {user.bio ?? 'An anime lover'}
                    </p>

                </div>

                {/* POSTS + FOLLOWERS + FOLLOWING + Follow BTN */}
                <div className='flex-1 h-full flexStartCenter flex-col gap-16 border border-red-600 p-2'>

                    {/* POSTS + FOLLOWERS + FOLLOWING COUNT */}
                    <div className='flexCenterCenter gap-16 w-full'>

                        {/* POSTS */}
                        <div className='flexCenterCenter flex-col text-white px-8 cursor-pointer hover:bg-bgColor'>
                            <div className='text-xl'>{user.posts.length}</div>
                            <h2 className='text-lg'>Posts</h2>
                        </div>

                        {/* FOLLOWERS */}
                        <div className='flexCenterCenter flex-col text-white px-8'>
                            <div className='text-xl'>{user.followers.length}</div>
                            <h2 className='text-lg'>Followers</h2>
                        </div>

                        {/* FOLLOWING */}
                        <div className='flexCenterCenter flex-col text-white px-8'>
                            <div className='text-xl'>{user.following.length}</div>
                            <h2 className='text-lg'>Following</h2>
                        </div>

                    </div>

                    {/* FOLLOW / UNFOLLOW BTN / EDIT BTN */}
                    <div className='flexCenterCenter mr-6'>

                        {
                            currentUser ?

                                isCurrentUserFollowing ? (
                                    <form>
                                        <button>
                                            Unfollow
                                        </button>

                                    </form>
                                ) : (
                                    <form className='flexCenterCenter'>
                                        <Button
                                            title='Follow'
                                            bgColor='highlightedColor'
                                            paddingX='12'

                                        />
                                    </form>
                                )
                                : null
                        }

                    </div>


                </div>

            </div>

            {/* SEPARATOR */}

            {/* POSTS/WATCHLISTS TAB */}


        </div>
    )
}

export default UserPage