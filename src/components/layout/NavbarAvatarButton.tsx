

import React from 'react'
import { Database } from '@/types/database.types';
import Image from 'next/image';
import Link from 'next/link';

type User = Database['public']['Tables']['users']['Row'];

type Props = {
    user: User & { provider?: string }
}

const NavbarAvatarButton = ({
    user
}: Props) => {

    return (
        <div className='p-1 rounded-md transition hover:bg-bgDarkColor dropdown dropdown-end cursor-pointer'>
            <label tabIndex={0}><Image
                src={user.avatarUrl!}
                alt="Profile Pic"
                width={55}
                height={50}
                className='rounded-full cursor-pointer'
            /></label>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                    <Link href={`/user/${user.id}`} className='flex justify-start items-center'>
                        <button className='w-full'>
                            View profile
                        </button>
                    </Link>
                    <form action='/api/auth/signout' method="POST" className='flex justify-start items-center'>
                        <button type='submit' className='w-full'>
                            Logout
                        </button>
                    </form>
                </li>
                {
                    user.provider && user.provider === 'email' && (
                        <li>
                            <Link href="/reset-pwd" className='flexCenterCenter'>

                                <button className='w-full'>
                                    Reset password
                                </button>
                            </Link>
                        </li>
                    )
                }

            </ul>
        </div >
    )
}

export default NavbarAvatarButton