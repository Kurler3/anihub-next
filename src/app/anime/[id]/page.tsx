

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


    const episodesList = Array.from({ length: anime.episodes }, (_, index) => index + 1);

    const showAllEpisodes = episodesList.length > 15;

    return (
        <div className='w-full flexStartCenter flex-col p-4 gap-4'>

            {/* HIGHLIGHTED ANIME CARD */}
            <HighlightedAnime
                anime={anime}
            />

            {/* EPISODES (if more than 10 => show more then dropdown) */}
            <form className='flexStartCenter flex-wrap gap-4 collapse bg-bgLight p-2 rounded-md' tabIndex={0}>
                {
                    episodesList.slice(0, 15).map((episode, index) => (
                        <div
                            key={`anime_episode_${anime.mal_id}_${episode}`}
                            className={
                                `
                            p-2 bg-bgColor rounded-md text-sm cursor-pointer 
                            ${index < 15 || showAllEpisodes ? 'visible' : 'hidden'}
                            hover:bg-highlightedColor transition hover:text-black
                            ${searchParams.episode === episode.toString() ? 'bg-highlightedColor text-bgDarkColor' : ''}
                            `
                            }
                        >
                            <a href={`/anime/${anime.mal_id}?episode=${episode}`} className='no-underline'>
                                <p>Episode {episode}</p>
                            </a>
                        </div>
                    ))
                }



                {/* VIEW MORE */}
                <div className='collapse-title bg-highlightedColor w-fit text-center p-2 min-h-fit text-bgDarkColor rounded-md text-sm cursor-pointer'>
                    View more
                </div>


                {/* 
                <div className='collapse w-fit h-fit p-2 bg-bgColor rounded-md text-sm cursor-pointer' tabIndex={0}>
                    <div className='collapse-title'>
                        View More
                    </div>
                    <div className="collapse-content">
                        Hello!
                    </div>

                </div> */}

            </form>


            {/* COMMENTS */}


        </div>
    )
}

export default AnimePage;