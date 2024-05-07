import { Button } from '@/components/ui/button'
import CustomBreadCrumb from '@/components/utility/customComponents/CustomBreadCrumb'
import { Package, Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import MmpSettingSheet from './MmpSettingSheet'

export default function MmpSettingHeader({
    pageSize,
    bundle,
    events,
    status,
    mmp
}: MmpSettingFilter) {
    return (
        <>
            <CustomBreadCrumb secondItem='Admin Tools' secondLink='/admin-tools' thirdItem='MMP Settings' thirdLink='/mmp-settings' />
            <div className='mb-4 flex justify-between mt-3'>
                <div className='font-bold flex items-center text-xl'>
                    <Package size={26} className='mr-1' /> MMP Settings
                </div>

                <div>
                    <Link href="/bid-multiplier/create">
                        <Button size="sm" className='mr-2'>
                            <Plus size={20} className='mr-1' />Create
                        </Button>
                    </Link>
                    <MmpSettingSheet
                        pageSize={pageSize}
                        bundle={bundle}
                        events={events}
                        mmp={mmp}
                        status={status}
                    />
                    {/* <BidMultiSheet
                        pageSize={pageSize}
                        status={status}
                        campaignId={campaignId}
                        isAdmin={isAdmin}
                    /> */}
                </div>
            </div>
        </>
    )
}
