

import React, { ButtonHTMLAttributes } from 'react'

type Props = {
    title: string;
    onClick?: () => void;
    bgColor?: string;
    paddingX?: string;
    type?: "button" | "submit" | "reset";
    bgHoverColor?: string;
    className?: string;
    disabled?: boolean;
}

const Button = ({
    title,
    paddingX,
    onClick,
    bgColor,
    type,
    bgHoverColor,
    className,
    disabled
}: Props) => {
    return (
        <button type={type} disabled={disabled} className={`p-3 px-${paddingX} transition text-white bg-${bgColor} hover:bg-${bgHoverColor} rounded-md ${className ?? ''} ${disabled ? 'opacity-[0.5]' : ''}`} onClick={onClick}>
            {title}
        </button>
    )
}

export default Button;