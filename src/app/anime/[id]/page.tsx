

import AnimeEpisodesList from '@/components/ui/anime/AnimeEpisodesList';
import HighlightedAnime from '@/components/ui/anime/HighlightedAnime';
import { getCurrentUser } from '@/lib/supabase/supabase-server';
import { createAnimeComment, getAnimeById, getAnimeComments, searchAnimes } from '@/services'
import Image from 'next/image';
import React from 'react'
import SendIcon from '@mui/icons-material/Send';
import { ICreateAnimeComment } from '@/types';
import { revalidatePath } from 'next/cache';
import AnimeComments from '@/components/ui/anime/AnimeComments';

export async function generateStaticParams() {

    const animeResponse = await searchAnimes();

    return animeResponse.data.map((anime) => ({
        id: anime.mal_id.toString(),
    }))
}

type Props = {
    params: {
        id: string;
    };
    searchParams: {
        episode?: string;
    }
}

const AnimePage = async ({ params, searchParams }: Props) => {

    // Get anime
    const anime = await getAnimeById(params.id);

    /////////////////////////////////////
    // RENDER ///////////////////////////
    /////////////////////////////////////

    return (
        <div className='w-full flexStartCenter flex-col p-4 gap-4 h-full'>

            {/* HIGHLIGHTED ANIME CARD */}
            <HighlightedAnime
                anime={anime}
            />

            {/* EPISODES (if more than 10 => show more then dropdown) */}
            <AnimeEpisodesList
                anime={anime}
                selectedEpisode={searchParams.episode}
            />


            {/* COMMENTS */}
            <AnimeComments
                animeId={parseInt(params.id)}
                episode={searchParams.episode ? parseInt(searchParams.episode) : undefined}
            />




        </div>
    )
}

export default AnimePage;