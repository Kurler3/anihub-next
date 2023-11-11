

import React, { ButtonHTMLAttributes } from 'react'

type Props = {
    title: string;
    onClick?: () => void;
    bgColor: 'highlightedColor' | 'lightColor';
    paddingX: '12' | '8';
    type?: "button" | "submit" | "reset";
    bgHoverColor?: 'highlightedHover';
}

const Button = ({
    title,
    paddingX,
    onClick,
    bgColor,
    type,
    bgHoverColor,
}: Props) => {
    return (
        <button type={type} className={`p-3 px-${paddingX} transition text-white bg-${bgColor} hover:bg-${bgHoverColor} rounded-md`} onClick={onClick}>
            {title}
        </button>
    )
}

export default Button;