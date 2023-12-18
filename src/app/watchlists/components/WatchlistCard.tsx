
import { AnimeItem, IWatchList } from '@/types'
import Image from 'next/image';
import React from 'react';
import squirtle from '@/images/squirtle.jpg'

import { WATCHLIST_ROLE_COLORS } from '@/lib/constants';
import WatchListUsersAvatars from './WatchListUsersAvatars';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { getAnimeById } from '@/services';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { revalidatePath } from 'next/cache';


type Props = {
    watchlist: IWatchList;
    currentUserId: string;
    addingRemovingAnimeId?: string;
}

const WatchlistCard = async ({
    watchlist,
    currentUserId,
    addingRemovingAnimeId,
}: Props) => {

    const role = watchlist.watchlistUsers.find((user) => user.userId === currentUserId)!.role as keyof typeof WATCHLIST_ROLE_COLORS;
    const roleColors = WATCHLIST_ROLE_COLORS[role];

    const firstAnime = watchlist.watchlistAnime.length > 0 && watchlist.watchlistAnime[0].animeImgUrl ? watchlist.watchlistAnime[0] : undefined;

    const isAnimeInWatchlist = addingRemovingAnimeId ? watchlist.watchlistAnime.find((wa) => wa.animeId === addingRemovingAnimeId) !== undefined : false;

    let anime: AnimeItem;

    if (addingRemovingAnimeId) {
        anime = await getAnimeById(addingRemovingAnimeId)
    }

    ////////////////////////////////////
    // FUNCTIONS ///////////////////////
    ////////////////////////////////////

    // Go to watchlist page
    const handleGoToWatchlistPage = async () => {
        'use server'
        redirect(`/watchlist/${watchlist.id}`)
    }

    // Add/remove anime from watchlist
    const handleAddRemoveAnimeFromWatchlist = async () => {
        'use server'

        try {

            if (isAnimeInWatchlist) {
                await prisma.watchlistAnime.delete({
                    where: {
                        watchListId_animeId: {
                            watchListId: watchlist.id,
                            animeId: addingRemovingAnimeId!
                        }
                    }
                })
            } else if (anime) {
                await prisma.watchlistAnime.create({
                    data: {
                        watchListId: watchlist.id,
                        animeId: addingRemovingAnimeId!,
                        animeImgUrl: anime?.images?.jpg?.image_url,
                    }
                })
            }

            revalidatePath(`/anime/${addingRemovingAnimeId}/watchlists`);

        } catch (error) {

            console.error('Error while adding/removing anime to/from watchlist...', error);

            redirect('/error?message=Something went wrong! try again please')
        }

    }

    ////////////////////////////////////
    // RENDER //////////////////////////
    ////////////////////////////////////

    return (
        <form
            className={`
                    w-[250px] h-[400px] bg-bgLight rounded-md flexStartCenter flex-col border border-bgLight hover:border-highlightedColor
                    hover:shadow-md transition hover:scale-105 cursor-pointer relative
                    ${addingRemovingAnimeId ?
                    isAnimeInWatchlist ?
                        'hover:border-red-500'
                        :
                        'hover:border-green-500'
                    :
                    ''
                }
                    `}
            action={addingRemovingAnimeId ? handleAddRemoveAnimeFromWatchlist : handleGoToWatchlistPage}
        >

            {/* NAME + ROLE */}
            <button type={addingRemovingAnimeId ? 'button' : 'submit'} className='bg-bgColor text-sm flex justify-between items-center w-full p-2 px-4 rounded-t-md gap-4'>

                {/* NAME */}
                <div className='text-white truncate'>
                    {watchlist.name}
                </div>

                {/* ROLE */}
                <div
                    className={`${roleColors.bgColor} ${roleColors.textColor} border ${roleColors.borderColor} px-2 py-1 rounded-md`}
                >
                    {role}
                </div>

            </button>

            {/* ADD/REMOVE ICON */}
            {addingRemovingAnimeId && (
                <div className="flexCenterCenter h-full absolute top-0 left-0 w-full text-white z-20">
                    {
                        isAnimeInWatchlist ?
                            <div className='bg-red-400 rounded-full border border-red-500 hover:bg-red-600 transition'>
                                <button type='submit'>
                                    <DeleteIcon className='text-white text-[100px]' />
                                </button>

                            </div>
                            :
                            <div className='bg-green-400 rounded-full border border-green-500 hover:bg-green-600 transition'>
                                <button type='submit'>
                                    <AddIcon className='text-white text-[100px]' />
                                </button>
                            </div>

                    }
                </div>
            )}

            {/* Semi-transparent overlay */}
            {addingRemovingAnimeId && <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50" />}

            {/* FIRST ANIME IMG / DEFAULT IF NONE */}
            <button type={addingRemovingAnimeId ? 'button' : 'submit'} className='flexCenterCenter flex-1'>
                <Image
                    src={firstAnime ? firstAnime.animeImgUrl : squirtle}
                    alt='Watchlist img'
                    height={100}
                    width={250}
                    className='object-cover min-w-full overflow-hidden max-h-[280px]'
                />
            </button>

            {/* ANIME COUNT + PEOPLE COUNT + PEOPLE AVATARS */}
            <button type={addingRemovingAnimeId ? 'button' : 'submit'} className='bg-bgColor text-sm flex justify-between items-center w-full p-2 px-4 rounded-b-md gap-4'>

                {/* ANIME COUNT + PEOPLE COUNT */}
                <div
                    className='flexStartCenter gap-1 text-xs'
                >

                    {/* ANIME COUNT */}
                    <div>
                        {`${watchlist.watchlistAnime.length} `}

                        Animes
                    </div>

                    {/* BULLET */}
                    <div className='text-smallInfoColor text-center'>
                        &#8226;
                    </div>

                    {/* PEOPLE COUNT */}
                    <div>
                        {
                            watchlist.watchlistUsers.length
                        }

                        {
                            watchlist.watchlistUsers.length > 1 ?
                                ' People' : 'Person'
                        }
                    </div>

                </div>


                {/* PEOPLE AVATARS */}
                <WatchListUsersAvatars
                    users={watchlist.watchlistUsers.map((watchlistuser) => watchlistuser.user!)}
                    currentUserId={currentUserId}
                />


            </button>


        </form>

    )
}

export default WatchlistCard