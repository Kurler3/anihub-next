import Button from "@/components/ui/CustomButton";
import prisma from "@/lib/prisma";
import { IFollow, IUserWithConnections } from "@/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import UserInfo from "./UserInfo";


interface IProps {
    followers: IFollow[];
    currentUser: IUserWithConnections;
}

export default async function FollowersList({
    followers,
    currentUser,
}: IProps) {

    // Remove follower
    const removeFollower = async (e: FormData) => {
        'use server'

        const followedUserId = e.get('followedUserId') as string;
        const followerUserId = e.get('followerUserId') as string;

        try {

            // Delete follow.
            await prisma.follow.delete({
                where: {
                    followedUserId_followerUserId: {
                        followedUserId,
                        followerUserId
                    }
                }
            })

            // Revalidate path.
            revalidatePath('/me/connections')

        } catch (error) {

            // Log error
            console.error('Error: ', error);

            redirect('/error?message=Something went wrong while removing follower')

        }
    }

    // Follow
    const followUser = async (e: FormData) => {
        'use server'

        const followedUserId = e.get('followedUserId') as string;
        const followerUserId = e.get('followerUserId') as string;

        try {

            // Check if the followerUserId => User is public
            const followerUser = await prisma.user.findUnique({
                where: {
                    id: followerUserId,
                },
            });

            if (followerUser?.isProfilePublic) {

                // Create follow.
                await prisma.follow.create({
                    data: {
                        followedUserId: followerUserId,
                        followerUserId: followedUserId,
                    }
                });

            } else {

                // Create follow request
                await prisma.followRequest.create({
                    data: {
                        followedUserId: followerUserId,
                        followerUserId: followedUserId,
                    }
                })
            }

            // Revalidate path.
            revalidatePath('/me/connections?tab=followers')

        } catch (error) {
            console.log('Error while following user: ', error);

            redirect('/error?message=Something went wrong while following user');
        }
    }

    // Unfollow
    const unfollowUser = async (e: FormData) => {
        'use server'

        const followedUserId = e.get('followedUserId') as string;
        const followerUserId = e.get('followerUserId') as string;

        try {

            // Create follow.
            await prisma.follow.delete({
                where: {
                    followedUserId_followerUserId: {
                        followedUserId: followerUserId,
                        followerUserId: followedUserId,
                    }
                }
            });

            // Revalidate path.
            revalidatePath('/me/connections?tab=followers')

        } catch (error) {
            console.log('Error while following user: ', error);

            redirect('/error?message=Something went wrong while following user');
        }

    }

    const handleCancelFollowRequest = async (e: FormData) => {
        'use server'

        const followedUserId = e.get('followedUserId') as string;
        const followerUserId = e.get('followerUserId') as string;

        try {

            // Delete follow request.
            await prisma.followRequest.delete({
                where: {
                    followerUserId_followedUserId: {
                        followerUserId: followedUserId,
                        followedUserId: followerUserId,
                    }
                }
            })

            // Revalidate path.
            revalidatePath('/me/connections?tab=followers')



        } catch (error) {
            console.error('Error: ', error);
            redirect('/error?message=Something went wrong while canceling the follow request');
        }

    }

    return followers.length > 0 ? followers.map((follower, index) => {

        const isFollowing = follower.followerUser.followers.find((follow) => follow.followerUserId === follower.followedUserId) !== undefined;

        const isCurrentUserRequestingToFollow = currentUser.followingRequests.find((followingRequest) => follower.followerUserId === followingRequest.followedUserId) !== undefined;

        return (
            <div
                key={`follower_${follower.followerUserId}_${index}`}
                className="w-full bg-bgColor flex justify-between items-center p-2 rounded-md shadow-lg px-4"
            >
                {/* USER INFO */}
                <UserInfo
                    user={follower.followerUser}
                />

                {/* ACTIONS */}
                <div className="flexCenterCenter gap-3">

                    {/* REMOVE FOLLOWER */}
                    <form action={removeFollower}>
                        <Button
                            title="Remove follower"
                            bgColor="bgLight"
                            bgHoverColor="bgLighter"
                            paddingX="8"
                            className="text-xs"
                            type='submit'
                        />
                        <input type="hidden" name="followedUserId" value={follower.followedUserId} />
                        <input type="hidden" name="followerUserId" value={follower.followerUserId} />
                    </form>

                    {/* FOLLOW / UNFOLLOW */}
                    {
                        isCurrentUserRequestingToFollow ? (
                            <form action={handleCancelFollowRequest}>
                                <Button
                                    title='Cancel follow request'
                                    bgColor='red-500'
                                    paddingX="8"
                                    className="text-xs"
                                    bgHoverColor='red-600'
                                    type='submit'
                                />
                                <input type="hidden" name="followedUserId" value={follower.followedUserId} />
                                <input type="hidden" name="followerUserId" value={follower.followerUserId} />

                            </form>
                        ) :
                            isFollowing ? (
                                <form action={unfollowUser}>
                                    <Button
                                        title="Unfollow"
                                        bgColor="bgLight"
                                        bgHoverColor="bgLighter"
                                        paddingX="8"
                                        className="text-xs"
                                        type='submit'
                                    />
                                    <input type="hidden" name="followedUserId" value={follower.followedUserId} />
                                    <input type="hidden" name="followerUserId" value={follower.followerUserId} />
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
                                    <input type="hidden" name="followedUserId" value={follower.followedUserId} />
                                    <input type="hidden" name="followerUserId" value={follower.followerUserId} />
                                </form>
                            )
                    }

                </div>
            </div>
        )
    }) : (
        <div className="w-full text-center mt-20 text-2xl">
            No followers found
        </div>
    )
}