import PaginationComponent from "@/components/ui/PaginationComponent";
import { searchUsers } from "@/services";
import Image from "next/image";
import React from "react";
import UserInfo from "./UserInfo";
import { IUserWithConnections } from "@/types";
import Button from "@/components/ui/Button";



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

    //TODO
    const removeFollower = async (e: FormData) => {
        'use server'
    }

    //TODO
    const unfollowUser = async (e: FormData) => {
        'use server'
    }

    //TODO
    const followUser = async (e: FormData) => {
        'use server'
    }

    //TODO 
    const cancelFollowRequest = async (e: FormData) => {

    }

    return (
        <div className="w-full h-full flexStartStart flex-col p-4 pl-12 gap-3">


            {/* USERS */}
            <div className="flexStartCenter flex-col gap-4 flex-1 w-full">
                {
                    users.map((user) => {

                        const isUserFollowingCurrentUser = currentUser.followers.find((follower) => follower.followerUserId === user.id) !== undefined;

                        const isCurrentUserFollowingUser = currentUser.following.find((following) => following.followedUserId === user.id) !== undefined;

                        const isCurrentUserRequestingToFollowUser = currentUser.followingRequests.find((followingRequest) => user.id === followingRequest.followedUserId)

                        console.log(isCurrentUserRequestingToFollowUser)

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