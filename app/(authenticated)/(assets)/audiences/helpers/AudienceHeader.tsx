import { Button } from '@/components/ui/button'
import CustomBreadCrumb from '@/components/utility/customComponents/CustomBreadCrumb'
import { Plus, Users } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import AudienceSheet from './AudienceSheet'

export default function AudienceHeader(
    { pageSize, status, audName, uploadType, isAdmin }: AudienceFilter
) {
    return (
        <>
            <CustomBreadCrumb secondItem='Audience Retargeting' secondLink='/audiences' />
            <div className='mb-4 flex justify-between mt-3'>
                <div className='font-bold flex items-center text-xl'>
                    <Users size={26} className='mr-1' /> Audience Retargeting
                </div>

                <div>
                    <Link href="/audiences/create">
                        <Button size="sm" className='mr-2'>
                            <Plus size={20} className='mr-1' />Create
                        </Button>
                    </Link>
                    <AudienceSheet
                        pageSize={pageSize}
                        status={status}
                        audName={audName}
                        uploadType={uploadType}
                        isAdmin={isAdmin}
                    />
                </div>
            </div>
        </>
    )
}
