import { Skeleton } from '@/components/ui/skeleton'
import CustomBreadCrumb from '@/components/utility/customComponents/CustomBreadCrumb'
import { PieChart } from 'lucide-react'
import React from 'react'

export default function loading() {
    return (
        <div>
            <CustomBreadCrumb secondItem='Campaign Reports' secondLink='/campaign-report' />
            <div className='mb-4 flex justify-between mt-3'>
                <div className='font-bold flex items-center text-xl'>
                    <PieChart size={26} className='mr-1' /> Campaign Reports
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
