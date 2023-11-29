

import { getCurrentUser } from '@/lib/supabase/supabase-server';
import { getUserById } from '@/services';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react'

type Props = {
    params: {
        id: string;
    };
}

const UserPage = async ({
    params: {
        id,
    }
}: Props) => {

    // Get current user
    const currentUser = await getCurrentUser();

    const user = await getUserById(id);

    if (!user) redirect('/error?message=User not found')

    ////////////////////////////
    // RENDER //////////////////
    ////////////////////////////

    return (
        <div className='w-full flexStartStart flex-col p-4 gap-4 h-full'>

            {/* TOP PART (USER INFO) */}
            <div className='flexStartStart w-full p-4'>

                {/* AVATAR + NAME + BIO */}
                <div className='flexStartStart flex-col'>

                    <Image
                        src={user!.avatarUrl!}
                        alt="Profile Pic"
                        width={150}
                        height={150}
                        className='rounded-full cursor-pointer'
                    />

                    <h2>
                        {user!.username}
                    </h2>

                </div>



            </div>

            {/* SEPARATOR */}

            {/* POSTS/WATCHLISTS TAB */}


        </div>
    )
}

export default UserPage