

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
                    w-[225px] 
                    cursor-pointer 
                    bg-bgLight 
                    h-[200px] 
                    fullHighlightedShadow
                    transition
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