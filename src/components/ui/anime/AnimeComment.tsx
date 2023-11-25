'use client'

import moment from 'moment';


import { IAnimeComment } from "@/types";
import Image from "next/image";
import { FormEvent, useState } from "react";
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import Link from "next/link";
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { createAnimeLikeDislike } from '@/services';
import { useRouter } from 'next/navigation';
import { isUserDislikeComment, isUserLikeComment } from '@/lib/functions/animeComments.functions';

interface IProps {
    animeComment: IAnimeComment;
    userId?: string;
}

const AnimeComment = ({
    animeComment,
    userId,
}: IProps) => {

    const router = useRouter()

    /////////////////////////////////
    // STATE ////////////////////////
    /////////////////////////////////

    // If entire comment is expanded
    const [isExpanded, setIsExpanded] = useState(true);

    // If create comment is expanded
    const [isCreateCommentExpanded, setIsCreateCommentExpanded] = useState(false);

    const [likesData, setLikesData] = useState({
        isLiked: isUserLikeComment(animeComment.likes, userId),
        isDisliked: isUserDislikeComment(animeComment.dislikes, userId),
        absoluteLikes: animeComment.likes.length - animeComment.dislikes.length,
        isLoading: false,
    });

    /////////////////////////////////
    // MEMO /////////////////////////
    /////////////////////////////////





    /////////////////////////////////
    // FUNCTIONS ////////////////////
    /////////////////////////////////

    // Handle like or dislike 
    const handleLikeOrDislike = async (like: boolean) => {

        // If already liking/disliking => return (to wait for last call to finish)
        if (likesData.isLoading) return;

        // If not logged in => redirect to need auth page.
        if (!userId) router.push('/need-auth');

        try {

            // Set likes data
            setLikesData((prevLikesData) => {

                let newAbsoluteLikes = prevLikesData.absoluteLikes;
                let newIsLiked = prevLikesData.isLiked;
                let newIsDisliked = prevLikesData.isDisliked;

                // If liking 
                if (like) {

                    // Invert is liked
                    newIsLiked = !newIsLiked;

                    // If was liked (will not be liked after this click) => reduce one from the absolute likes
                    if (prevLikesData.isLiked) newAbsoluteLikes -= 1;
                    // Else => new like
                    else newAbsoluteLikes += 1;

                    // If disliking
                } else {

                    // Invert is disliked
                    newIsDisliked = !newIsDisliked;

                    // If was disliked => add new like to absolute likes
                    if (prevLikesData.isDisliked) newAbsoluteLikes += 1;
                    // ELse => remove from absolute likes
                    else newAbsoluteLikes -= 1;

                }

                // Return new state
                return {
                    ...prevLikesData,
                    isLiked: newIsLiked,
                    isDisliked: newIsDisliked,
                    absoluteLikes: newAbsoluteLikes,
                    isLoading: true,
                }

            })


            await createAnimeLikeDislike(animeComment.id, like);


            // Finished liking => set loading to false
            setLikesData((prevLikesData) => ({ ...prevLikesData, isLoading: false }));

            // Refresh page
            router.refresh()

        } catch (error) {
            // Toast
            console.error('Error liking/disliking comment: ', error);
            return;
        }
    }

    // Handle reply to comment
    const handleReplyToComment = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    /////////////////////////////////
    // RENDER ///////////////////////
    /////////////////////////////////


    return (
        <div
            key={`anime_comment_${animeComment.id}`}
            className='flexStartStart gap-2 w-full'
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
            <div className="flex h-full w-full justify-start items-start flex-col gap-2">

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
                                        className={`cursor-pointer transition hover:text-red-400 ${likesData.isLiked ? 'text-red-400' : ''}`}
                                    />
                                </div>


                                {/* ABSOLUTE LIKES */}
                                <div className='text-white text-sm'>
                                    {likesData.absoluteLikes}
                                </div>

                                {/* DISLIKE BTN */}
                                <div onClick={() => handleLikeOrDislike(false)}>
                                    <ThumbDownOutlinedIcon
                                        className={`cursor-pointer transition hover:text-blue-400 ${likesData.isDisliked ? 'text-blue-400' : ''}`}
                                    />
                                </div>


                                {/* ADD COMMENT TO COMMENT BTN */}
                                <div
                                    className='flexCenterCenter gap-2 hover:bg-bgLight transition cursor-pointer p-1 text-sm rounded-md'
                                    onClick={() => setIsCreateCommentExpanded(!isCreateCommentExpanded)}
                                >
                                    <ChatBubbleOutlineOutlinedIcon

                                    />
                                    <span>Reply</span>
                                </div>


                            </div>

                            {/* ADD COMMENT FORM */}
                            {
                                isCreateCommentExpanded && (
                                    <div className='flex justify-start items-start w-full gap-2'>
                                        {/* EXPANSION THING */}
                                        <div
                                            className='bg-separatorColor h-full cursor-pointer hover:bg-slate-500 transition'
                                            style={{
                                                width: '2.5px',
                                                minHeight: '20px',
                                            }}
                                            onClick={() => setIsCreateCommentExpanded(false)}
                                        >
                                        </div>
                                        {/* CREATE COMMENT FORM */}
                                        <form

                                            onSubmit={handleReplyToComment}
                                            className='h-full w-full flexCenterCenter gap-2'>
                                            <textarea name='comment' className="textarea bg-bgLight textarea-ghost resize-none w-full focus:outline-none " placeholder="Share your thoughts..."></textarea>
                                            <button type='submit' className="h-full btn bg-highlightedColor text-white hover:bg-highlightedHover">
                                                Reply
                                            </button>
                                        </form>
                                    </div>

                                )
                            }

                            {/* CHILDREN COMMENTS */}

                        </>

                    )
                }


            </div>



        </div>
    )
};

export default AnimeComment;