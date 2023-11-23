

import AnimeEpisodesList from '@/components/ui/anime/AnimeEpisodesList';
import HighlightedAnime from '@/components/ui/anime/HighlightedAnime';
import { getAnimeById, searchAnimes } from '@/services'
import React from 'react'


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

    return (
        <div className='w-full flexStartCenter flex-col p-4 gap-4'>

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
            <form className='w-full flexCenterCenter'>
                <textarea name='comment' className="textarea textarea-ghost resize-none focus:bg-" placeholder="Share your thoughts..."></textarea>
                <button type='submit' className="h-full">Submit</button>
            </form>






        </div>
    )
}

export default AnimePage;