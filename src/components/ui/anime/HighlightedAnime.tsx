
/* eslint-disable @next/next/no-img-element */
import { AnimeItem, IAnimeLike } from '@/types/anime.types'
import React from 'react'
import StarRating from '../StarRating';
import Link from 'next/link';
import { IUser } from '@/types';
import FavoriteIcon from '@mui/icons-material/Favorite';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import Button from '../CustomButton';
import { getCurrentUser } from '@/lib/supabase/supabase-server';




////////////////////////////
// PROPS ///////////////////
////////////////////////////

type Props = {
    anime: AnimeItem;
    likes: IAnimeLike[];
    isInAnimePage: boolean;
}

const HighlightedAnime = async ({ anime, likes, isInAnimePage }: Props) => {


    const user = await getCurrentUser();

    const handleLikeAnime = async (e: FormData) => {
        'use server'

        try {

            const animeId = e.get('animeId') as string;
            const userId = e.get('userId') as string;

            console.log('Anime id: ', animeId);

            const existingLike = await prisma.animeLike.findFirst({
                where: {
                    userId,
                    animeId,
                },
            });

            if (existingLike) {
                await prisma.animeLike.delete({
                    where: {
                        id: existingLike.id,
                    }
                })
            } else {
                await prisma.animeLike.create({
                    data: {
                        userId,
                        animeId,
                    }
                })
            }

            // Refresh
            revalidatePath(
                isInAnimePage ? `/anime/${animeId}` : ''
            )

        } catch (error) {
            console.error('Error whie liking anime', error);
        }
    }

    const userLikesThis = user && likes ? likes.find((like) => like.userId === user.id) : false;

    return (
        <div>

            <div
                className="flexStartStart w-full min-h-[350px] h-[350px] overflow-hidden p-4 bg-bgColor rounded-md shadow-lg transition min-w-[254px]"
            >

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
                    <div className='flexCenterCenter gap-4'>

                        {
                            likes?.length > 0 && (
                                <div className='text-xs'>
                                    {likes.length} {likes.length > 1 ? 'people' : 'person'} likes this
                                </div>
                            )
                        }

                        {/* LIKE BTN */}
                        {
                            user && (
                                <form action={handleLikeAnime} className=''>

                                    <button type='submit'>
                                        <FavoriteIcon
                                            className={`text-2xl cursor-pointer hover:scale-[1.4] transition ${userLikesThis ? 'text-red-600 hover:text-[#e5e7eb]' : 'hover:text-red-600'}`}
                                        />
                                    </button>
                                    <input className='hidden' name='animeId' value={anime.mal_id.toString()} />
                                    <input className='hidden' name='userId' value={user.id.toString()} />


                                </form>
                            )
                        }
                    </div>

                </div>
                {
                    !isInAnimePage && (
                        <div className='h-full flex justify-end flex-col'>
                            {/* VIEW FULL PAGE */}
                            <Link href={`/anime/${anime.mal_id}`}>
                                <Button
                                    title='View Anime'
                                    bgColor='highlightedColor'
                                    paddingX='8'
                                    bgHoverColor='highlightedHover'
                                />
                            </Link>
                        </div>
                    )
                }


            </div>
        </div>
    )
}

export default HighlightedAnime