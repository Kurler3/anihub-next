'use client'
import { useSearchParams } from 'next/navigation'

import React from 'react'

const ErrorPage = () => {

    const searchParams = useSearchParams()

    const message = searchParams.get('message')

    return (
        <div>
            {message ?? 'Something went wrong!'}
        </div>
    )
}

export default ErrorPage