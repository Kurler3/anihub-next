import React from 'react'
import eevee from '@/images/eevee.svg';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { redirect } from 'next/navigation'


const NeedAuthPage = () => {

    const handleRedirectSignUp = async () => {
        'use server'
        redirect('/sign-up')
    }

    const handleRedirectLogin = async () => {
        'use server'
        redirect('/login')
    }

    return (
        <div className='h-full w-full flexStartCenter flex-col pt-20 gap-8'>

            <Image
                src={eevee}
                alt='eevee'
                width={300}
                height={300}
            />

            <h1 className='text-2xl'>
                Looks like eevee wants to know you
            </h1>

            <div className='w-full flexCenterCenter gap-4'>
                <form action={handleRedirectLogin}>
                    <Button
                        title="Login"
                        bgColor='highlightedColor'
                        paddingX='8'
                        type='submit'
                    />
                </form>

                <form action={handleRedirectSignUp}>
                    <Button
                        title="Sign up"
                        bgColor='bgLight'
                        paddingX='8'
                        type='submit'
                    />
                </form>
            </div>



        </div>
    )
}

export default NeedAuthPage