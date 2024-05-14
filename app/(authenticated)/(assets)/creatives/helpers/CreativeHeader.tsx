import CustomBreadCrumb from '@/components/utility/customComponents/CustomBreadCrumb'
import { Camera, Plus } from 'lucide-react'
import React from 'react'
import CreativeSheet from './CreativeSheet'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function CreativeHeader({ pageSize, campaignId, status, creativeId, creativeSize, creativeType }: CreativeFilterTypes) {
    return (
        <>
            <CustomBreadCrumb
                secondItem='Assets'
                secondLink='#'
                thirdItem='Creatives'
                thirdLink='/creatives'
            />
            <div className='mb-4 flex justify-between mt-3'>
                <div className='font-bold flex items-center text-xl'>
                    <Camera size={26} className='mr-1' /> Creative
                </div>

                <div>
                    <Link href="/creatives/create">
                        <Button size="sm" className='mr-2'>
                            <Plus size={20} className='mr-1' />Create
                        </Button>
                    </Link>
                    <CreativeSheet
                        pageSize={pageSize}
                        campaignId={campaignId}
                        status={status}
                        creativeId={creativeId}
                        creativeSize={creativeSize}
                        creativeType={creativeType}
                    />
                </div>
            </div>
        </>
    )
}
