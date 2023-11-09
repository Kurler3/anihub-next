'use client'

import React from 'react'
import SearchIcon from '@mui/icons-material/Search';

type Props = {
    serverAction?: (formData: FormData) => void;
}

const SearchBar = ({ serverAction }: Props) => {
 
    const searchBarInput = 
        <div className='bg-bgLight p-1 px-2 flex justify-start items-center rounded-md' style={{ borderRadius: '7px'}}>
            <SearchIcon className='text-white w-[28px] h-[28px]'/>
            <input
                type="text"
                placeholder="Search for something..."
                className='px-4 py-2 focus:outline-none bg-transparent text-placeholderColor text-xs w-100'
            />
        </div>

    if (serverAction) {
        return (
            <form action={serverAction}>
                {searchBarInput}
            </form>
        )
    }

    return searchBarInput;
}

export default SearchBar