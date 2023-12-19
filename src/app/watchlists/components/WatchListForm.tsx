'use client'

import Button from '@/components/ui/Button';
import { ICreateWatchListUsersState, ICreateWatchlistFormData, IUser, IWatchList } from '@/types'
import React, { useCallback, useMemo, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import WatchListUsersAvatars from './WatchListUsersAvatars';
import Modal from '@/components/ui/Modal';
import { MANAGE_WATCHILIST_USERS_MODAL_ID } from '@/lib/constants';
import WatchListUsersModal from './WatchListUsersModal';
import { closeModal, openModal } from '@/lib/utils';
import { LOADING_MODAL_ID } from '@/lib/constants/common.constants';

import Alert from '@/components/ui/Alert';
import { useRouter } from 'next/navigation'

type Props = {
    availableUsers: IUser[];
    currentUser: IUser;
    existingWatchlist?: IWatchList;
}

function getExistingWatchlistUsers(watchlist: IWatchList, availableUsers: IUser[]) {

    const filterUsersByRole = (role: string) => {
        const userRoleIds = watchlist.watchlistUsers
            .filter((watchlistUser) => watchlistUser.role === role)
            .map((user) => user.userId);

        return availableUsers.filter((user) => userRoleIds.includes(user.id));
    };
    const admins = filterUsersByRole('admin');
    const editors = filterUsersByRole('editor');
    const viewers = filterUsersByRole('viewer');
    return {
        admins,
        editors,
        viewers,
        currentType: null,
    };
}

function WatchListForm({
    currentUser,
    availableUsers,
    existingWatchlist,
}: Props) {

    const router = useRouter();

    ////////////////////////////
    // FORM STATE //////////////
    ////////////////////////////

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ICreateWatchlistFormData>({
        defaultValues: {
            title: existingWatchlist ? existingWatchlist.name : '',
            description: existingWatchlist ? existingWatchlist.description : ''
        }
    });

    ////////////////////////////
    // STATE ///////////////////
    ////////////////////////////

    const [
        watchlistUsers,
        setWatchlistUsers,
    ] = useState<ICreateWatchListUsersState>(
        existingWatchlist ?
            getExistingWatchlistUsers(
                existingWatchlist,
                [...availableUsers, currentUser],
            )
            :
            {
                admins: [currentUser], // By default, creator is the watchlist admin.
                editors: [],
                viewers: [],
                currentType: null,
            }
    )

    const [
        isCreatingWatchlist,
        setIsCreatingWatchlist,
    ] = useState<boolean>(false);

    ////////////////////////////
    // MEMO ////////////////////
    ////////////////////////////

    const filteredAvailableUsers = useMemo(() => {

        // Get all picked users
        const allPickedUsers =
            [
                ...watchlistUsers.admins,
                ...watchlistUsers.editors,
                ...watchlistUsers.viewers
            ].map((user) => user.id);

        // Filter the available users (users that mutually follow the current user) such that they are not yet picked
        return availableUsers.filter((user) => !allPickedUsers.includes(user.id));

    }, [availableUsers, watchlistUsers.admins, watchlistUsers.editors, watchlistUsers.viewers])

    ////////////////////////////
    // FUNCTIONS ///////////////
    ////////////////////////////

    // Edit users
    const editUsers = useCallback((type: 'admins' | 'editors' | 'viewers') => {

        // Set the current type
        setWatchlistUsers((prevWatchlistUsers) => {
            return {
                ...prevWatchlistUsers,
                currentType: type,
            }
        })

        // Open modal
        openModal(MANAGE_WATCHILIST_USERS_MODAL_ID)

    }, [])

    // Confirm edit users
    const confirmEditUsers = useCallback((users: IUser[]) => {

        // Update state
        setWatchlistUsers((prevWatchlistUsers) => {
            return {
                ...prevWatchlistUsers,
                [watchlistUsers.currentType!]: users,
                currentType: null,
            }
        });

        // Close modal
        closeModal(MANAGE_WATCHILIST_USERS_MODAL_ID)

    }, [watchlistUsers.currentType])


    // Create watchlist
    const createWatchlist: SubmitHandler<ICreateWatchlistFormData> = useCallback(async (formData) => {

        // If already loading => skip
        if (isCreatingWatchlist) return;

        // Set loading  
        setIsCreatingWatchlist(true);

        // Loading modal
        openModal(LOADING_MODAL_ID);

        const data = {
            ...formData,
            admins: watchlistUsers.admins.map((user) => user.id),
            editors: watchlistUsers.editors.map((user) => user.id),
            viewers: watchlistUsers.viewers.map((user) => user.id),
        };

        let response: Response;

        // Send request to backend
        if (existingWatchlist) {
            // Update watchlist call!
            response = await fetch('/api/watchlists/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...data, id: existingWatchlist.id }),
            })
        } else {
            response = await fetch('/api/watchlists/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
        }

        // Close loading modal
        closeModal(LOADING_MODAL_ID);

        if (!response!.ok) {
            const errorData = await response!.json();
            console.error(errorData.error)
            router.push(`/error?message=Couldn\'t ${existingWatchlist ? 'edit' : 'create'} watchlist! try again :)`);
        }

        // Redirect
        if (existingWatchlist) {
            router.replace(`/watchlist/${existingWatchlist.id}`);
        } else {
            router.replace('/watchlists');
        }


    }, [existingWatchlist, isCreatingWatchlist, router, watchlistUsers.admins, watchlistUsers.editors, watchlistUsers.viewers])


    ////////////////////////////
    // RENDER //////////////////
    ////////////////////////////

    return (
        <div className='flexStartCenter gap-4 flex-col'>

            {/* FORM */}
            <form className='flexStartCenter gap-4 flex-col mt-10' onSubmit={handleSubmit(createWatchlist)}>

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

                    {errors.title && <Alert message={errors.title.message!.length > 0 ? errors.title.message! : errors.title.type} />}
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

                    {errors.description && <Alert message={errors.description.message!} />}
                </div>

                {/* ADMINS */}
                <div className='flexStartStart flex-col w-full gap-2'>

                    {/* LABEL */}
                    <h2>Admins</h2>

                    <div

                        onClick={() => editUsers('admins')}
                        className={`
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

                    <div

                        onClick={() => editUsers('editors')}

                        className={`
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
                                    users={watchlistUsers.editors}
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

                    <div

                        onClick={() => editUsers('viewers')}
                        className={`
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
                            watchlistUsers.viewers.length > 0 ? (
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
                    title={existingWatchlist ? 'Edit' : 'Create'}
                    paddingX='12'
                    bgColor='highlightedColor'
                    bgHoverColor='highlightedHover'
                    type='submit'
                    className='mt-2'
                />

            </form>


            {/* MODAL */}
            <Modal
                title='Manage watchlist users'
                modalId={MANAGE_WATCHILIST_USERS_MODAL_ID}
            >
                {
                    watchlistUsers.currentType && (
                        <WatchListUsersModal
                            availableUsers={filteredAvailableUsers}
                            pickedUsers={watchlistUsers[watchlistUsers.currentType]}
                            onConfirm={confirmEditUsers}
                            currentUserId={currentUser.id}
                            type={watchlistUsers.currentType}
                        />
                    )
                }

            </Modal>

        </div>
    )
}

export default WatchListForm