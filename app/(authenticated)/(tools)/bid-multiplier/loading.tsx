import { Skeleton } from '@/components/ui/skeleton'
import CustomBreadCrumb from '@/components/utility/customComponents/CustomBreadCrumb'
import { DollarSign } from 'lucide-react'
import React from 'react'

export default function loading() {
    return (
        <div>
            <CustomBreadCrumb
                secondItem='Tools'
                secondLink='#'
                thirdItem='Bid Multiplier'
                thirdLink='/bid-multiplier'
            />
            <div className='mb-4 flex justify-between mt-3'>
                <div className='font-bold flex items-center text-xl'>
                    <DollarSign size={26} className='mr-1' /> Bid Multiplier
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
