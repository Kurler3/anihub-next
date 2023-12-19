'use client'
import Alert from '@/components/ui/Alert';
import Button from '@/components/ui/CustomButton';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';

type Props = {}

type ResetPwdFormData = {
    password: string;
    confirmPassword: string;
}

type ResetPwdAlertData = {
    message: string | null;
    type: 'success' | 'error' | null;
}


const ResetPasswordPage = (props: Props) => {

    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm<ResetPwdFormData>();

    const [
        resetPwdAlertData,
        setResetPwdAlertData,
    ] = useState<ResetPwdAlertData>({
        message: null,
        type: null,
    });

    const onSubmit: SubmitHandler<ResetPwdFormData> = async (data) => {

        try {

            // Send request
            const response = await fetch(
                '/api/auth/reset-pwd', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password: data.password }),
            })

            // If ok => set is password reset to true
            setResetPwdAlertData(() => {
                return {
                    message: response.ok ? 'Successfully updated password' : 'Something went wrong!',
                    type: response.ok ? 'success' : 'error',
                }
            });

            // If ok => redirect to home page
            if (response.ok) {
                setTimeout(() => {

                    router.push('/');

                }, 2000);
            }

        } catch (error) {

        }

    }

    // Watch the password and confirmPassword fields to show an error if they don't match
    const password = watch('password');



    return (
        <div className='h-full w-full flexStartCenter flex-col pt-20'>

            <div className="text-xl">
                Reset your password
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className='flexCenterCenter flex-col gap-6 mt-5'>

                {/* PASSWORD */}
                <input
                    className='bg-bgLight p-3 rounded-md text-[12px] focus:outline-none text-white w-80 shadow-md'
                    placeholder='Enter your new password...'
                    type='password'
                    {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password min length is 6' } })}
                    disabled={resetPwdAlertData.type === 'success'}
                />
                {errors.password && <Alert message={errors.password.message!} />}


                {/* CONFIRM PASSWORD */}
                <input
                    className='bg-bgLight p-3 rounded-md text-[12px] focus:outline-none text-white w-80 shadow-md'
                    placeholder='Confirm your new password...'
                    type='password'
                    {...register('confirmPassword', {
                        required: 'Confirm Password is required',
                        validate: (value) => value === password || 'Passwords do not match',
                        minLength: { value: 6, message: 'Password min length is 6' }
                    })}
                    disabled={resetPwdAlertData.type === 'success'}
                />
                {errors.confirmPassword && <Alert message={errors.confirmPassword.message!} />}

                {/* RESET PWD BTN */}
                <Button
                    title='Confirm reset'
                    paddingX='12'
                    bgColor='highlightedColor'
                    bgHoverColor='highlightedHover'
                    type='submit'
                    disabled={resetPwdAlertData.type === 'success'}
                />

                {
                    resetPwdAlertData.message && (
                        <Alert
                            message={resetPwdAlertData.message}
                            type={resetPwdAlertData.type!}
                            showIcon={false}
                        />
                    )
                }
            </form>


        </div>
    )
}

export default ResetPasswordPage;