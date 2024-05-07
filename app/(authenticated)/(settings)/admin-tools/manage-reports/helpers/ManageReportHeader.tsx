"use client"

import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import CustomBreadCrumb from '@/components/utility/customComponents/CustomBreadCrumb'
import { Coffee, Plus } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import React, { useCallback } from 'react'

export default function ManageReportHeader({ status }: { status: string }) {

    const pathname = usePathname()
    const searchParams = useSearchParams()

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.delete('from')
            params.delete('to')
            if (value) params.set(name, value)
            else params.delete(name)
            return params.toString()
        },
        [searchParams]
    )

    return (
        <>
            <CustomBreadCrumb secondItem='Admin Tools' secondLink='/admin-tools' thirdItem='Manage Reports' thirdLink='/admin-tools/manage-reports' />
            <div className='mb-4 flex justify-between mt-3'>
                <div className='font-bold flex items-center text-xl'>
                    <Coffee size={26} className='mr-1' /> Manage Report (Calc)
                </div>

                <div>
                    <Link href="/admin-tools/manage-reports/create">
                        <Button size="sm" className='mr-2'>
                            <Plus size={20} className='mr-1' />Create
                        </Button>
                    </Link>
                    <Popover>
                        <PopoverTrigger asChild className='flex justify-center cursor-pointer'>
                            <div className='cursor-pointer text-slate-950 hover:opacity-[0.9] font-medium dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 p-3 rounded-lg'>{status || 'Status'}</div>
                        </PopoverTrigger>
                        <PopoverContent className='p-2 flex flex-col'>
                            <Link href={`${pathname}?${createQueryString('status', 'ACTIVE')}`} className='flex items-center justify-start px-3 py-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800'>ACTIVE</Link>
                            <Link href={`${pathname}?${createQueryString('status', 'PAUSE')}`} className='flex items-center justify-start px-3 py-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800'>PAUSE</Link>
                            <Link href={`${pathname}?${createQueryString('status', 'DELETE')}`} className='flex items-center justify-start px-3 py-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800'>DELETE</Link>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </>
    )
}
