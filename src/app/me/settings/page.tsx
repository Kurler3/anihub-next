
import HorizontalSeparator from '@/components/HorizontalSeparator';
import Button from '@/components/ui/Button';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/supabase/supabase-server'
import { IFollowRequest, IUserWithFollowRequests } from '@/types';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'


const SettingsPage = async () => {

    const currentUser = await getCurrentUser({
        followerRequests: true,
    }) as unknown as IUserWithFollowRequests;


    //////////////////////////////
    // FUNCTIONS /////////////////
    //////////////////////////////

    // Handle make profile public / non public
    async function handleMakeProfilePublic(e: FormData) {
        'use server'

        // Check or not
        const isPublic = (e.get('isPublic') as string) === 'on';

        const followerRequests = JSON.parse(e.get('followerRequests') as string) as IFollowRequest[];
        const userId = e.get('userId') as string;
        const wasUserPublic = (e.get('wasUserPublic') as string) === 'true';

        try {

            console.log(isPublic, wasUserPublic)

            // If different from current isPublic
            if (isPublic !== wasUserPublic) {

                // Update user
                await prisma.user.update({
                    where: {
                        id: userId
                    },
                    data: {
                        isProfilePublic: isPublic
                    }
                })

                // If is now public => check for follow requests
                if (isPublic && followerRequests.length > 0) {

                    // Delete all the follower requests and create follows.
                    await prisma.followRequest.deleteMany({
                        where: {
                            followedUserId: userId,
                        }
                    });

                    // Create follows
                    await prisma.follow.createMany({
                        data: followerRequests.map(followRequest => {
                            return {
                                followedUserId: userId,
                                followerUserId: followRequest.followerUserId,
                            }
                        })
                    })

                }

                revalidatePath('/me/settings')
            }



        } catch (error) {
            console.error('Error while changing is public of profile: ', error);

            redirect('/error?message=Error while updating profile');
        }

    }

    // Handle delete account
    async function handleDeleteAccount(e: FormData) {
        "use server"

        const userId = e.get('userId') as string;

        try {

            // Delete user in db
            await prisma.user.delete({
                where: {
                    id: userId,
                }
            })

            // Logout
            await fetch('/api/auth/signout', {
                method: 'POST'
            })

        } catch (error) {
            console.error('Error while changing is public of profile: ', error);

            redirect('/error?message=Error while updating profile');
        }

    }



    //////////////////////////////
    // RENDER ////////////////////
    //////////////////////////////

    return (
        <div className='w-full flexStartStart flex-col p-8 gap-10 h-full'>

            {/* TITLE */}
            <h2 className='text-2xl'>
                Settings
            </h2>

            {/* SEPARATOR */}
            <HorizontalSeparator width={100} />

            {/* PROFILE PUBLIC */}

            <form
                action={handleMakeProfilePublic}
                className='flexStartStart gap-4 flex-col'
            >

                <h3 className='text-xl'>
                    Profile Public
                </h3>

                <div className='flexStartCenter gap-4'>
                    <input
                        type="checkbox"
                        name='isPublic' className="toggle" defaultChecked={currentUser?.isProfilePublic} />

                    <Button
                        title='Confirm'
                        bgColor='highlightedColor'
                        className='text-xs'
                        type='submit'
                    />
                </div>

                <input
                    type='hidden'
                    name='followerRequests'
                    value={JSON.stringify(currentUser.followerRequests)}
                />
                <input type="hidden" name="userId" value={currentUser.id} />
                <input type="hidden" name="wasUserPublic" value={currentUser.isProfilePublic.toString()} />
            </form>

            {/* SEPARATOR */}
            <HorizontalSeparator width={100} />

            {/* RESET PWD */}
            <Link href='/reset-pwd' className='flexStartStart gap-4 flex-col'>

                <h3 className='text-xl'>
                    Reset Password
                </h3>

                <Button
                    title='Reset Password'
                    bgColor='highlightedColor'
                    className='text-xs'
                />

            </Link>

            {/* SEPARATOR */}
            <HorizontalSeparator width={100} />

            {/* DELETE ACCOUNT */}
            <form
                action={handleDeleteAccount}
                className='flexStartStart gap-4 flex-col border border-red-500 w-full rounded-md p-8'
            >
                <h3 className='text-lg'>
                    Delete Account
                </h3>

                <Button
                    title='Confirm delete your account'
                    bgColor='highlightedColor'
                    className='text-xs'
                    type='submit'
                />

                <input type="hidden" name="userId" value={currentUser.id} />
            </form>

        </div>
    )
}

export default SettingsPage