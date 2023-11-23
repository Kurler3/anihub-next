'use client'

import { AnimeItem } from '@/types';
import React, { useState } from 'react'

type Props = {
    anime: AnimeItem;
    selectedEpisode?: string;
}

const AnimeEpisodesList = ({ anime, selectedEpisode }: Props) => {

    ////////////////////////
    // STATE ///////////////
    ////////////////////////

    const [showMore, setShowMore] = useState<boolean>(
        selectedEpisode !== undefined && parseInt(selectedEpisode) > 15
    );

    ////////////////////////
    // VARS ////////////////
    ////////////////////////

    const episodesList = Array.from({ length: anime.episodes }, (_, index) => index + 1);

    const needShowMoreBtn = episodesList.length > 15;

    const displayEpisodesMax = showMore ? episodesList.length : 15;

    ////////////////////////
    // FUNCTIONS ///////////
    ////////////////////////

    const handleShowMore = () => {
        setShowMore(!showMore);
    }

    ////////////////////////
    // RENDER //////////////
    ////////////////////////

    return (
        <form className='flexStartCenter flex-wrap gap-4 bg-bgLight p-2 rounded-md transition'>

            {
                episodesList.slice(0, displayEpisodesMax).map((episode) => (
                    <div
                        key={`anime_episode_${anime.mal_id}_${episode}`}
                        className={
                            `
                            p-2 bg-bgColor rounded-md text-sm cursor-pointer 
                            hover:bg-highlightedColor transition hover:text-black
                            ${selectedEpisode === episode.toString() ? 'bg-highlightedColor text-bgDarkColor' : ''}
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
            {
                needShowMoreBtn && (
                    <div
                        onClick={handleShowMore}
                        className='bg-highlightedColor w-fit text-center p-2 min-h-fit text-bgDarkColor rounded-md text-sm cursor-pointer'
                    >
                        {showMore ? 'Show less' : 'View more'}
                    </div>
                )
            }
        </form>
    )
}

export default AnimeEpisodesList