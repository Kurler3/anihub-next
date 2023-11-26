'use client'

import moment from 'moment';


import { IAnimeComment, IUser } from "@/types";
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import Link from "next/link";
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { createAnimeLikeDislike, getAnimeCommentChildrenComments, getAnimeCommentExtraData } from '@/services';
import { useRouter } from 'next/navigation';
import { isUserDislikeComment, isUserLikeComment } from '@/lib/functions/animeComments.functions';

interface IProps {
    animeComment: IAnimeComment;
    userId?: string;
}

interface IExtraCommentData {
    isLiked: boolean;
    isDisliked: boolean;
    childrenComments?: IAnimeComment[];
    user?: IUser;
    isLoading: boolean;
    absoluteLikes: number;
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

    // Extra comment data (likes, dislikes, childrenAnimeComments)
    const [extraCommentData, setExtraCommentData] = useState<IExtraCommentData>({
        isLiked: isUserLikeComment(animeComment.likes, userId),
        isDisliked: isUserDislikeComment(animeComment.dislikes, userId),
        user: animeComment.user,
        childrenComments: animeComment.childAnimeComments ?? [],
        isLoading: false,
        absoluteLikes: (animeComment.likes?.length ?? 0) - (animeComment.dislikes?.length ?? 0),
    })

    /////////////////////////////////
    // FUNCTIONS ////////////////////
    /////////////////////////////////

    // Handle like or dislike 
    const handleLikeOrDislike = async (like: boolean) => {

        // If already liking/disliking => return (to wait for last call to finish)
        if (extraCommentData.isLoading) return;

        // If not logged in => redirect to need auth page.
        if (!userId) router.push('/need-auth');

        try {

            // Set likes data
            setExtraCommentData((prevExtraCommentData) => {

                let newAbsoluteLikes = prevExtraCommentData.absoluteLikes;
                let newIsLiked = prevExtraCommentData.isLiked;
                let newIsDisliked = prevExtraCommentData.isDisliked;

                // If liking 
                if (like) {

                    // Invert is liked
                    newIsLiked = !newIsLiked;

                    // If was liked (will not be liked after this click) => reduce one from the absolute likes
                    if (prevExtraCommentData.isLiked) newAbsoluteLikes -= 1;
                    // Else => new like
                    else newAbsoluteLikes += 1;

                    // If disliking
                } else {

                    // Invert is disliked
                    newIsDisliked = !newIsDisliked;

                    // If was disliked => add new like to absolute likes
                    if (prevExtraCommentData.isDisliked) newAbsoluteLikes += 1;
                    // ELse => remove from absolute likes
                    else newAbsoluteLikes -= 1;

                }

                // Return new state
                return {
                    ...prevExtraCommentData,
                    isLiked: newIsLiked,
                    isDisliked: newIsDisliked,
                    absoluteLikes: newAbsoluteLikes,
                    isLoading: true,
                }

            })

            await createAnimeLikeDislike(animeComment.id, like);

            // Finished liking => set loading to false
            setExtraCommentData((prevExtraCommentData) => ({ ...prevExtraCommentData, isLoading: false }));

        } catch (error) {
            // Toast
            console.error('Error liking/disliking comment: ', error);
            return;
        }
    }

    // Handle reply to comment
    const handleReplyToComment = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Use FormData to get form values
        const formDataObject = new FormData(e.currentTarget);

        // Access form values using FormData methods
        const comment = formDataObject.get('comment') as string;

        if (!comment || comment.length === 0) return;

        try {

            // Data to send to api
            const newAnimeComment = {
                animeId: animeComment.animeId,
                episode: animeComment.episode ?? undefined,
                content: comment,
                parentAnimeCommentId: animeComment.id,
            }

            // Send request to create comment
            const response = await fetch('/api/anime-comment/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newAnimeComment),
            })

            if (!response.ok) throw new Error('Error creating comment')

            // Close create reply 
            setIsCreateCommentExpanded(false);

            // Fetch children comments again and set them.
            const newChildrenComments = await getAnimeCommentChildrenComments(animeComment.id);

            setExtraCommentData((prevState) => ({ ...prevState, childrenComments: newChildrenComments.childAnimeComments }));

            // Refresh
            router.refresh();

        } catch (error) {
            // Toast
            console.error('Error creating comment: ', error);
        }

    }

    // Handle expand reply
    const handleExpandReply = () => {
        if (!isCreateCommentExpanded && !userId) return router.push('/need-auth');
        setIsCreateCommentExpanded(!isCreateCommentExpanded);
    }

    //TODO Handle delete comment

    //TODO Handle edit comment

    /////////////////////////////////
    // GET CHILDREN COMMENTS ////////
    /////////////////////////////////

    useEffect(() => {

        if (
            !extraCommentData.user &&
            !extraCommentData.isLoading
        ) {

            const handleFetchCommentExtraData = async () => {

                const additionalCommentData = await getAnimeCommentExtraData(animeComment.id);

                console.log('Additional comment data: ', additionalCommentData)

                setExtraCommentData((prevExtraCommentData) => {
                    return {
                        ...prevExtraCommentData,
                        isLiked: isUserLikeComment(additionalCommentData!.likes, userId),
                        isDisliked: isUserDislikeComment(additionalCommentData!.dislikes, userId),
                        user: additionalCommentData!.user as unknown as IUser,
                        isLoading: false,
                        childrenComments: additionalCommentData!.childAnimeComments as unknown as IAnimeComment[],
                        absoluteLikes: (additionalCommentData!.likes?.length ?? 0) - (additionalCommentData!.dislikes?.length ?? 0),
                    }
                })

            }

            handleFetchCommentExtraData();

        }

    }, [animeComment.id, extraCommentData.isLoading, extraCommentData.user, userId])

    /////////////////////////////////
    // RENDER ///////////////////////
    /////////////////////////////////


    return (
        <div
            key={`anime_comment_${animeComment.id}`}
            className='flexStartStart gap-2 w-full'
        >
            {

                extraCommentData.user && (
                    <>
                        {/* AVATAR + EXPAND LINE */}
                        <div className={`flex items-center gap-1 min-w-fit h-full ${isExpanded ? 'flex-col' : 'flex-row-reverse'}`}>

                            <Image
                                src={extraCommentData.user.avatarUrl}
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
                                <Link href={`/user/${extraCommentData.user.id}`}>
                                    <div className='text-sm text-white hover:underline cursor-pointer'>
                                        {extraCommentData.user.username}
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

                            <div className={`${isExpanded ? '' : 'hideChildren'} h-full`}>

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
                                            className={`cursor-pointer transition hover:text-red-400 ${extraCommentData.isLiked ? 'text-red-400' : ''}`}
                                        />
                                    </div>


                                    {/* ABSOLUTE LIKES */}
                                    <div className='text-white text-sm'>
                                        {extraCommentData.absoluteLikes}
                                    </div>

                                    {/* DISLIKE BTN */}
                                    <div onClick={() => handleLikeOrDislike(false)}>
                                        <ThumbDownOutlinedIcon
                                            className={`cursor-pointer transition hover:text-blue-400 ${extraCommentData.isDisliked ? 'text-blue-400' : ''}`}
                                        />
                                    </div>


                                    {/* ADD COMMENT TO COMMENT BTN */}
                                    <div
                                        className='flexCenterCenter gap-2 hover:bg-bgLight transition cursor-pointer p-1 text-sm rounded-md'
                                        onClick={handleExpandReply}
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
                                                <textarea name='comment' className="textarea bg-bgLight textarea-ghost resize-none w-full focus:outline-none " placeholder="Reply to this comment..."></textarea>
                                                <button type='submit' className="h-full btn bg-highlightedColor text-white hover:bg-highlightedHover">
                                                    Reply
                                                </button>
                                            </form>
                                        </div>

                                    )
                                }

                                {/* CHILDREN COMMENTS */}
                                {
                                    extraCommentData.childrenComments!.map((childAnimeComment) => {

                                        return (
                                            <AnimeComment
                                                key={`child_anime_comment_${childAnimeComment.id}`}
                                                animeComment={childAnimeComment}
                                                userId={userId}
                                            />
                                        )

                                    })
                                }

                            </div>





                        </div>
                    </>
                )
            }




        </div>
    )
};

export default AnimeComment;