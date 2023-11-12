
'use client'


import Button from '@/components/ui/Button';
import { PUBLIC_IMAGES_URLS } from '@/lib/constants';
import { getRandomValueFromArray } from '@/lib/utils';
import Image from 'next/image';
import React, { useCallback, useState } from 'react'

type Props = {
    currentAvatar: string;
    handleConfirm: (avatar: string) => void;
}

const ChooseAvatarModalBody = ({ currentAvatar, handleConfirm }: Props) => {

    const [selectedAvatar, setSelectedAvatar] = useState<string>(
        currentAvatar
    );


    const handlePickAvatar = useCallback((avatar: string) => {
        setSelectedAvatar(avatar)
    }, []);

    const handlePickRandom = useCallback(() => {
        const random = getRandomValueFromArray<string>(PUBLIC_IMAGES_URLS);
        handlePickAvatar(random!);
    }, [handlePickAvatar])


    return (
        <div className='flex justify-between items-center flex-col gap-4 w-full h-full'>

            {/* LIST OF AVAILABLE AVATARS */}
            <div className='flex flex-1 justify-start items-center gap-2 w-full border-red-200'>
                {
                    PUBLIC_IMAGES_URLS.map((imageUrl, index) => {

                        const isSelected = imageUrl === selectedAvatar;

                        return (
                            <Image
                                key={`avatar_option_${index}`}
                                src={imageUrl}
                                alt='avatar option'
                                height={80}
                                width={80}
                                className={`${isSelected ? 'border-2' : ''} rounded-full cursor-pointer hover:border-2 transition hover:shadow-md`}
                                onClick={() => handlePickAvatar(imageUrl)}
                            />
                        )
                    })
                }
            </div>

            {/* FOOTER */}
            <div className='border-t border-separatorColor w-full p-2 flex justify-end items-center gap-2'>

                {/* PICK RANDOM */}
                <Button
                    title='Pick random'
                    bgColor='bgLight'
                    bgHoverColor='bgDarkColor'
                    paddingX='8'
                    onClick={handlePickRandom}
                />

                {/* CONFIRM */}
                <Button
                    title='Confirm'
                    bgColor='highlightedColor'
                    paddingX='10'
                    onClick={() => handleConfirm(selectedAvatar)}
                />

            </div>

        </div>
    )
}

export default ChooseAvatarModalBody