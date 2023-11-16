

import Image from 'next/image'
import React from 'react'

type Props = {
    onClick?: () => void;
}

const GoogleButton = ({ onClick }: Props) => {
    return (
        <div className="flex items-center justify-center dark:bg-gray-800" onClick={onClick}>
            <button className="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-white transition duration-150 hover:bg-bgDarkColor">
                <Image className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" width={20} height={20} loading="lazy" alt="google logo" />
                <span>Continue with Google</span>
            </button>
        </div>
    )
}

export default GoogleButton