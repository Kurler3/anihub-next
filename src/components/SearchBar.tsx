

import React from 'react'

type Props = {
    serverAction?: (formData: FormData) => void;
}

const SearchBar = ({ serverAction }: Props) => {


    const searchBarInput = (
        <input
        type="text"
        placeholder="Search..."
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
      />
    )

    if(serverAction) {
        return (
            <form action={serverAction} className="flex items-center space-x-2">
                {
                    searchBarInput
                }
            </form>
        )
    }

    return searchBarInput;
}

export default SearchBar