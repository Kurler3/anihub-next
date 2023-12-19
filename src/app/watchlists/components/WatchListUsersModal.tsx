'use client'

import { IUser } from '@/types';
import Image from 'next/image';
import React, { useEffect, useMemo, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import HorizontalSeparator from '@/components/HorizontalSeparator';
import Button from '@/components/ui/Button';
import { closeModal } from '@/lib/utils';
import { MANAGE_WATCHILIST_USERS_MODAL_ID } from '@/lib/constants';

interface Props {
    availableUsers: IUser[];
    pickedUsers: IUser[];
    onConfirm: (users: IUser[]) => void; // Users array.
    currentUserId: string;
    type: 'admins' | 'editors' | 'viewers'
}

const WatchListUsersModal = ({
    availableUsers,
    pickedUsers,
    onConfirm,
    currentUserId,
    type,
}: Props) => {


    ////////////////////////////////
    // STATE ///////////////////////
    ////////////////////////////////

    // By default => the picked users
    const [
        currentPickedUsers,
        setCurrentPickedUsers,
    ] = useState<IUser[]>(pickedUsers);

    const [searchTerm, setSearchTerm] = useState<string>('');

    ////////////////////////////////
    // MEMO ////////////////////////
    ////////////////////////////////

    const displayUsers = useMemo(() => {

        let allUsers = [
            ...pickedUsers,
            ...availableUsers,
        ]

        // Apply search.
        if (searchTerm.length > 0) {
            allUsers = allUsers.filter((user) => {
                return user.username.toLowerCase().includes(searchTerm.toLowerCase())
            })
        }

        if (
            type !== 'admins'
        ) {
            return allUsers.filter((user) => user.id !== currentUserId);
        }
        return allUsers

    }, [availableUsers, currentUserId, pickedUsers, searchTerm, type])

    ////////////////////////////////
    // FUNCTIONS ///////////////////
    ////////////////////////////////

    // Pick/unpick user
    const clickUser = (user: IUser) => {
        setCurrentPickedUsers((prevPickedUsers) => {
            const idx = prevPickedUsers.findIndex((u) => u.id === user.id);
            if (idx !== -1) {
                return prevPickedUsers.filter((u) => u.id !== user.id);
            } else {
                return [...prevPickedUsers, user];
            }
        })
    }

    ////////////////////////////////
    // USE EFFECT //////////////////
    ////////////////////////////////

    useEffect(() => {
        setCurrentPickedUsers(pickedUsers)
    }, [pickedUsers])

    ////////////////////////////////
    // RENDER //////////////////////
    ////////////////////////////////

    return (
        <div className='flex justify-start items-center flex-col w-full gap-4'>

            {/* SEARCH BAR */}
            <div className='bg-bgLight w-full p-1 px-2 flex justify-start items-center rounded-md' style={{ borderRadius: '7px' }}>
                <SearchIcon className='text-white w-[28px] h-[28px]' />
                <input
                    type="text"
                    placeholder="Search for something..."
                    className='px-4 py-2 focus:outline-none bg-transparent text-placeholderColor text-xs w-100'
                    onChange={({ target: { value } }) => setSearchTerm(value)}
                />
            </div>

            {/* HORIZONTAL SEPARATOR */}
            <HorizontalSeparator
                width={100}
            />

            {/* LIST OF USERS */}
            <div className='flex flex-col justify-start items-center w-full gap-2 max-h-[300px] min-h-[120px] overflow-auto'>

                {
                    displayUsers.length > 0 ? displayUsers.map((user) => {

                        const isPicked = currentPickedUsers.find((u) => u.id === user.id) !== undefined;

                        return (
                            <div
                                key={`user_${user.id}`}
                                className='bg-bgColor w-full p-2 rounded-md border border-bgLight flexStartCenter gap-4'
                                onClick={() => currentUserId !== user.id ? clickUser(user) : {}}
                            >

                                {/* CHECKBOX */}
                                <input type="checkbox" checked={isPicked} className={`checkbox ${currentUserId === user.id ? 'cursor-default' : ''}`} />

                                {/* USER INFO */}


                                {/* AVATAR */}
                                <Image
                                    src={user.avatarUrl ?? ''}
                                    alt='Follower avatar'
                                    width={30}
                                    height={30}
                                    className="rounded-full"
                                />

                                {/* NAME */}
                                <div>
                                    {user.username}

                                    {
                                        currentUserId === user.id ?
                                            ' (You)'
                                            :
                                            ''
                                    }
                                </div>

                            </div>
                        )

                    }) : (
                        <div className='text-lg text-white mt-10'>
                            No users left :(
                        </div>
                    )
                }

            </div>

            {/* HORIZONTAL SEPARATOR */}
            <HorizontalSeparator
                width={100}
            />

            <div className='flex justify-end items-center w-full gap-2'>
                <Button
                    title='Cancel'
                    bgColor='bgLight'
                    onClick={() => {
                        setCurrentPickedUsers(pickedUsers)
                        closeModal(MANAGE_WATCHILIST_USERS_MODAL_ID)
                    }}
                />
                {/* CONFIRM BTN */}
                <Button
                    title='Confirm'
                    bgColor='highlightedColor'
                    bgHoverColor='highlightedHover'
                    onClick={() => onConfirm(currentPickedUsers)}
                />
            </div>


        </div>
    )

}

export default WatchListUsersModal