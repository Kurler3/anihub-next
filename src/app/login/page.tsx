'use client'

import HorizontalSeparator from '@/components/HorizontalSeparator'
import Alert from '@/components/ui/Alert';
import Button from '@/components/ui/Button';
import GoogleButton from '@/components/ui/GoogleButton'
import Modal from '@/components/ui/Modal';
import { LOGIN_LOADING_MODAL_ID } from '@/lib/constants';
import { openModal } from '@/lib/utils';
import { LoginFormData, LoginModalData } from '@/types/auth.types';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';

const initialLoginModalData = {
    message: null,
    type: null,
}


const LoginPage = () => {

    const { push, refresh } = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>();

    const [
        loginModalData,
        setLoginModalData,
    ] = useState<LoginModalData>(initialLoginModalData);


    const onSubmit: SubmitHandler<LoginFormData> = async (data) => {

        // Set login msg to null
        setLoginModalData(initialLoginModalData);

        // Open loading modal
        openModal(LOGIN_LOADING_MODAL_ID);

        // Send request to backend
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error(errorData.error)

            setLoginModalData({
                message: errorData.error,
                type: 'error',
            })

        } else {
            const responseData = await response.json();
            setLoginModalData({
                message: responseData.message,
                type: 'success',
            })
            setTimeout(() => {
                refresh()
                push('/')
            }, 1500);

        }

    }

    const handleLoginWithGoogle = async () => {

        const supabase = createClientComponentClient();

        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${location.origin}/api/auth/loginWithGoogle`,
            }
        })

        if (!error) {
            setTimeout(() => {
                refresh()
                push('/');
            }, 2000);
        }
    }

    return (
        <div className='w-full h-full flexStartCenter flex-col gap-6 p-4 pt-40'>

            {/* TITLE */}
            <h1 className='text-2xl'>
                Welcome back シ
            </h1>


            <form className='flexStartCenter flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>

                {/* EMAIL INPUT */}
                <input
                    className='bg-bgLight p-3 rounded-md text-[12px] focus:outline-none text-white w-80 shadow-md'
                    placeholder='Enter your email...'
                    type='email'
                    {...register('email', {
                        required: 'Email is required', pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address"
                        }
                    })}
                />

                {errors.email && <Alert message={errors.email.message!} />}


                {/* PASSWORD INPUT */}
                <input
                    className='bg-bgLight p-3 rounded-md text-[12px] focus:outline-none text-white w-80 shadow-md'
                    placeholder='Enter a password...'
                    type='password'
                    {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password min length is 6' } })}
                />
                {errors.password && <Alert message={errors.password.message!} />}

                {/* SIGN UP BTN */}
                <Button
                    title='Login'
                    paddingX='12'
                    bgColor='highlightedColor'
                    bgHoverColor='highlightedHover'
                    type='submit'
                />

            </form>

            {/* SEPARATOR */}
            <HorizontalSeparator hasOr width={70} />

            {/* GOOGLE BTN */}
            <GoogleButton onClick={handleLoginWithGoogle} />

            {/* LOADING MODAL */}
            <Modal
                title='Login...'
                modalId={LOGIN_LOADING_MODAL_ID}
            >
                <div className='flexCenterCenter text-sm'>
                    {
                        loginModalData.message ? (
                            <Alert
                                message={loginModalData.message}
                                type={loginModalData.type!}
                            />
                        ) : (
                            <span className="loading loading-spinner loading-lg"></span>

                        )
                    }
                </div>
            </Modal>


        </div>
    )
}

export default LoginPage