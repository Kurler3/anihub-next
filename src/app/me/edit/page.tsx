import Button from '@/components/ui/CustomButton';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/supabase/supabase-server'
import Image from 'next/image';
import { redirect } from 'next/navigation';

import React from 'react'

interface IUpdateUser {
    username?: string;
    bio?: string;
}

const EditUser = async () => {

    const user = await getCurrentUser();

    const handleConfirmChanges = async (e: FormData) => {
        'use server'

        const username = e.get('username') as string;
        const bio = e.get('bio') as string;

        const updateObject: IUpdateUser = {};

        if (username !== user!.username) {
            updateObject.username = username;
        }
        if (bio !== user!.bio) {
            updateObject.bio = bio;
        }

        if (Object.keys(updateObject).length > 0) {

            try {

                await prisma.user.update({
                    where: {
                        id: user!.id,
                    },
                    data: updateObject
                })

            } catch (error) {
                // Show error?
                console.error('Error while updating user...', error);
            }

        }

        // Redirect back to user/id
        redirect(`/user/${user!.id}`);
    }

    return (
        <div className='w-full h-full flexStartCenter flex-col gap-6 p-4 pt-10'>

            <Image
                src={user!.avatarUrl!}
                alt='Choosen avatar'
                width={180}
                height={180}
                className='border-2 rounded-full cursor-pointer shadow-md'
            // onClick={() => openModal(CHOOSE_AVATAR_MODAL_ID)}
            />

            <form action={handleConfirmChanges} className='flex justify-center items-center gap-4 flex-col'>

                {/* USERNAME */}
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Username</span>
                    </div>
                    <input
                        className='bg-bgLight p-3 rounded-md text-[12px] focus:outline-none text-white w-80 shadow-md'
                        placeholder='Enter your username...'
                        defaultValue={user!.username}
                        type='text'
                        name='username'
                    />
                </label>


                {/* BIO */}
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Bio</span>
                    </div>
                    <textarea
                        className='bg-bgLight p-3 rounded-md text-[12px] focus:outline-none text-white w-80 shadow-md resize-none'
                        placeholder='Enter a bio...'
                        defaultValue={user!.bio ?? ''}
                        name='bio'
                    ></textarea>
                </label>


                {/* SIGN UP BTN */}
                <Button
                    title='Confirm Changes'
                    paddingX='12'
                    bgColor='highlightedColor'
                    bgHoverColor='highlightedHover'
                    type='submit'
                    className='mt-5'
                />
            </form>

        </div>
    )
}

export default EditUser