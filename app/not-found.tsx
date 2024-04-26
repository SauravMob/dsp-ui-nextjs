import Link from 'next/link'
import React from 'react'

export default function NotFound() {
    return (
        <div className='bg-slate-950 text-slate-200 h-screen flex justify-center items-center'>
            <div>
                <div className='text-9xl font-bold'>Not Found</div>
                <div className='m-3 flex justify-center text-xl'>Could not find requested resource</div>
                <div className='flex justify-center bg-slate-800 p-4 rounded-3xl hover:bg-slate-900 cursor-pointer'><Link href="/">Return Home</Link></div>
            </div>
        </div>
    )
}
