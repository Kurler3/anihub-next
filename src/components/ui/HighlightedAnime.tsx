/* eslint-disable @next/next/no-img-element */
import { AnimeItem } from '@/types/anime.types'
import React from 'react'
import StarRating from './StarRating';

type Props = {
    anime: AnimeItem;
}

const HighlightedAnime = ({ anime }: Props) => {
    return (
        <div className="flexStartStart w-full h-[350px] overflow-hidden p-4 bg-bgColor rounded-md shadow-lg cursor-pointer hover:bg-bgLight transition min-w-[254px]">

            {/* IMG */}
            <img
                src={anime.images.jpg.large_image_url}
                alt="Highlighted anime"
                className="h-full object-contain rounded-md"
            />

            <div className="hidden md:flex flexStartStart flex-col ml-4 gap-3 h-full">

                {/* TITLE */}
                <h1 className="text-xl font-bold">{anime.title_japanese} ({anime.title_english})</h1>

                {/* NUM OF EPISODES */}
                <p className="mt-5">{anime.episodes} episodes</p>

                {/* DESCRIPTION */}
                <p className="text-gray-600 text-sm line-clamp-4">{anime.synopsis}</p>


                {/* GENRES */}
                <p>Genres:</p>
                <p className="text-gray-600 text-sm">{anime.genres.map((genre) => genre.name).join(' | ')}</p>

                {/* RATING STARS */}
                <StarRating
                    rating={anime.score}
                />

            </div>

        </div>
    )
}

export default HighlightedAnime