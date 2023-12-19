'use client'

import moment from 'moment';


import { IAnimeComment, IPostComment, IUser } from "@/types";
import Image from "next/image";
import { ChangeEvent, FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import Link from "next/link";
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { createPostCommentLikeDislike, getPostCommentChildrenComments, getPostCommentExtraData } from '@/services';
import { useRouter } from 'next/navigation';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AnimeCommentSkeleton from '../anime/AnimeCommentSkeleton';
import { isUserDislikePostComment, isUserLikePostComment } from '@/lib/functions';


interface IProps {
    postComment: IPostComment;
    userId?: string;
}

// Interface for the extra comment data (user, likes, dislikes and children comments) to be fetched while rendering.
interface IExtraCommentData {
    isLiked: boolean;
    isDisliked: boolean;
    childrenComments?: IPostComment[];
    user?: IUser;
    isLoading: boolean;
    absoluteLikes: number;
}

// Interface for the editing state of a comment.
interface IEditCommentState {
    isEditing: boolean;
    newCommentContent: string;
}
interface IDeleteCommentState {
    isDeleting: boolean;
    isDeleted: boolean;
}

const PostComment = ({
    postComment,
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
        isLiked: isUserLikePostComment(postComment.likes, userId),
        isDisliked: isUserDislikePostComment(postComment.dislikes, userId),
        user: postComment.user,
        childrenComments: postComment.childComments ?? [],
        isLoading: false,
        absoluteLikes: (postComment.likes?.length ?? 0) - (postComment.dislikes?.length ?? 0),
    })

    // Editing data
    const [editingData, setEditingData] = useState<IEditCommentState>({
        isEditing: false,
        newCommentContent: postComment.content,
    })

    // Is deleting
    const [deletingData, setDeletingData] = useState<IDeleteCommentState>({
        isDeleted: false,
        isDeleting: false,
    });

    /////////////////////////////////
    // MEMO /////////////////////////
    /////////////////////////////////

    const isCommentOwner = useMemo(() => {
        return userId === postComment.userId;
    }, [postComment.userId, userId])

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

                    // If new is liked is true (make new is disliked false!)
                    if (newIsLiked && newIsDisliked) {
                        newIsDisliked = false;
                        newAbsoluteLikes += 1;
                    }

                    // If was liked (will not be liked after this click) => reduce one from the absolute likes
                    if (prevExtraCommentData.isLiked) newAbsoluteLikes -= 1;
                    // Else => new like
                    else newAbsoluteLikes += 1;

                    // If disliking
                } else {

                    // Invert is disliked
                    newIsDisliked = !newIsDisliked;

                    // If new is disliked is true (make new is liked false!)
                    if (newIsDisliked && newIsLiked) {
                        newIsLiked = false;
                        newAbsoluteLikes -= 1;
                    }

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

            await createPostCommentLikeDislike(+postComment.id, like);

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
            const newPostComment = {
                postId: postComment.postId,
                content: comment,
                parentCommentId: postComment.id,
            }

            // Send request to create comment
            const response = await fetch('/api/post-comment/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPostComment),
            })

            if (!response.ok) throw new Error('Error creating comment')

            // Close create reply 
            setIsCreateCommentExpanded(false);

            // Fetch children comments again and set them.
            const newChildrenComments = await getPostCommentChildrenComments(+postComment.id);

            setExtraCommentData((prevState) => ({ ...prevState, childrenComments: newChildrenComments.childComments }));

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

    // Handle delete comment
    const handleDeleteComment = useCallback(async () => {

        try {

            // Delete the comment
            const response = await fetch('/api/post-comment/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ commentId: postComment.id })
            })

            // If response is not ok
            if (!response.ok) {
                throw new Error('Error deleting comment');
            }

            // Set is deleted
            setDeletingData((prevState) => ({ ...prevState, isDeleted: true }));

            // Refresh the page
            router.refresh();

        } catch (error) {
            console.error('Error deleting comment...', error);
        }

    }, [postComment.id, router])

    // Handle edit comment
    const handleEditComment = useCallback(() => {
        // If not comment owner => return from func
        if (!isCommentOwner) return;
        // Set is editing or not
        setEditingData((prevState) => ({ ...prevState, isEditing: !prevState.isEditing, newCommentContent: postComment.content }));
    }, [postComment.content, isCommentOwner])

    // Handle confirm edit comment
    const handleConfirmEditComment = useCallback(async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (editingData.newCommentContent === '') return;

        try {

            // Update the comment
            const response = await fetch('/api/post-comment/update', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    newCommentContent: editingData.newCommentContent,
                    commentId: postComment.id,
                }),
            })

            // If some error
            if (!response.ok) throw new Error('Error editing comment')

            // Reset editing state
            setEditingData((prevState) => ({ ...prevState, isEditing: false }));

            // Refresh
            router.refresh();

        } catch (error) {

            // Catch the error!
            console.error('Error while editing comment: ', error);

        }

    }, [postComment.id, editingData.newCommentContent, router])

    // Handle change editing comment
    const handleChangeEditingComment = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
        const newContent = e.target.value;
        setEditingData((prevState) => ({
            ...prevState,
            newCommentContent: newContent,
        }))
    }, [])


    /////////////////////////////////
    // GET CHILDREN COMMENTS ////////
    /////////////////////////////////

    useEffect(() => {

        if (
            !extraCommentData.user &&
            !extraCommentData.isLoading
        ) {

            const handleFetchCommentExtraData = async () => {

                const additionalCommentData = await getPostCommentExtraData(+postComment.id);

                setExtraCommentData((prevExtraCommentData) => {
                    return {
                        ...prevExtraCommentData,
                        isLiked: isUserLikePostComment(additionalCommentData!.likes, userId),
                        isDisliked: isUserDislikePostComment(additionalCommentData!.dislikes, userId),
                        user: additionalCommentData!.user as unknown as IUser,
                        isLoading: false,
                        childrenComments: additionalCommentData!.childComments as unknown as IPostComment[],
                        absoluteLikes: (additionalCommentData!.likes?.length ?? 0) - (additionalCommentData!.dislikes?.length ?? 0),
                    }
                })

            }
            handleFetchCommentExtraData();
        }
    }, [extraCommentData.isLoading, extraCommentData.user, postComment.id, userId])

    /////////////////////////////////
    // RENDER ///////////////////////
    /////////////////////////////////
    return (
        <div
            className={`flexStartStart gap-2 w-full ${deletingData.isDeleted ? 'eraseAnimation' : ''}`}
        >
            {

                extraCommentData.user ? (
                    <>
                        {/* AVATAR + EXPAND LINE */}
                        <div className={`flex items-center justify-start gap-1 min-w-fit ${isExpanded ? 'flex-col h-full' : 'flex-row-reverse h-fit items-start'}`}>

                            <Image
                                src={extraCommentData.user.avatarUrl!}
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
                                        {extraCommentData.user.username} {isCommentOwner ? '(You)' : ''}
                                    </div>
                                </Link>


                                {/* BULLET */}
                                <div className='text-smallInfoColor text-center'>
                                    &#8226;
                                </div>

                                {/* CREATED AT */}
                                <div className='text-smallInfoColor text-center text-sm'>
                                    {moment(postComment.createdAt).fromNow()}

                                </div>
                            </div>

                            {/* CONTENT */}
                            <div className={`${isExpanded ? '' : 'hideChildren'} w-full flex h-full justify-start items-start flex-col gap-2`}>

                                {/* CONTENT */}

                                {/* IF EDITING => SHOW FORM, ELSE SHOW NORMAL CONTENT */}
                                {
                                    editingData.isEditing ? (
                                        <form
                                            onSubmit={handleConfirmEditComment}
                                            className='h-full w-full flexCenterCenter gap-2'>
                                            <textarea onChange={handleChangeEditingComment} name='editComment' value={editingData.newCommentContent} className="textarea bg-bgLight textarea-ghost resize-none w-full focus:outline-none " placeholder="Edit this comment..."></textarea>
                                            <button type='submit' className="h-full btn bg-highlightedColor text-white hover:bg-highlightedHover">
                                                Save
                                            </button>
                                        </form>
                                    ) : (
                                        <div
                                            className={`bg-transparent w-full p-2 rounded-md resize-none max-w-8xl border-red-100 break-all transition text-sm
                                                        ${isCommentOwner ? 'hover:bg-bgLight' : ''}
                                                    `}
                                            onClick={handleEditComment}
                                        >
                                            {postComment.content}
                                        </div>
                                    )
                                }

                                {/* LIKE BTN + ABSOLUTE LIKES + DISLIKE BTN + COMMENT BTN + EDIT AND DELETE BTNS */}
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

                                    {/* EDIT + DELETE BTNS */}
                                    {
                                        isCommentOwner && (
                                            <>

                                                {/* EDIT */}
                                                <div
                                                    onClick={handleEditComment}
                                                    className={`
                                                        flexCenterCenter gap-1 hover:bg-bgLight transition cursor-pointer p-1 text-sm rounded-md
                                                        ${editingData.isEditing ? 'bg-info text-white hover:bg-info' : ''}

                                                    `}
                                                >

                                                    <ModeEditOutlineIcon />

                                                    <span>Edit</span>

                                                </div>

                                                {/* DELETE */}
                                                {
                                                    deletingData.isDeleting ? (
                                                        <div className='flexCenterCenter gap-1'>

                                                            {/* Confirm delete */}
                                                            <div className='bg-red-500 rounded-md p-1 px-2 cursor-pointer hover:bg-red-600 transition text-sm text-white'
                                                                onClick={handleDeleteComment}
                                                            >
                                                                Delete
                                                            </div>

                                                            {/* Cancel */}
                                                            <div className='bg-bgLight rounded-md p-1 px-2 cursor-pointer text-sm' onClick={() => setDeletingData((prevState) => ({ ...prevState, isDeleting: false }))}>
                                                                Cancel
                                                            </div>

                                                        </div>
                                                    ) : (
                                                        <div
                                                            onClick={() => setDeletingData((prevState) => ({ ...prevState, isDeleting: true }))}
                                                            className='flexCenterCenter gap-1 hover:bg-bgLight transition cursor-pointer p-1 text-sm rounded-md'
                                                        >
                                                            <DeleteOutlineIcon />
                                                            <span>Delete</span>
                                                        </div>
                                                    )
                                                }

                                            </>
                                        )
                                    }


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
                                    extraCommentData.childrenComments!.map((childComment) => {

                                        return (
                                            <PostComment
                                                key={`child_post_comment_${childComment.id}`}
                                                postComment={childComment}
                                                userId={userId}
                                            />
                                        )

                                    })
                                }

                            </div>


                        </div>
                    </>
                ) : (
                    <AnimeCommentSkeleton />
                )
            }




        </div >
    )
};

export default PostComment;