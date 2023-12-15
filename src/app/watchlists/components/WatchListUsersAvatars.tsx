import { IUser } from '@/types'
import Image from 'next/image';
import React from 'react'

type Props = {
    users: IUser[];
}

const WatchListUsersAvatars = ({
    users,
}: Props) => {
    return (
        <div className='flexStartCenter h-full'>

            {
                users.slice(0, 6).map((user, index) => {

                    return (
                        <div
                            key={`watch_user_${user.id}_${index}`}
                            title={user.username}
                            style={{
                                marginLeft: index === 0 ? 0 : -30,
                            }}
                        >
                            <Image
                                src={user.avatarUrl!}
                                alt="Profile Pic"
                                width={55}
                                height={50}
                                className='rounded-full cursor-pointer border p-1 bg-white'
                            />
                        </div>
                    )
                })
            }

            {
                users.length > 5 && (
                    <div className='h-full mb-2 flex justify-center items-end text-lg'>
                        <p>.....</p>
                    </div>
                )
            }

        </div>
    )
}

export default WatchListUsersAvatars