

import WatchListForm from '@/app/watchlists/components/WatchListForm';
import { getCurrentUser } from '@/lib/supabase/supabase-server';
import { getWatchlistById } from '@/services';
import { IUserWithConnections } from '@/types';
import { redirect } from 'next/navigation';
import React from 'react'

type Props = {
    params: {
        id: string;
    };
}

const EditWatchlistPage = async ({
    params: {
        id: watchlistId,
    }
}: Props) => {

    // Get current user
    const currentUser = await getCurrentUser({
        followers: true,
        following: true,
    }) as unknown as IUserWithConnections;

    // Available people ( following + followed )
    const availableUsers = currentUser.following.filter((following) => {
        const isFollowMutual = currentUser.followers.find((follower) => follower.followerUserId === following.followedUserId) !== undefined;
        return isFollowMutual;
    }).map((following) => following.followedUser);

    // If no current user => ded
    if (!currentUser) {
        redirect('/need-auth');
    }

    // Get watchlist
    const watchlist = await getWatchlistById(+watchlistId);

    // If no watchlist => notFound
    if (!watchlist) {
        return {
            notFound: true,
        }
    }

    const watchlistUser = watchlist.watchlistUsers.find((user) => user.userId === currentUser.id);

    // Check that the user is in the watchlist users.
    if (watchlistUser === undefined) {
        redirect('/error?message=You don\'t have access to this watchlist')
    }

    const role = watchlistUser.role;

    console.log(role)

    if (role !== 'admin') {
        redirect('/error?message=You don\'t have access to this watchlist')
    }

    return (
        <div
            className='w-full h-full flexStartCenter flex-col p-4 pl-12 gap-2'
        >

            {/* TITLE */}
            <h1 className='text-xl'>
                Edit this Watchlist
            </h1>

            {/* EDIT WATCHLIST FORM */}
            <WatchListForm
                currentUser={currentUser}
                availableUsers={availableUsers}
                existingWatchlist={watchlist}
            />

        </div>
    )
}

export default EditWatchlistPage