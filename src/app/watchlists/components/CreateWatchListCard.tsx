

import Link from 'next/link'
import React from 'react'
import AddIcon from '@mui/icons-material/Add';

type Props = {}

const CreateWatchListCard = (props: Props) => {
    return (
        <Link href='/watchlists/create'>
            <div
                className='
                    flexCenterCenter 
                    overflow-hidden 
                    rounded-md 
                    cursor-pointer 
                    bg-bgLight 
                    w-[250px] h-[400px]
                    fullHighlightedShadow
                    transition
                    hover:scale-105
                '
            >
                <AddIcon
                    // fontSize="large"
                    className='text-6xl'
                />
            </div>
        </Link>
    )
}

export default CreateWatchListCard