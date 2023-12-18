'use client'

/* eslint-disable @next/next/no-img-element */

import { AnimeItem } from '@/types/anime.types'
import { IconButton } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useSpring, animated } from 'react-spring';
import AddIcon from '@mui/icons-material/Add';
import LaunchIcon from '@mui/icons-material/Launch';
import HorizontalSeparator from '@/components/HorizontalSeparator';
import { IWatchList } from '@/types';

type Props = {
    anime: AnimeItem;
    isLoggedIn: boolean;
}

const AnimeCard = ({ anime, isLoggedIn }: Props) => {
    const router = useRouter()
    const [contextMenuVisible, setContextMenuVisible] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({ top: 0, left: 0 });

    const fadeInOutAnimation = useSpring({
        opacity: contextMenuVisible ? 1 : 0,
        transform: `scale(${contextMenuVisible ? 1 : 0.5})`,
        config: { duration: 100 },
    });

    const handleContextMenu = (event: React.MouseEvent) => {
        event.preventDefault();

        setContextMenuVisible(true);
        setContextMenuPosition({ top: event.clientY, left: event.clientX });
    };

    const handleCloseContextMenu = () => {
        setContextMenuVisible(false);
    };

    const handleAddToWatchlist = () => {
        // Add your logic for adding to the watchlist
        router.push(`/anime/${anime.mal_id}/watchlists`);
    };

    const handleViewOfficialPage = () => {
        const officialPageUrl = anime.url;
        window.open(officialPageUrl, '_blank');
        handleCloseContextMenu();
    };

    return (
        <div
            onContextMenu={handleContextMenu}
            className={`flexCenterCenter flex-col overflow-hidden rounded-md w-[225px] cursor-pointer hover:shadow-2xl transition border border-bgColor ${contextMenuVisible ? 'border-highlightedColor' : ''}`}
        >
            <Link href={`/anime/${anime.mal_id}`} className='w-full'>

                <img
                    src={anime.images.jpg.image_url}
                    alt={`${anime.title}'s image`}
                    className='object-cover h-80 min-w-full'
                />

                <div className="w-full bg-bgColor flexCenterStart flex-col p-2 truncate">
                    <div className="w-full truncate text-sm">
                        {anime.title}
                    </div>
                    {anime.episodes && (
                        <div className="text-xs">
                            {anime.episodes} episodes
                        </div>
                    )}
                </div>

            </Link>

            {contextMenuVisible && (
                <div
                    className="fixed top-0 left-0 w-screen h-screen z-50"
                    onClick={handleCloseContextMenu}
                />
            )}

            {contextMenuVisible && (
                <animated.div
                    className="
                        fixed bg-bgLight border border-highlightedColor rounded-md shadow-md p-4 z-50 flex flex-col justify-start items-center
                        gap-2
                    "
                    style={{ top: contextMenuPosition.top, left: contextMenuPosition.left, ...fadeInOutAnimation }}
                >
                    {/* Add your context menu items here */}
                    {
                        isLoggedIn && (
                            <>
                                <div className="flex items-center w-full transition rounded-md hover:shadow-xl text-white hover:bg-bgLighter pr-2" onClick={handleAddToWatchlist}>
                                    <IconButton className='text-white'>
                                        <AddIcon />
                                    </IconButton>
                                    <span className="text-sm">Add to Watchlist</span>
                                </div>
                                <HorizontalSeparator width={100} />
                            </>
                        )
                    }

                    <div
                        className="flex items-center w-full transition rounded-md hover:shadow-xl text-white hover:bg-bgLighter pr-2"
                        onClick={handleViewOfficialPage}
                    >
                        <IconButton className='text-white'>
                            <LaunchIcon />
                        </IconButton>
                        <span className="text-sm">View Official Page</span>
                    </div>
                </animated.div>
            )}
        </div>
    );
};

export default AnimeCard;