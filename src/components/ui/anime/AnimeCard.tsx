/* eslint-disable @next/next/no-img-element */

import { AnimeItem } from '@/types/anime.types'
import Link from 'next/link';
import React from 'react'

type Props = {
    anime: AnimeItem;
}

const AnimeCard = ({ anime }: Props) => {
    console.log(anime.episodes)
    return (
        <Link href={`/anime/${anime.mal_id}`}>
            <div

                className='flexCenterCenter flex-col overflow-hidden rounded-md w-[225px] cursor-pointer hover:shadow-2xl transition'
            >
                <img
                    src={anime.images.jpg.image_url}
                    alt={`${anime.title}'s image`}
                    className='object-cover h-80 min-w-full'
                />

                <div className="w-full bg-bgColor flexCenterStart flex-col p-2 truncate">
                    <div className="w-full truncate text-sm">
                        {anime.title}
                    </div>
                    {
                        anime.episodes && (
                            <div className="text-xs">
                                {anime.episodes} episodes
                            </div>
                        )
                    }

                </div>
            </div>
        </Link>

    )
}

export default AnimeCard