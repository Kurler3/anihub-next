
/* eslint-disable @next/next/no-img-element */
import { AnimeItem, IAnimeLike } from '@/types/anime.types'
import React from 'react'
import StarRating from '../StarRating';
import Link from 'next/link';
import { IUser } from '@/types';
import FavoriteIcon from '@mui/icons-material/Favorite';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import Button from '../Button';
import { getCurrentUser } from '@/lib/supabase/supabase-server';

type Props = {
    anime: AnimeItem;
    user: IUser | null;
    likes: IAnimeLike[];
}

const HighlightedAnime = async ({ anime, likes }: Props) => {

    const user = await getCurrentUser();

    return (
        <>

            <div
                className="flexStartStart w-full h-[350px] overflow-hidden p-4 bg-bgColor rounded-md shadow-lg transition min-w-[254px] relative"
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
                    {
                        likes?.length > 0 && (
                            <div className=''>
                                {likes.length} People liked this
                            </div>
                        )
                    }

                    {/* LIKE BTN */}
                    {
                        user && (
                            <LikeForm
                                user={user}
                                anime={anime}
                            />
                        )
                    }



                </div>

                <div className='absolute bottom-4 right-4 flexCenterCenter flex-col'>

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

            </div>
        </>
    )
}

interface ILikeFormProps {
    user: IUser | null;
    anime: AnimeItem;
}

const LikeForm = ({
    anime,
    user,
}: ILikeFormProps) => {

    const handleLikeAnime = async (e: FormData) => {
        'use server'

        try {

            const animeId = e.get('animeId') as string;

            console.log('Anime id: ', animeId);

            // Make call to backend, because need to use props otherwise and that's not allowed in NextJS.
            const res = await fetch('/api/anime/like', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ animeId })
            })

            if (!res.ok) throw new Error('Error while liking anime');

            revalidatePath(window.location.origin);

        } catch (error) {
            console.error('Error whie liking anime', error);
        }
    }

    return (
        <form action={handleLikeAnime} className=''>

            <button type='submit'>
                <FavoriteIcon
                    className='text-2xl cursor-pointer hover:text-red-600 hover:scale-[1.4] transition'
                />
            </button>
            <input className='hidden' name='animeId' value={anime.mal_id.toString()} />


        </form>
    )
}

export default HighlightedAnime