"use client"

import { Button } from '@/components/ui/button'
import { useEffect } from 'react'
import { logout } from './(public)/actions'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className='text-center content-center min-h-[600px]'>
            <div className='w-full mb-6 text-6xl font-semibold text-slate-800 dark:text-slate-200 dark:bg-slate-950'>
                Something went wrong!
            </div>
            <div className='w-full'>
                <Button
                    onClick={() => reset()}
                    className='mr-3'
                    size="lg"
                >
                    Try again
                </Button>
                <Button
                    onClick={() => logout()}
                    size="lg"
                >
                    Logout
                </Button>
            </div>
        </div>
    )
}