


import { IWatchList } from '@/types'
import Image from 'next/image';
import React from 'react';
import squirtle from '@/images/squirtle.jpg'
import { getAnimeById } from '@/services';
import { WATCHLIST_ROLE_COLORS } from '@/lib/constants';
import WatchListUsersAvatars from './WatchListUsersAvatars';
import Link from 'next/link';

type Props = {
    watchlist: IWatchList;
    currentUserId: string;
}

const WatchlistCard = async ({
    watchlist,
    currentUserId,
}: Props) => {


    const role = watchlist.watchlistUsers.find((user) => user.userId === currentUserId)!.role as keyof typeof WATCHLIST_ROLE_COLORS;

    const roleColors = WATCHLIST_ROLE_COLORS[role];


    let imgSrc: string = '';

    if (watchlist.watchlistAnime.length > 0) {
        // Get anime url
        const anime = await getAnimeById(watchlist.watchlistAnime[0].animeId.toString());

        imgSrc = anime.images.jpg.image_url;

    }

    return (
        <Link href={`/watchlist/${watchlist.id}`}>
            <div className='
                w-[250px] h-[350px] bg-bgLight rounded-md flexStartCenter flex-col border border-bgLight hover:border-highlightedColor
                hover:shadow-md transition hover:scale-105
            '>

                {/* NAME + ROLE */}
                <div className='bg-bgColor text-sm flex justify-between items-center w-full p-2 px-4 rounded-t-md gap-4'>

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

                </div>

                {/* FIRST ANIME IMG / DEFAULT IF NONE */}
                <div className='flexCenterCenter flex-1'>
                    <Image
                        src={imgSrc.length > 0 ? imgSrc : squirtle}
                        alt='Watchlist img'
                        height={100}
                        width={150}
                        className='object-cover'
                    />
                </div>

                {/* ANIME COUNT + PEOPLE COUNT + PEOPLE AVATARS */}
                <div className='bg-bgColor text-sm flex justify-between items-center w-full p-2 px-4 rounded-b-md gap-4'>

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


                </div>

            </div>
        </Link>
    )
}

export default WatchlistCard