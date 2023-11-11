

import Button from '@/components/ui/Button'
import Image from 'next/image'
import React from 'react'
import profilePic from '@/images/profile_pic.svg';


const SignUpPage = () => {
    return (
        <div className='w-full h-full flexCenterCenter flex-col gap-4'>

            {/* CHOSEN AVATAR */}
            <Image
                src={profilePic}
                alt='Choosen avatar'
                width={180}
                height={180}
                className='border-2 rounded-full cursor-pointer shadow-md'
            />

            {/* CHOOSE AVATAR BTN */}
            <Button
                title='Choose avatar'
                bgColor='highlightedColor'
                paddingX='8'
            />

            {/*  */}

        </div>
    )
}
export default SignUpPage