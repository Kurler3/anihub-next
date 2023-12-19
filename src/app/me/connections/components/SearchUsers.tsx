import PaginationComponent from "@/components/ui/PaginationComponent";
import { searchUsers } from "@/services";
import Image from "next/image";
import React from "react";
import UserInfo from "./UserInfo";
import { IUserWithConnections } from "@/types";
import Button from "@/components/ui/CustomButton";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import SearchBar from "@/components/inputs/SearchBar";
import TextInput from "@/components/inputs/TextInput";



interface IProps {
    q?: string;
    page?: number;
    currentUser: IUserWithConnections;
}

export default async function SearchUsers({
    q,
    page,
    currentUser
}: IProps) {

    // Get users
    const {
        users,
        pagination
    } = await searchUsers({ q, page });

    const removeFollower = async (e: FormData) => {
        'use server'

        const followedUserId = e.get('followedUserId') as string;
        const followerUserId = e.get('followerUserId') as string;

        try {

            // Remove follower.
            await prisma.follow.delete({
                where: {
                    followedUserId_followerUserId: {
                        followedUserId,
                        followerUserId
                    }
                }
            })

            // Revalidate path.
            revalidatePath('/me/connections?tab=findPeople')

        } catch (error) {
            console.error('Error removing follower: ', error);
            redirect('/error?message=Something went wrong while removing the follower');
        }

    }

    const unfollowUser = async (e: FormData) => {
        'use server'

        const followedUserId = e.get('followedUserId') as string;
        const followerUserId = e.get('followerUserId') as string;

        try {
            // Remove follow.
            await prisma.follow.delete({
                where: {
                    followedUserId_followerUserId: {
                        followedUserId,
                        followerUserId
                    }
                }
            })

            // Revalidate path.
            revalidatePath('/me/connections?tab=findPeople')
        } catch (error) {
            console.error('Error unfollowing: ', error);
            redirect('/error?message=Something went wrong while removing the follower');
        }
    }

    const followUser = async (e: FormData) => {
        'use server'

        const followedUserId = e.get('followedUserId') as string;
        const followerUserId = e.get('followerUserId') as string;

        try {

            const userToFollow = await prisma.user.findUnique({
                where: {
                    id: followedUserId
                }
            });

            if (!userToFollow) {
                throw new Error('User to follow not found');
            }

            if (userToFollow.isProfilePublic) {
                // Create follow.
                await prisma.follow.create({
                    data: {
                        followedUserId,
                        followerUserId
                    }
                })
            } else {
                await prisma.followRequest.create({
                    data: {
                        followedUserId,
                        followerUserId
                    }
                })
            }



            // Revalidate path.
            revalidatePath('/me/connections?tab=findPeople')
        } catch (error) {
            console.error('Error following: ', error);
            redirect('/error?message=Something went wrong while following a user');
        }
    }

    const cancelFollowRequest = async (e: FormData) => {
        'use server'

        const followedUserId = e.get('followedUserId') as string;
        const followerUserId = e.get('followerUserId') as string;

        try {

            // Remove follow request.
            await prisma.followRequest.delete({
                where: {
                    followerUserId_followedUserId: {
                        followedUserId,
                        followerUserId
                    },
                }
            })

            // Revalidate path.
            revalidatePath('/me/connections?tab=findPeople')
        } catch (error) {
            console.error('Error canceling follow request: ', error);
            redirect('/error?message=Something went wrong while canceling a follow request');
        }
    }

    return (
        <div className="w-full h-full flexStartStart flex-col p-4 pl-12 gap-3">

            {/* SEARCH */}
            <form className='w-full flexStartCenter gap-3 flex-wrap'>

                {/* SEARCH INPUT */}
                {/* SEARCH INPUT */}
                <TextInput
                    name="q"
                    placeholder='Search for users...'
                    initialValue={q ?? ''}
                />

                <input
                    type='hidden'
                    name='tab'
                    value='findPeople'
                />

                {/* SUBMIT */}
                <Button
                    title='Filter'
                    type='submit'
                    bgColor='highlightedColor'
                    bgHoverColor='highlightedColorHover'
                    paddingX='8'
                    className='text-sm'
                />

            </form>

            {/* USERS */}
            <div className="flexStartCenter flex-col gap-4 flex-1 w-full">
                {
                    users.map((user) => {

                        const isUserFollowingCurrentUser = currentUser.followers.find((follower) => follower.followerUserId === user.id) !== undefined;

                        const isCurrentUserFollowingUser = currentUser.following.find((following) => following.followedUserId === user.id) !== undefined;

                        const isCurrentUserRequestingToFollowUser = currentUser.followingRequests.find((followingRequest) => user.id === followingRequest.followedUserId) !== undefined;

                        return (
                            <div
                                key={`search_user_${user.id}`}
                                className="w-full bg-bgColor flex justify-between items-center p-2 rounded-md shadow-lg px-4"
                            >

                                {/* USER INFO */}
                                <UserInfo
                                    user={user}
                                    currentUser={currentUser}
                                />

                                {/* ACTIONS */}
                                {
                                    currentUser.id !== user.id && (
                                        <div className="flexCenterCenter gap-3">

                                            {/* REMOVE FOLLOWER */}
                                            {
                                                isUserFollowingCurrentUser && (
                                                    <form action={removeFollower}>
                                                        <Button
                                                            title="Remove follower"
                                                            bgColor="bgLight"
                                                            bgHoverColor="bgLighter"
                                                            paddingX="8"
                                                            className="text-xs"
                                                            type='submit'
                                                        />
                                                        <input type="hidden" name="followedUserId" value={currentUser.id} />
                                                        <input type="hidden" name="followerUserId" value={user.id} />
                                                    </form>
                                                )
                                            }

                                            {/* FOLLOW/UNFOLLOW */}
                                            {
                                                isCurrentUserRequestingToFollowUser ? (
                                                    <form action={cancelFollowRequest}>
                                                        <Button
                                                            title='Cancel follow request'
                                                            bgColor='red-500'
                                                            paddingX="8"
                                                            className="text-xs"
                                                            bgHoverColor='red-600'
                                                            type='submit'
                                                        />
                                                        <input type="hidden" name="followedUserId" value={user.id} />
                                                        <input type="hidden" name="followerUserId" value={currentUser.id} />
                                                    </form>
                                                ) :
                                                    isCurrentUserFollowingUser ? (
                                                        <form action={unfollowUser}>
                                                            <Button
                                                                title="Unfollow"
                                                                bgColor="bgLight"
                                                                bgHoverColor="bgLighter"
                                                                paddingX="8"
                                                                className="text-xs"
                                                                type='submit'
                                                            />
                                                            <input type="hidden" name="followedUserId" value={user.id} />
                                                            <input type="hidden" name="followerUserId" value={currentUser.id} />
                                                        </form>
                                                    ) : (
                                                        <form action={followUser}>
                                                            <Button
                                                                title="Follow"
                                                                bgColor="highlightedColor"
                                                                bgHoverColor="highlightedHover"
                                                                paddingX="8"
                                                                className="text-xs"
                                                                type='submit'
                                                            />
                                                            <input type="hidden" name="followedUserId" value={user.id} />
                                                            <input type="hidden" name="followerUserId" value={currentUser.id} />
                                                        </form>
                                                    )
                                            }

                                        </div>
                                    )
                                }



                            </div>
                        )
                    })
                }
            </div>

            {/* PAGINATION */}
            <PaginationComponent
                currentPage={
                    page ? typeof page === 'string' ? parseInt(page) : page : 1
                }
                data={pagination}
            />
        </div>
    )

}