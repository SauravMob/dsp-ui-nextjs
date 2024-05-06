import { Button } from '@/components/ui/button'
import CustomBreadCrumb from '@/components/utility/customComponents/CustomBreadCrumb'
import { Plus, Pocket } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function PmpHeader() {
    return (
        <>
            <CustomBreadCrumb secondItem='Admin Tools' secondLink='/admin-tools' thirdItem='PMP Deals' thirdLink='/admin-tools/pmp-deals' />
            <div className='mb-4 flex justify-between mt-3'>
                <div className='font-bold flex items-center text-xl'>
                    <Pocket size={26} className='mr-1' /> PMP Deals
                </div>

                <div>
                    <Link href="/admin-tools/pmp-deals/create">
                        <Button size="sm" className='mr-2'>
                            <Plus size={20} className='mr-1' />Create
                        </Button>
                    </Link>
                </div>
            </div>
        </>
    )
}
