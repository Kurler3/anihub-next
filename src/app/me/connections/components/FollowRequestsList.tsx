import { IFollowRequest } from "@/types";
import Image from "next/image";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface IProps {
    followRequests: IFollowRequest[];
}

export default function FollowRequestsList({
    followRequests
}: IProps) {


    // Accept follow request
    const acceptFollowRequest = async (e: FormData) => {
        'use server'


        const followerUserId = e.get('followerUserId') as string;
        const followedUserId = e.get('followedUserId') as string;

        try {

            // Delete the follow request
            await prisma.followRequest.delete({
                where: {
                    followerUserId_followedUserId: {
                        followerUserId,
                        followedUserId,
                    }
                }
            })

            // Create a follow item
            await prisma.follow.create({
                data: {
                    followerUserId,
                    followedUserId,
                }
            })

            // Revaluate path
            revalidatePath('/me/connections?tab=followRequests')

        } catch (error) {
            console.error('Error while accepting follow request...', error);
        }

    }

    // Deny follow request

    return followRequests.length > 0 ? (
        followRequests.map((followRequest, index) => {

            return (
                <div
                    key={`follow_request_${followRequest.followerUserId}_${index}`}
                    className="w-full bg-bgColor flex justify-between items-center p-2 rounded-md shadow-lg px-4"
                >

                    {/* USER INFO */}
                    <div className="flexCenterCenter gap-4">
                        {/* AVATAR */}
                        <Image
                            src={followRequest.followerUser.avatarUrl ?? ''}
                            alt='Follower avatar'
                            width={50}
                            height={50}
                            className="rounded-full"
                        />

                        {/* NAME */}
                        <div>
                            {followRequest.followerUser.username}
                        </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="flexCenterCenter gap-3">

                        {/* ACCEPT */}
                        <form
                            action={acceptFollowRequest}
                            className="bg-bgLight cursor-pointer rounded-md shadow-lg p-2 hover:bg-bgLighter transition"
                        >
                            <button type='submit'>
                                <CheckIcon className='text-green-600' />
                            </button>
                            <input
                                type='hidden'
                                className="hidden"
                                name='followerUserId'
                                value={followRequest.followerUserId}
                            />
                            <input
                                type='hidden'
                                className="hidden"
                                name='followedUserId'
                                value={followRequest.followedUserId}
                            />
                        </form>

                        {/* REMOVE */}
                        <form className="bg-bgLight cursor-pointer rounded-md shadow-lg p-2 hover:bg-bgLighter transition">
                            <button type='submit'><ClearIcon className='text-red-600' /></button>

                            <input
                                type='submit'
                                className="hidden"
                            />
                            <input
                                type='hidden'
                                className="hidden"
                                name='followerUserId'
                                value={followRequest.followerUserId}
                            />
                            <input
                                type='hidden'
                                className="hidden"
                                name='followedUserId'
                                value={followRequest.followedUserId}
                            />
                        </form>


                    </div>



                </div>
            )

        })
    ) : (
        <div className="w-full text-center mt-20 text-2xl">
            You have no follow requests 😢
        </div>
    )
}
