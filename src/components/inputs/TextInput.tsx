

import React from 'react'

type Props = {
    placeholder?: string;
    name: string;
    initialValue: string;
}

const TextInput = ({
    placeholder,
    name,
    initialValue,
}: Props) => {
    return (
        <input
            className='bg-bgLight p-3 rounded-md text-[12px] focus:outline-none text-white w-48 shadow-md'
            placeholder={placeholder ?? 'Enter something'}
            type='text'
            name={name}
            defaultValue={initialValue}
        />
    )
}

export default TextInput