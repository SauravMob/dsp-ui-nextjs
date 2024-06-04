import { Button } from '@/components/ui/button'
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
            <div className='mb-4 flex justify-between mt-3'>
                <div className='font-bold flex items-center text-xl'>
                    <Package size={26} className='mr-1' /> Postback MMP Settings
                </div>

                <div>
                    <Link href="/admin-tools/mmp-settings/create">
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
                </div>
            </div>
        </>
    )
}
