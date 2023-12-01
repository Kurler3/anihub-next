/* eslint-disable @next/next/no-img-element */
import { AnimeItem, IAnimeLike } from '@/types/anime.types'
import React from 'react'
import StarRating from '../StarRating';
import Link from 'next/link';
import { IUser } from '@/types';
import FavoriteIcon from '@mui/icons-material/Favorite';
type Props = {
    anime: AnimeItem;
    user: IUser | null;
    likes: IAnimeLike[]
}

const HighlightedAnime = ({ anime, user, likes }: Props) => {


    return (
        <Link href={`/anime/${anime.mal_id}`}>
            <div className="flexStartStart w-full h-[350px] relative overflow-hidden p-4 bg-bgColor rounded-md shadow-lg cursor-pointer hover:bg-bgLight transition min-w-[254px]">

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

                    {/* NUM PEOPLE LIKED THIS */}

                    {/* LIKE BTN */}
                    {
                        user && (
                            <form className=''>
                                <FavoriteIcon
                                    className='text-2xl cursor-pointer hover:text-red-600 hover:scale-[1.4] transition'
                                />
                            </form>
                        )
                    }

                </div>




            </div>
        </Link>
    )
}

export default HighlightedAnime