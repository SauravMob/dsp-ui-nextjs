import { Button } from '@/components/ui/button'
import CustomBreadCrumb from '@/components/utility/customComponents/CustomBreadCrumb'
import { Layers, Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import ApplistSheets from './ApplistSheets'

export default function ApplistHeader({
    pageSize,
    searchParam
}: {
    pageSize: string,
    searchParam: string
}) {
    return (
        <>
            <CustomBreadCrumb secondItem='Applists' secondLink='/applists' />
            <div className='mb-4 flex justify-between mt-3'>
                <div className='font-bold flex items-center text-xl'>
                    <Layers size={26} className='mr-1' /> Applists
                </div>

                <div>
                    <Link href="/applists/create">
                        <Button size="sm" className='mr-2'>
                            <Plus size={20} className='mr-1' />Create
                        </Button>
                    </Link>
                    <ApplistSheets
                        pageSize={pageSize}
                        searchParam={searchParam}
                    />
                </div>
            </div>
        </>
    )
}
