


import { getCurrentUser } from '@/lib/supabase/supabase-server';
import { createAnimeComment, getAnimeComments } from '@/services';
import { ICreateAnimeComment } from '@/types';
import { revalidatePath } from 'next/cache';
import Image from 'next/image';
import React from 'react'
import AnimeComment from './AnimeComment';

type Props = {
    animeId: number;
    episode?: number;
}

const AnimeComments = async ({ animeId, episode }: Props) => {

    // Get current user
    const user = await getCurrentUser();

    const comments = await getAnimeComments(animeId, episode);

    /////////////////////////////////////
    // FUNCTIONS ////////////////////////
    /////////////////////////////////////

    const handleCreateComment = async (formData: FormData) => {
        'use server'

        const comment = formData.get('comment') as string;

        if (comment.length === 0) {
            return;
        }

        // Build anime comment
        const animeComment = {
            userId: user?.id!,
            animeId: animeId,
            episode: episode,
            content: comment,
            parentAnimeCommentId: undefined,
        } as ICreateAnimeComment;

        // Create anime comment
        await createAnimeComment(animeComment);

        // Refresh page
        revalidatePath(`/anime/${animeId}`);

    }

    /////////////////////////////////////
    // RENDER ///////////////////////////
    /////////////////////////////////////

    return (
        <div className='w-full flexStartStart flex-col gap-4 h-full'>
            {
                user && (

                    <form action={handleCreateComment} className='w-full flexCenterCenter gap-2'>
                        <Image
                            src={user.avatarUrl!}
                            alt="Profile Pic"
                            width={40}
                            height={40}
                            className='rounded-full'
                        />
                        <textarea name='comment' className="textarea bg-bgLight textarea-ghost resize-none w-full focus:outline-none " placeholder="Share your thoughts..."></textarea>
                        <button type='submit' className="h-full btn bg-highlightedColor text-white hover:bg-highlightedHover">
                            Send
                        </button>
                    </form>

                )
            }

            <div className='h-full flexStartStart w-full flex-col gap-4'>
                {
                    comments.map((comment) => {

                        return (
                            <AnimeComment
                                key={`anime_${animeId}_comment_${comment.id}`}
                                animeComment={comment}
                                userId={user?.id}
                            />
                        )
                    })
                }
            </div>

        </div>
    )
}

export default AnimeComments