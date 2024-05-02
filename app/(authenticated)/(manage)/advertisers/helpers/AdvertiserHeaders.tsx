import CustomBreadCrumb from '@/components/utility/customComponents/CustomBreadCrumb'
import { Award } from 'lucide-react'
import React from 'react'
import AdvertiserSheet from './AdvertiserSheet'

export default function AdvertiserHeaders({
    pageSize,
    email,
    status
}: {
    pageSize: string,
    email: string,
    status: string
}) {
    return (
        <>
            <CustomBreadCrumb secondItem='Advertiser' secondLink='/advertisers' />
            <div className='mb-4 flex justify-between mt-3'>
                <div className='font-bold flex items-center text-xl'>
                    <Award size={26} className='mr-1' /> Advertisers
                </div>

                <div>
                    <AdvertiserSheet
                        pageSize={pageSize}
                        status={status}
                        email={email}
                    />
                </div>
            </div>
        </>
    )
}
