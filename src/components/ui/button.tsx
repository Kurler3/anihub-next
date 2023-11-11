

import React from 'react'

type Props = {
    title: string;
    onClick?: () => void;
    bgColor: 'highlightedColor' | 'lightColor';
    paddingX: '12' | '8';
}

const Button = ({
    title,
    paddingX,
    onClick,
    bgColor,
}: Props) => {
    return (
        <button className={`p-3 px-${paddingX} text-white bg-${bgColor} rounded-md`} onClick={onClick}>
            {title}
        </button>
    )
}

export default Button;