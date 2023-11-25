'use client'

import moment from 'moment';


import { IAnimeComment } from "@/types";
import Image from "next/image";
import { useMemo, useState } from "react";
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import Link from "next/link";
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { createAnimeLikeDislike } from '@/services';

interface IProps {
    animeComment: IAnimeComment;
    userId?: string;
}

const AnimeComment = ({
    animeComment,
    userId,
}: IProps) => {

    /////////////////////////////////
    // STATE ////////////////////////
    /////////////////////////////////

    const [isExpanded, setIsExpanded] = useState(true);

    /////////////////////////////////
    // MEMO /////////////////////////
    /////////////////////////////////

    const isLiked = useMemo(() => {
        if (!userId) return false;
        const likeFound = animeComment.likes.find((like) => like.userId === userId);
        return likeFound !== undefined;
    }, [animeComment.likes, userId]);

    const isDisliked = useMemo(() => {
        if (!userId) return false;
        const likeFound = animeComment.dislikes.find((like) => like.userId === userId);
        return likeFound !== undefined;
    }, [animeComment.dislikes, userId]);

    /////////////////////////////////
    // FUNCTIONS ////////////////////
    /////////////////////////////////

    // Handle like or dislike 
    const handleLikeOrDislike = async (like: boolean) => {

        // If not logged in => redirect to need auth page.
        if (!userId) return;

        try {

            const newLikeDislike = await createAnimeLikeDislike(animeComment.id, like);

            animeComment[like ? 'likes' : 'dislikes'].push(newLikeDislike);

            // Refresh page
            window.location.reload();

        } catch (error) {
            // Toast
            console.error('Error liking/disliking comment: ', error);
            return;
        }




    }

    /////////////////////////////////
    // RENDER ///////////////////////
    /////////////////////////////////


    return (
        <div
            key={`anime_comment_${animeComment.id}`}
            className='flexStartStart gap-2 w-full '
        >

            {/* AVATAR + EXPAND LINE */}
            <div className={`flex items-center gap-1 min-w-fit h-full ${isExpanded ? 'flex-col' : 'flex-row-reverse'}`}>

                <Image
                    src={animeComment.user.avatarUrl}
                    alt='User pic'
                    width={40}
                    height={40}
                    className='rounded-full'
                />

                {
                    isExpanded ? (
                        <div
                            onClick={() => setIsExpanded(false)}
                            className='bg-separatorColor flex-1 cursor-pointer hover:bg-slate-500 transition'
                            style={{
                                width: '2.5px',
                                minHeight: '20px',
                            }}
                        >
                        </div>
                    ) : (

                        <div onClick={() => setIsExpanded(true)} className="cursor-pointer transition text-sm">
                            <OpenInFullIcon

                            />
                        </div>

                    )
                }

            </div>


            {/* RIGHT PART */}
            <div className="flex justify-start items-start flex-col gap-2">

                {/* USERNAME + TIME CREATED */}
                <div className="flex justify-start items-center gap-3">

                    {/* USERNAME */}
                    <Link href={`/user/${animeComment.user.id}`}>
                        <div className='text-sm text-white hover:underline cursor-pointer'>
                            {animeComment.user.username}
                        </div>
                    </Link>


                    {/* BULLET */}
                    <div className='text-smallInfoColor text-center'>
                        &#8226;
                    </div>

                    {/* CREATED AT */}
                    <div className='text-smallInfoColor text-center text-sm'>
                        {moment(animeComment.createdAt).fromNow()}

                    </div>
                </div>

                {/* CONTENT */}
                {
                    isExpanded && (
                        <>

                            {/* CONTENT */}
                            <div
                                className="bg-transparent resize-none max-w-8xl border-red-100 break-all text-sm"
                            >
                                {animeComment.content}
                            </div>

                            {/* LIKE BTN + ABSOLUTE LIKES + DISLIKE BTN + COMMENT BTN */}
                            <div className='flex justify-start items-center gap-2'>

                                {/* LIKE BTN */}
                                <div onClick={() => handleLikeOrDislike(true)}>
                                    <ThumbUpAltOutlinedIcon
                                        className={`cursor-pointer transition hover:text-red-400 ${isLiked ? 'text-red-400' : ''}`}
                                    />
                                </div>


                                {/* ABSOLUTE LIKES */}
                                <div className='text-white text-sm'>
                                    {animeComment.likes.length - animeComment.dislikes.length}
                                </div>

                                {/* DISLIKE BTN */}
                                <div onClick={() => handleLikeOrDislike(false)}>
                                    <ThumbDownOutlinedIcon
                                        className={`cursor-pointer transition hover:text-blue-400 ${isDisliked ? 'text-blue-400' : ''}`}
                                    />
                                </div>


                                {/* ADD COMMENT TO COMMENT BTN */}
                                <div className='flexCenterCenter gap-2 hover:bg-bgLight transition cursor-pointer p-1 text-sm rounded-md'>
                                    <ChatBubbleOutlineOutlinedIcon

                                    />
                                    <span>Reply</span>
                                </div>



                            </div>

                            {/* ADD COMMENT FORM */}

                            {/* CHILDREN COMMENTS */}

                        </>

                    )
                }


            </div>



        </div>
    )
};

export default AnimeComment;