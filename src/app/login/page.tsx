'use client'

import HorizontalSeparator from '@/components/HorizontalSeparator'
import Alert from '@/components/ui/Alert';
import Button from '@/components/ui/Button';
import GoogleButton from '@/components/ui/GoogleButton'
import { LoginFormData } from '@/types/auth.types';
import { useRouter } from 'next/navigation';

import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';

const LoginPage = () => {

    const { push } = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>();

    const onSubmit: SubmitHandler<LoginFormData> = async (data) => {

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
        } else {
            push('/')
        }

    }

    return (
        <div className='w-full h-full flexStartCenter flex-col gap-6 p-4 pt-10'>

            <form className='flexStartCenter flex-col gap-3' onSubmit={handleSubmit(onSubmit)}>

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
            <GoogleButton />

        </div>
    )
}

export default LoginPage