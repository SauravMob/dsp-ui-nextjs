import { Button } from '@/components/ui/button'
import CustomBreadCrumb from '@/components/utility/customComponents/CustomBreadCrumb'
import { Navigation2, Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import OptimizationSheet from './OptimizationSheet'

export default function OptimizationHeader({
    pageSize,
    campaignId,
    status
}: OptimizationFilter) {
    return (
        <>
            <CustomBreadCrumb
                secondItem='Tools'
                secondLink='#'
                thirdItem='Optimization'
                thirdLink='/optimization'
            />
            <div className='mb-4 flex justify-between mt-3'>
                <div className='font-bold flex items-center text-xl'>
                    <Navigation2 size={26} className='mr-1' /> Optimization
                </div>

                <div>
                    <Link href="/optimization/create">
                        <Button size="sm" className='mr-2'>
                            <Plus size={20} className='mr-1' />Create
                        </Button>
                    </Link>
                    <OptimizationSheet
                        pageSize={pageSize}
                        status={status}
                        campaignId={campaignId}
                    />
                </div>
            </div>
        </>
    )
}
