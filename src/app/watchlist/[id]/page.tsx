

import WatchListUsersAvatars from '@/app/watchlists/components/WatchListUsersAvatars';
import HorizontalSeparator from '@/components/HorizontalSeparator';
import TextInput from '@/components/inputs/TextInput';
import Button from '@/components/ui/CustomButton';
import PaginationComponent from '@/components/ui/PaginationComponent';
import AnimeCard from '@/components/ui/anime/AnimeCard';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/supabase/supabase-server';
import { filterAndPaginateWatchlistAnimes, getManyAnimeByIds, getWatchlistById } from '@/services';
import moment from 'moment';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'

type Props = {
    searchParams: {
        q?: string
        page?: number
    };
    params: {
        id: string;
    };
}

const WatchlistPage = async ({
    params: {
        id: watchlistId,
    },
    searchParams: {
        q,
        page,
    }
}: Props) => {

    // Get current user
    const currentUser = await getCurrentUser();

    // If no current user => ded
    if (!currentUser) {
        redirect('/need-auth');
    }

    // Get watchlist
    const watchlist = await getWatchlistById(+watchlistId);

    // If no watchlist => notFound
    if (!watchlist) {
        redirect('/error?message=Couldn\'t find watchlist')
    }

    const watchlistUser = watchlist.watchlistUsers.find((user) => user.userId === currentUser.id);

    // Check that the user is in the watchlist users.
    if (watchlistUser === undefined) {
        redirect('/error?message=You don\'t have access to this watchlist')
    }

    const role = watchlistUser.role;

    // Get the animes from the watchlist
    const watchlistAnimes = await getManyAnimeByIds(watchlist.watchlistAnime.map((wa) => wa.animeId.toString()));

    // Get filtered animes (depending on the page and the search term.)
    const {
        filteredAnimeList,
        pagination
    } = filterAndPaginateWatchlistAnimes(
        watchlistAnimes,
        q,
        page,
    )


    ////////////////////////
    // FUNCTIONS ///////////
    ////////////////////////

    const handleDeleteWatchlist = async (e: FormData) => {
        'use server'

        const watchlistId = e.get('watchlistId') as string;

        try {

            // Delete
            await prisma.watchList.delete({
                where: {
                    id: +watchlistId,
                }
            })

            // Revalidate the path
            // revalidatePath('/watchlists');



        } catch (error) {
            console.error('Error while deleting watchlist...', error);
            return redirect('/error?message=Error while deleting watchlist')
        }

        // Redirect back to /watchlists
        return redirect('/watchlists');
    }



    ////////////////////////
    // RENDER //////////////
    ////////////////////////

    return (
        <div className='w-full h-full flexStartStart flex-col p-4 pl-12 gap-3'>

            {/* WATCHLIST INFO */}
            <div className='w-full flexStartStart rounded-md shadow-md bg-bgLight p-4 min-h-[200px] gap-4'>

                {/* NAME + DESCRIPTION */}
                <div className='flexStartStart flex-col flex-1 gap-4 h-full'>

                    {/* NAME */}
                    <div className='flexStartCenter gap-2'>

                        <div className='text-2xl text-white'>
                            {watchlist.name}
                        </div>

                        <div className='text-smallInfoColor text-center'>
                            &#8226;
                        </div>

                        <div className='text-sm'>
                            {moment(watchlist.createdAt).fromNow()}
                        </div>
                    </div>


                    {/* DESCRIPTION */}
                    <div className='text-sm flex-1'>
                        {watchlist.description}
                    </div>

                    {
                        role === 'admin' && (
                            <>

                                <Link href={`/watchlist/${watchlist.id}/edit`}>
                                    <Button
                                        title='Edit'
                                        bgColor='highlightedColor'
                                        className='text-xs px-5 py-3'
                                    />
                                </Link>

                                <form action={handleDeleteWatchlist}>
                                    <Button
                                        type='submit'
                                        title='Delete'
                                        bgColor='red-500'
                                        bgHoverColor='red-600'
                                        className='text-xs p-2'
                                    />
                                    <input type="hidden" name="watchlistId" value={watchlist.id} />
                                </form>
                            </>


                        )
                    }

                </div>

                {/* WATCHLIST USERS */}
                <div className='flexStartCenter flex-col gap-4'>

                    {/* MANAGE USERS */}
                    {
                        role === 'admin' && (
                            <Link href={`/watchlist/${watchlist.id}/edit`}>
                                <Button
                                    title='Manage people'
                                    bgColor='highlightedColor'
                                    className='text-xs p-2'
                                />
                            </Link>

                        )
                    }

                    {/* USERS */}
                    <WatchListUsersAvatars
                        users={watchlist.watchlistUsers.map((watchlistUser) => watchlistUser.user!)}
                        currentUserId={currentUser.id}
                    />

                    {/* NUM OF USERS */}
                    <div className='text-sm'>
                        {`${watchlist.watchlistUsers.length} ${watchlist.watchlistUsers.length > 1 ? 'People' : 'Person'}`}

                    </div>
                </div>

            </div>

            {/* SEPARATOR */}
            <HorizontalSeparator width={100} />

            {/* ANIME */}
            <div className='flex-1 w-full  flexStartCenter flex-col gap-4 p-2'>

                {/* SEARCH + FILTER */}
                <form className='w-full flexCenterCenter gap-3 flex-wrap'>

                    {/* SEARCH INPUT */}
                    <TextInput
                        name='q'
                        placeholder='Search...'
                        initialValue={q ?? ''}
                    />

                    {/* SUBMIT */}
                    <Button
                        title='Filter'
                        type='submit'
                        bgColor='highlightedColor'
                        bgHoverColor='highlightedColorHover'
                        paddingX='8'
                        className='text-sm'
                    />

                </form>

                {/* ANIME LIST + PAGINATION */}
                <div className='flex-1 w-full flex flex-col justify-between items-center'>

                    {/* ANIME LIST */}
                    <div className={`flex-1 w-full flex ${filteredAnimeList.length > 0 ? '' : 'justify-center items-center'}`}>

                        {
                            filteredAnimeList.length > 0 ? (
                                <div className='flex flex-wrap items-center gap-4'>
                                    {
                                        filteredAnimeList.map((anime) => {
                                            return (
                                                <AnimeCard
                                                    key={`watchlist_${watchlist.id}_anime_${anime.mal_id}`}
                                                    anime={anime}
                                                    isLoggedIn
                                                    isInWatchlist={role === 'admin'}
                                                />
                                            )
                                        })
                                    }
                                </div>

                            ) : (
                                <div className='text-2xl'>
                                    No animes added yet
                                </div>
                            )
                        }
                    </div>


                    {/* PAGINATION  */}
                    <PaginationComponent
                        currentPage={page ?? 1}
                        data={pagination}
                    />
                </div>



            </div>
        </div >
    )
}

export default WatchlistPage