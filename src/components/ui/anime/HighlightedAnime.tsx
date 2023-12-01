
/* eslint-disable @next/next/no-img-element */
import { AnimeItem, IAnimeLike } from '@/types/anime.types'
import React from 'react'
import StarRating from '../StarRating';
import Link from 'next/link';
import { IUser } from '@/types';
import FavoriteIcon from '@mui/icons-material/Favorite';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';


type Props = {
    anime: AnimeItem;
    user: IUser | null;
    likes: IAnimeLike[];
}

const HighlightedAnime = ({ anime, user, likes }: Props) => {

    const handleLikeAnime = async (e: FormData) => {
        'use server';

        if (!user) return;

        try {

            await prisma.animeLike.create({
                data: {
                    animeId: anime.mal_id.toString(),
                    userId: user?.id
                }
            })

            revalidatePath(window.location.origin);

        } catch (error) {
            console.error('Error whie liking anime');
        }

    }

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
                    {
                        likes.length > 0 && (
                            <div className=''>
                                {likes.length} People liked this
                            </div>
                        )
                    }

                    {/* LIKE BTN */}
                    {
                        user && (
                            <form action={handleLikeAnime} className=''>
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