'use client' // Error components must be Client Components

import Button from '@/components/ui/Button'
import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className='h-full w-full flexStartCenter pt-20 flex-col gap-8'>
            <h2 className='text-2xl'>Something went wrong!</h2>
            <Button
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
                title="Try again"
                bgColor='highlightedColor'
                paddingX='8'
            />
        </div>
    )
}