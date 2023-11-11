

import React, { ButtonHTMLAttributes } from 'react'

type Props = {
    title: string;
    onClick?: () => void;
    bgColor: 'highlightedColor' | 'lightColor';
    paddingX: '12' | '8';
    type?: "button" | "submit" | "reset";
}

const Button = ({
    title,
    paddingX,
    onClick,
    bgColor,
    type,
}: Props) => {
    return (
        <button type={type} className={`p-3 px-${paddingX} text-white bg-${bgColor} rounded-md`} onClick={onClick}>
            {title}
        </button>
    )
}

export default Button;