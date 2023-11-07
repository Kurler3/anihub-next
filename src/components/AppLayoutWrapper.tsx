import React, { ReactNode } from 'react'
import Navbar from '@/components/Navbar'

type Props = {
    children: ReactNode
}

const AppLayoutWrapper = ({ children }: Props) => {
    return (
        <div className='w-screen h-screen flex flex-col justify-start p-6'>

            {/* NAVBAR */}
            <Navbar />

            <div className='flex-1 flex w-100'>

                {/* LEFT SIDE BAR */}


                {/* CHILDREN */}
                {children}

            </div>
            
            {/* FOOTER */}
            
        </div>
    )
}

export default AppLayoutWrapper