'use client'

import Button from '@/components/ui/Button'
import Image from 'next/image'
import React from 'react'
import profilePic from '@/images/profile_pic.svg';
import Input from '@/components/ui/Input';
import HorizontalSeparator from '@/components/HorizontalSeparator';
import GoogleButton from '@/components/ui/GoogleButton';
import { SubmitHandler, useForm } from 'react-hook-form';
import { type SignUpFormData } from '@/types/auth.types';

const SignUpPage = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<SignUpFormData>();

    const onSubmit: SubmitHandler<SignUpFormData> = (data) => {
        // Handle your form submission logic here
        console.log(data);
    };

    // Watch the password and confirmPassword fields to show an error if they don't match
    const password = watch('password');
    const confirmPassword = watch('confirmPassword');
    const passwordMismatch = password !== confirmPassword;

    return (
        <div className='w-full h-full flexStartCenter flex-col gap-6 p-4 pt-10'>

            {/* CHOSEN AVATAR */}
            <Image
                src={profilePic}
                alt='Choosen avatar'
                width={180}
                height={180}
                className='border-2 rounded-full cursor-pointer shadow-md'
            />

            {/* CHOOSE AVATAR BTN */}
            <Button
                title='Choose avatar'
                bgColor='highlightedColor'
                paddingX='8'
            />

            <form>

                {/* EMAIL INPUT */}
                <Input
                    // name='email'
                    placeholder='Enter your email...'
                    type='email'
                    {...register('email', { required: 'Email is required' })}
                />

                {errors.email && <p>{errors.email.message}</p>}


                {/* USERNAME INPUT */}
                <Input
                    name='username'
                    placeholder='Enter your username...'
                    type='text'
                />

                {/* PASSWORD INPUT */}
                <Input
                    name='password'
                    placeholder='Enter your password...'
                    type='password'
                />

                {/* CONFIRM PASSWORD INPUT */}
                <Input
                    name='confirmPassword'
                    placeholder='Confirm your password...'
                    type='password'
                />

                {/* SIGN UP BTN */}
                <Button
                    title='Sign Up'
                    paddingX='12'
                    onClick={() => { }}
                    bgColor='highlightedColor'
                    type='submit'
                />

            </form>


            {/* SEPARATOR */}
            <HorizontalSeparator width={30} />

            {/* GOOGLE BTN */}
            <GoogleButton />

        </div>
    )
}
export default SignUpPage