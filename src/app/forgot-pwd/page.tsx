'use client'


import Alert from '@/components/ui/Alert';
import Button from '@/components/ui/CustomButton';

import { supabase } from '@/lib/supabase/supabase-client';
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';


type ForgotPwdFormData = {
    email: string;
}

const ForgotPasswordPage = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPwdFormData>();

    const [
        isEmailSent,
        setIsEmailSent,
    ] = useState<boolean>(false);

    const onSubmit: SubmitHandler<ForgotPwdFormData> = async (data) => {

        // Send email w/ supabase client
        await supabase.auth.resetPasswordForEmail(data.email, {
            redirectTo: `${location.origin}/reset-pwd`,
        })

        setIsEmailSent(true);
    }

    return (
        <div className='w-full h-full flexStartCenter flex-col pt-20 gap-4'>

            <div className="text-xl">
                Please enter your email address and we&apos;ll send you a link to reset your password
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className='flexCenterCenter flex-col gap-6 mt-5'>

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
                    disabled={isEmailSent}
                />
                {errors.email && <Alert message={errors.email.message!} />}

                {/* SEND EMAIL BTN */}
                <Button
                    title='Send email'
                    paddingX='12'
                    bgColor='highlightedColor'
                    bgHoverColor='highlightedHover'
                    type='submit'
                    disabled={isEmailSent}
                />

                {
                    isEmailSent && (
                        <Alert
                            message="If an account with that email exists, you'll receive a link to reset your password"
                            type='success'
                            showIcon={false}
                        />
                    )
                }
            </form>



        </div>
    )
}

export default ForgotPasswordPage