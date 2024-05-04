import { Skeleton } from '@/components/ui/skeleton'
import CustomBreadCrumb from '@/components/utility/customComponents/CustomBreadCrumb'
import { Navigation } from 'lucide-react'
import React from 'react'

export default function loading() {
    return (
        <div>
            <CustomBreadCrumb secondItem='Traffic Reports' secondLink='/traffic-report' />
            <div className='mb-4 flex justify-between mt-3'>
                <div className='font-bold flex items-center text-xl'>
                    <Navigation size={26} className='mr-1' /> Traffic Reports
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
