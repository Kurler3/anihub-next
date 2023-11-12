'use client'

import Button from '@/components/ui/Button'
import Image from 'next/image'
import React, { useCallback, useState } from 'react'
import HorizontalSeparator from '@/components/HorizontalSeparator';
import GoogleButton from '@/components/ui/GoogleButton';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SignUpModalData, type SignUpFormData } from '@/types/auth.types';
import Alert from '@/components/ui/Alert';
import { CHOOSE_AVATAR_MODAL_ID, PUBLIC_IMAGES_URLS, SIGN_UP_LOADING_MODAl_ID } from '@/lib/constants';
import { closeModal, getRandomValueFromArray, openModal } from '@/lib/utils';
import Modal from '@/components/ui/Modal';
import ChooseAvatarModalBody from './components/ChooseAvatarModalBody';
import { useRouter } from 'next/navigation';

const initialSignUpModalData = {
    message: null,
    type: null,
}

const SignUpPage = () => {

    const { push, refresh } = useRouter();

    const [
        avatarUrl, setAvatarUrl
    ] = useState<string>(getRandomValueFromArray<string>(PUBLIC_IMAGES_URLS)!);

    const [
        signUpModalData,
        setSignUpModalData,
    ] = useState<SignUpModalData>(initialSignUpModalData);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<SignUpFormData>();

    const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {

        // Set sign up msg to null
        setSignUpModalData(initialSignUpModalData);

        // Open sign up loading modal
        openModal(SIGN_UP_LOADING_MODAl_ID);

        const body = {
            email: data.email,
            password: data.password,
            username: data.username,
            avatarUrl,
        }

        // Send request to backend
        const response = await fetch('/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const errorData = await response.json();
            setSignUpModalData({
                message: errorData.error,
                type: 'error',
            });
        } else {
            const responseData = await response.json();
            // Handle success appropriately
            setSignUpModalData({
                message: responseData.message,
                type: 'success',
            });
        }

        // If success => redirect to /
        if (response.ok) {
            setTimeout(() => {
                refresh()
                push('/');
            }, 2000);
        }
    }

    // Watch the password and confirmPassword fields to show an error if they don't match
    const password = watch('password');

    // Handle select avatar
    const handleSelectAvatar = useCallback((avatarUrl: string) => {
        setAvatarUrl(avatarUrl);
        closeModal(CHOOSE_AVATAR_MODAL_ID)
    }, [])

    return (
        <div className='w-full h-full flexStartCenter flex-col gap-6 p-4 pt-10'>

            {/* CHOSEN AVATAR */}
            <Image
                src={avatarUrl}
                alt='Choosen avatar'
                width={180}
                height={180}
                className='border-2 rounded-full cursor-pointer shadow-md'
                onClick={() => openModal(CHOOSE_AVATAR_MODAL_ID)}
            />

            {/* CHOOSE AVATAR BTN */}
            <Button
                title='Choose avatar'
                bgColor='highlightedColor'
                paddingX='8'
                onClick={() => openModal(CHOOSE_AVATAR_MODAL_ID)}
            />

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

                {/* USERNAME INPUT */}
                <input
                    className='bg-bgLight p-3 rounded-md text-[12px] focus:outline-none text-white w-80 shadow-md'
                    placeholder='Enter your username...'
                    type='text'
                    {...register('username', { required: 'Username is required', minLength: { value: 6, message: 'Username min length is 6' } })}
                />

                {errors.username && <Alert message={errors.username.message!} />}


                {/* PASSWORD INPUT */}
                <input
                    className='bg-bgLight p-3 rounded-md text-[12px] focus:outline-none text-white w-80 shadow-md'
                    placeholder='Enter a password...'
                    type='password'
                    {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password min length is 6' } })}
                />
                {errors.password && <Alert message={errors.password.message!} />}


                {/* CONFIRM PASSWORD INPUT */}
                <input
                    className='bg-bgLight p-3 rounded-md text-[12px] focus:outline-none text-white w-80 shadow-md'
                    placeholder='Confirm your password...'
                    type='password'
                    {...register('confirmPassword', {
                        required: 'Confirm Password is required',
                        validate: (value) => value === password || 'Passwords do not match',
                        minLength: { value: 6, message: 'Password min length is 6' }
                    })}
                />

                {errors.confirmPassword && <Alert message={errors.confirmPassword.message!} />}

                {/* SIGN UP BTN */}
                <Button
                    title='Sign Up'
                    paddingX='12'
                    onClick={() => { }}
                    bgColor='highlightedColor'
                    bgHoverColor='highlightedHover'
                    type='submit'
                />

            </form>


            {/* SEPARATOR */}
            <HorizontalSeparator hasOr width={70} />

            {/* GOOGLE BTN */}
            <GoogleButton />


            {/* CHOOSE AVATAR MODAL */}
            <Modal
                title='Choose avatar'
                modalId={CHOOSE_AVATAR_MODAL_ID}
            >

                <ChooseAvatarModalBody
                    currentAvatar={avatarUrl}
                    handleConfirm={handleSelectAvatar}
                />

            </Modal>

            {/* LOADING MODAL */}
            <Modal
                title='Signing up...'
                modalId={SIGN_UP_LOADING_MODAl_ID}
            >
                <div className='flexCenterCenter text-sm'>
                    {
                        signUpModalData.message ? (
                            <Alert
                                message={signUpModalData.message}
                                type={signUpModalData.type!}
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
export default SignUpPage