'use client'

import Button from '@/components/ui/Button';
import { ICreateWatchListUsersState, ICreateWatchlistFormData, IUser } from '@/types'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import WatchListUsersAvatars from './WatchListUsersAvatars';

type Props = {
    availableUsers: IUser[];
    currentUser: IUser;
}

function WatchListForm({
    currentUser,
    availableUsers,
}: Props) {

    ////////////////////////////
    // FORM STATE //////////////
    ////////////////////////////

    const {
        register,
        handleSubmit,
    } = useForm<ICreateWatchlistFormData>();

    ////////////////////////////
    // STATE ///////////////////
    ////////////////////////////

    const [
        watchlistUsers,
        setWatchlistUsers,
    ] = useState<ICreateWatchListUsersState>({
        admins: [currentUser], // By default, creator is the watchlist admin.
        editors: [],
        viewers: []
    })

    ////////////////////////////
    // FUNCTIONS ///////////////
    ////////////////////////////

    // Add/Remove user from watchlist

    // Create watchlist



    ////////////////////////////
    // RENDER //////////////////
    ////////////////////////////
    return (
        <div className='flexStartCenter gap-4 flex-col'>

            {/* FORM */}
            <form className='flexStartCenter gap-4 flex-col mt-10'>

                {/* TITLE */}
                <div className='flexStartStart flex-col gap-2'>

                    {/* LABEL */}
                    <h2>Title</h2>

                    {/* INPUT */}
                    <input
                        className='bg-bgLight p-3 rounded-md text-[12px] focus:outline-none text-white w-80 shadow-md'
                        placeholder='Give your new watchlist a title...'
                        type='text'
                        {...register('title', { required: true, maxLength: 20 })}
                    />

                </div>

                {/* DESCRIPTION */}
                <div className='flexStartStart flex-col gap-2'>

                    {/* LABEL */}
                    <h2>Description</h2>

                    {/* INPUT */}
                    <textarea
                        className='bg-bgLight p-3 rounded-md text-[12px] focus:outline-none text-white w-80 shadow-md h-20 resize-none'
                        placeholder='Enter a description for your watchlist...'
                        {...register('description', { required: false })}
                    ></textarea>

                </div>

                {/* ADMINS */}
                <div className='flexStartStart flex-col w-full gap-2'>

                    {/* LABEL */}
                    <h2>Admins</h2>

                    <div className={`
                        bg-bgLight 
                            p-3 
                            rounded-md 
                            text-[12px] 
                            focus:outline-none 
                          text-white 
                            shadow-md 
                            flex
                            justify-between
                            items-center
                            w-full
                            cursor-pointer
                            min-h-[81px]
                            transition
                            border
                            border-bgColor
                            ${watchlistUsers.admins.length > 0 ? 'fullHighlightedShadow' : 'hover:border-highlightedColor'
                        }
                    `}>

                        {/* USERS */}
                        <WatchListUsersAvatars
                            users={watchlistUsers.admins}
                            currentUserId={currentUser.id}
                        />

                        {/* NUM USERS */}
                        <div className='text-highlightedColor'>
                            {`(${watchlistUsers.admins.length})`}
                        </div>
                    </div>


                </div>

                {/* EDITORS */}
                <div className='flexStartStart flex-col w-full gap-2'>

                    {/* LABEL */}
                    <h2>Editors</h2>

                    <div className={`
                        bg-bgLight 
                            p-3 
                            rounded-md 
                            text-[12px] 
                            focus:outline-none 
                          text-white 
                            shadow-md 
                            flex
                            justify-between
                            items-center
                            w-full
                            cursor-pointer
                            min-h-[81px]
                            transition
                            border
                            border-bgColor
                            ${watchlistUsers.editors.length > 0 ? 'fullHighlightedShadow' : 'hover:border-highlightedColor'
                        }
                    `}>

                        {/* USERS */}
                        {
                            watchlistUsers.editors.length > 0 ? (
                                <WatchListUsersAvatars
                                    users={watchlistUsers.viewers}
                                    currentUserId={currentUser.id}
                                />
                            ) : (
                                <div className='text-placeholderColor'>
                                    Click to add editors
                                </div>
                            )
                        }

                        {/* NUM USERS */}
                        <div className='text-highlightedColor'>
                            {`(${watchlistUsers.editors.length})`}
                        </div>
                    </div>


                </div>

                {/* VIEWERS */}
                <div className='flexStartStart flex-col w-full gap-2'>

                    {/* LABEL */}
                    <h2>Viewers</h2>

                    <div className={`
                        bg-bgLight 
                            p-3 
                            rounded-md 
                            text-[12px] 
                            focus:outline-none 
                          text-white 
                            shadow-md 
                            flex
                            justify-between
                            items-center
                            w-full
                            cursor-pointer
                            min-h-[81px]
                            transition
                            border
                            border-bgColor
                            ${watchlistUsers.viewers.length > 0 ? 'fullHighlightedShadow' : 'hover:border-highlightedColor'
                        }
                    `}>

                        {/* USERS */}
                        {
                            watchlistUsers.editors.length > 0 ? (
                                <WatchListUsersAvatars
                                    users={watchlistUsers.viewers}
                                    currentUserId={currentUser.id}
                                />
                            ) : (
                                <div className='text-placeholderColor'>
                                    Click to add viewers
                                </div>
                            )
                        }


                        {/* NUM USERS */}
                        <div className='text-highlightedColor'>
                            {`(${watchlistUsers.viewers.length})`}
                        </div>
                    </div>


                </div>

                {/* CREATE WATCHLIST BTN */}
                <Button
                    title='Create'
                    paddingX='12'
                    bgColor='highlightedColor'
                    bgHoverColor='highlightedHover'
                    type='submit'
                    className='mt-2'
                />

            </form>



            {/* MODAL */}

        </div>
    )
}

export default WatchListForm