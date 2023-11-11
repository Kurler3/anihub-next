
import React from 'react'

type Props = {
    placeholder?: string;
    name: string;
    type?: React.HTMLInputTypeAttribute;
}

const Input = ({
    placeholder,
    name,
    type,
}: Props) => {
    return (
        <input
            className='bg-bgLight p-3 rounded-md text-[12px] focus:outline-none text-white w-80 shadow-md'
            name={name}
            placeholder={placeholder}
            type={type ?? 'text'}
        />
    )
}

export default Input