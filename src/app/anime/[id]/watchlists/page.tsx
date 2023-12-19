

import CreateWatchListCard from '@/app/watchlists/components/CreateWatchListCard';
import WatchlistCard from '@/app/watchlists/components/WatchlistCard';
import PaginationComponent from '@/components/ui/PaginationComponent';
import HighlightedAnime from '@/components/ui/anime/HighlightedAnime';
import { getCurrentUser } from '@/lib/supabase/supabase-server'
import { getAnimeById, getAnimeLikes, getWatchLists } from '@/services';
import { ISearchWatchlistsParams } from '@/types';
import { redirect } from 'next/navigation';
import React from 'react'

type Props = {
    params: {
        id: string;
    };
    searchParams: ISearchWatchlistsParams
}

const AnimeWatchlistsPage = async ({
    params: {
        id
    },
    searchParams: {
        q,
        page,
    }
}: Props) => {

    // Get anime
    const anime = await getAnimeById(id);

    // Get likes
    const animeLikesMap = await getAnimeLikes(id);

    // Get current user
    const currentUser = await getCurrentUser({ sharedWatchlists: true });

    // If no user => redirect to need auth page
    if (!currentUser) {
        redirect('/need-auth');
    }

    const { watchlists, pagination } = await getWatchLists({
        q,
        page: page ?? 1,
        user: currentUser!,
        roles: ['admin', 'editor'],
    });

    return (
        <div className='w-full flexStartCenter flex-col p-4 gap-4 h-full'>

            {/* HIGHLIGHTED ANIME CARD */}
            <HighlightedAnime
                anime={anime}
                likes={animeLikesMap}
                isInAnimePage
                isInWatchlistsPage
            />

            {/* ADD AND REMOVE FROM WATCHLISTS */}
            <h2 className='text-xl mt-4'>Add and remove this anime to/from your watchlists</h2>

            {/* WATCHLISTS */}
            <div className='flex flex-wrap gap-6 flex-1 mt-5 justify-start w-full p-2'>
                {/* CREATE WATCHLIST CARD */}
                <CreateWatchListCard />

                {/* WATCHLISTS CARDS */}
                {
                    watchlists.map((watchlist, index) => {

                        return (
                            <WatchlistCard
                                key={index}
                                watchlist={watchlist}
                                currentUserId={currentUser!.id}
                                addingRemovingAnimeId={id}
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

export default AnimeWatchlistsPage