import Button from "@/components/ui/Button";
import { IFollow } from "@/types";
import Image from "next/image";


interface IProps {
    followers: IFollow[];
}

export default async function FollowersList({
    followers,
}: IProps) {

    // Remove follower
    const removeFollower = async (e: FormData) => {
        'use server'
    }

    // Follow
    const followUser = async (e: FormData) => {
        'use server'
    }

    // Unfollow
    const unfollowUser = async (e: FormData) => {
        'use server'

    }


    return followers.length > 0 ? followers.map((follower, index) => {
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
                    </form>

                    {/* FOLLOW / UNFOLLOW */}
                    {
                        follower.followerUser.followers.find((follow) => follow.followedUserId === follower.followedUserId) ? (
                            <form action={followUser}>
                                <Button
                                    title="Unfollow"
                                    bgColor="bgLight"
                                    bgHoverColor="bgLighter"
                                    paddingX="8"
                                    className="text-xs"
                                    type='submit'
                                />
                            </form>
                        ) : (
                            <form action={unfollowUser}>
                                <Button
                                    title="Follow"
                                    bgColor="highlightedColor"
                                    bgHoverColor="highlightedHover"
                                    paddingX="8"
                                    className="text-xs"
                                    type='submit'
                                />
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