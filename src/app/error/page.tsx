'use client'
import Button from '@/components/ui/Button'
import { useSearchParams, useRouter } from 'next/navigation'

import React from 'react'

const ErrorPage = () => {

    const searchParams = useSearchParams()
    const router = useRouter();

    const message = searchParams.get('message')

    return (
        <div className='w-full h-full flexStartCenter flex-col gap-4 pt-40'>


            {/* TITLE */}
            <div className='text-2xl text-highlightedColor'>
                Oops D: looks like something went wrong
            </div>


            {/* MESSAGE */}
            {
                message && (
                    <div className='mt-10 text-lg'>
                        Here&apos;s a message of what might have happened: <b>{message}</b>
                    </div>
                )
            }


            {/* GO BACK TO HOME */}
            <Button
                title='Go back home'
                bgColor='highlightedColor'
                paddingX='8'
                onClick={() => router.push('/')}
                className='mt-10'
            />



        </div>
    )
}

export default ErrorPage