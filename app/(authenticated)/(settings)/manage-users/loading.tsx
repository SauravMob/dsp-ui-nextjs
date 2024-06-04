import { Skeleton } from '@/components/ui/skeleton'
import { User } from 'lucide-react'
import React from 'react'

export default function loading() {
    return (
        <div>
            <div className='mb-4 flex justify-between mt-3'>
                <div className='font-bold flex items-center text-xl'>
                    <User size={26} className='mr-1' /> Manage User
                </div>

                <div>
                    <Skeleton className=' w-28 h-12 rounded-xl' />
                </div>
            </div>

            <div className='mt-5'>
                <Skeleton className='w-100 h-screen rounded-xl' />
            </div>
        </div>
    )
}
