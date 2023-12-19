import Button from "@/components/ui/CustomButton";
import prisma from "@/lib/prisma";
import { IFollow } from "@/types";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import { redirect } from "next/navigation";
import UserInfo from "./UserInfo";

interface IProps {
    following: IFollow[];
}

export default function FollowingList({
    following
}: IProps) {


    const removeFollower = async (e: FormData) => {
        'use server'

        const followedUserId = e.get('followedUserId') as string;
        const followerUserId = e.get('followerUserId') as string;

        try {

            // Delete
            await prisma.follow.delete({
                where: {
                    followedUserId_followerUserId: {
                        followedUserId,
                        followerUserId
                    }
                }
            })

            revalidatePath('/me/connections')

        } catch (error) {
            console.error('Error while removing follower: ', error);
            redirect('/error?message=Something went wrong while removing follower');
        }
    }

    const unfollow = async (e: FormData) => {
        'use server'

        const followedUserId = e.get('followedUserId') as string;
        const followerUserId = e.get('followerUserId') as string;

        try {

            // Delete
            await prisma.follow.delete({
                where: {
                    followedUserId_followerUserId: {
                        followedUserId,
                        followerUserId
                    }
                }
            })

            revalidatePath('/me/connections')

        } catch (error) {
            console.error('Error while removing follower: ', error);
            redirect('/error?message=Something went wrong while unfollowing user');
        }

    }

    return following.length > 0 ? (
        following.map((following, index) => {

            const isBeingFollowed = following.followedUser.following.find((follow) => follow.followedUserId === following.followerUserId) !== undefined;

            return (
                <div
                    key={`follower_${following.followedUserId}_${index}`}
                    className="w-full bg-bgColor flex justify-between items-center p-2 rounded-md shadow-lg px-4"
                >
                    {/* USER INFO */}
                    <UserInfo
                        user={following.followedUser}
                    />

                    {/* ACTIONS */}
                    <div className="flexCenterCenter gap-3">

                        {/* REMOVE FOLLOWER (IF HE IS FOLLOWING THIS USER) */}
                        {
                            isBeingFollowed && (
                                <form action={removeFollower}>
                                    <Button
                                        title="Remove follower"
                                        bgColor="bgLight"
                                        bgHoverColor="bgLighter"
                                        paddingX="8"
                                        className="text-xs"
                                        type='submit'
                                    />
                                    <input type="hidden" name="followedUserId" value={following.followerUserId} />
                                    <input type="hidden" name="followerUserId" value={following.followedUserId} />
                                </form>
                            )
                        }

                        {/* UNFOLLOW */}
                        <form action={unfollow}>
                            <Button
                                title="Unfollow"
                                bgColor="bgLight"
                                bgHoverColor="bgLighter"
                                paddingX="8"
                                className="text-xs"
                                type='submit'
                            />
                            <input type="hidden" name="followedUserId" value={following.followedUserId} />
                            <input type="hidden" name="followerUserId" value={following.followerUserId} />
                        </form>

                    </div>


                </div>
            )
        })
    ) : (
        <div className="w-full text-center mt-20 text-2xl">
            You aren{"'"}t following anyone yet
        </div>
    )

}