

import UserInfo from '@/app/me/connections/components/UserInfo';
import Button from '@/components/ui/CustomButton';
import { getSocialPagePeople } from '@/services';
import { IUserWithConnections } from '@/types'
import Link from 'next/link';
import React from 'react'

type Props = {
    currentUser?: IUserWithConnections;
}

const SocialPagePeople = async ({
    currentUser
}: Props) => {

    const people = await getSocialPagePeople({ currentUser });

    return (
        <div className='h-full p-4 min-w-[30%] flexStartStart gap-4 flex-col'>

            {/* TITLE */}
            <h1 className='text-lg'>
                People
            </h1>

            <Link href='/me/connections?tab=findPeople' className='flexCenterCenter w-full'>
                <Button
                    title='Search People'
                    bgColor='primary'
                    paddingX='8'
                    className='w-full text-sm bg-primary hover:scale-105'
                />
            </Link>

            {/* FOLLOW REQUESTS */}
            {
                currentUser && currentUser.followerRequests.length > 0 && (
                    <Link href='/me/connections?tab=followRequests' className='flexCenterCenter w-full'>
                        <Button
                            title={`See follow requests (${currentUser.followerRequests.length})`}
                            paddingX='8'
                            className='w-full text-sm bg-warning hover:scale-105'
                        />
                    </Link>
                )
            }

            <div className='flexStartCenter gap-2 w-full flex-col'>



                {
                    people.map((user) => {

                        return (
                            <div
                                key={`social_page_user_${user.id}`}
                                className="w-full bg-bgColor flex justify-start items-center p-2 rounded-md shadow-lg px-4"
                            >

                                {/* USER INFO */}
                                <UserInfo
                                    user={user}
                                    currentUser={currentUser}
                                />

                            </div>
                        )

                    })
                }


            </div>
        </div>
    )
}

export default SocialPagePeople