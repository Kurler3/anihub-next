import Button from "@/components/ui/Button";
import prisma from "@/lib/prisma";
import { IFollow } from "@/types";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import { redirect } from "next/navigation";


interface IProps {
    followers: IFollow[];
}

export default async function FollowersList({
    followers,
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

            // Create follow.
            await prisma.follow.create({
                data: {
                    followedUserId: followerUserId,
                    followerUserId: followedUserId,
                }
            });

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


    return followers.length > 0 ? followers.map((follower, index) => {

        const isFollowing = follower.followerUser.followers.find((follow) => follow.followerUserId === follower.followedUserId) !== undefined;

        return (
            <div
                key={`follower_${follower.followerUserId}_${index}`}
                className="w-full bg-bgColor flex justify-between items-center p-2 rounded-md shadow-lg px-4"
            >
                {/* USER INFO */}
                <div className="flexCenterCenter gap-4">
                    {/* AVATAR */}
                    <Image
                        src={follower.followerUser.avatarUrl ?? ''}
                        alt='Follower avatar'
                        width={50}
                        height={50}
                        className="rounded-full"
                    />

                    {/* NAME */}
                    <div>
                        {follower.followerUser.username}
                    </div>
                </div>

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