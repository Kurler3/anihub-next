import React, { ReactNode } from 'react'
import Navbar from '@/components/layout/Navbar'
import AppSideBar from './AppSideBar'

type Props = {
    children: ReactNode
}

const AppLayoutWrapper = ({ children }: Props) => {
    return (
        <div className='w-screen h-screen flex flex-col justify-start p-6'>

            {/* NAVBAR */}
            <Navbar />

            <div className='flex-1 flex w-100 gap-4 mt-2'>

                {/* LEFT SIDE BAR */}
                <AppSideBar />

                {/* CHILDREN */}
                <div className='flex-1 h-100 bg-bgDarkColor rounded-md'>
                    {children}
                </div>
            </div>
            
            {/* FOOTER */}
            
        </div>
    )
}

export default AppLayoutWrapper