

import React from 'react'
import { Database } from '@/types/database.types';
import Image from 'next/image';

type User = Database['public']['Tables']['users']['Row'];

type Props = {
    user: User
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
                className='rounded-full'
            /></label>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                    <form action='/api/auth/signout' method="POST" className='flex justify-start items-center'>
                        <button type='submit' className='w-full'>
                            Logout
                        </button>
                    </form>
                </li>
                {/* <li>
                    <form action={redirectToChangePassword}>
                        <button type='submit' className='w-full'>
                            Reset password
                        </button>
                    </form>

                </li> */}
            </ul>
        </div>
    )
}

export default NavbarAvatarButton