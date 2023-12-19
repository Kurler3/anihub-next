import { getCurrentUser } from '@/lib/supabase/supabase-server'
import { IUserWithConnections } from '@/types';
import React from 'react'
import WatchListForm from '../components/WatchListForm';

const CreateWatchlistPage = async () => {

    // Get current user + followers + following
    const currentUser = await getCurrentUser({
        followers: true,
        following: true,
    }) as unknown as IUserWithConnections;

    // Available people ( following + followed )
    const availableUsers = currentUser.following.filter((following) => {

        const isFollowMutual = currentUser.followers.find((follower) => follower.followerUserId === following.followedUserId) !== undefined;

        return isFollowMutual;
    }).map((following) => following.followedUser);

    return (
        <div className='w-full h-full flexStartCenter flex-col p-8 pl-12 gap-3'>

            {/* TITLE */}
            <h1 className='text-xl'>
                Create a Watchlist
            </h1>

            {/* CREATE WATCHLIST FORM */}
            <WatchListForm
                currentUser={currentUser}
                availableUsers={availableUsers}
            />


        </div>
    )
}

export default CreateWatchlistPage