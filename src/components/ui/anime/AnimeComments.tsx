


import { getCurrentUser } from '@/lib/supabase/supabase-server';
import { createAnimeComment, getAnimeComments } from '@/services';
import { ICreateAnimeComment } from '@/types';
import { revalidatePath } from 'next/cache';
import Image from 'next/image';
import React from 'react'
import SendIcon from '@mui/icons-material/Send';

type Props = {
    animeId: number;
    episode?: number;
}

const AnimeComments = async ({ animeId, episode }: Props) => {

    // Get current user
    const user = await getCurrentUser();

    const comments = await getAnimeComments(animeId);

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
        <div className='w-full flexStartStart flex-col gap-4'>
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
                        <textarea name='comment' className="textarea textarea-ghost resize-none focus:bg-transparent w-full focus:outline-none " placeholder="Share your thoughts..."></textarea>
                        <button type='submit' className="h-full">
                            <SendIcon />
                        </button>
                    </form>

                )
            }

            {
                comments.map((comment) => {

                    return (
                        <div
                            key={`anime_${animeId}_comment_${comment.id}`}
                            className='flexStartStart gap-2 w-full'
                        >

                            {/* AVATAR + EXPAND LINE */}
                            <div className='flexStartCenter flex-col h-full gap-1 min-w-fit' style={{ minHeight: '100%' }}>

                                <Image
                                    src={comment.user.avatarUrl}
                                    alt='User pic'
                                    width={40}
                                    height={40}
                                    className='rounded-full'
                                />

                                <div
                                    className='bg-separatorColor flex-1 cursor-pointer hover:bg-slate-500 transition'
                                    style={{
                                        width: '2.5px',
                                        minHeight: '20px'
                                    }}
                                >
                                </div>
                            </div>

                            <div
                                className="bg-transparent resize-none max-w-6xl border-red-100 break-all"
                            >
                                {comment.content}
                            </div>

                        </div>
                    )
                })
            }
        </div>
    )
}

export default AnimeComments