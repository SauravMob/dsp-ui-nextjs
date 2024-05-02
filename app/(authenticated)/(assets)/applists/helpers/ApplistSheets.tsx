"use client"

import { Input } from '@/components/ui/input'
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Filter } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useMemo, useState } from 'react'

export default function ApplistSheets({
    pageSize,
    searchParam
}: {
    pageSize: string,
    searchParam: string
}) {

    const path = usePathname()
    const [customSearchParam, setCustomSearchParam] = useState<string>(searchParam || '')

    const url = useMemo(() => `${path}?${customSearchParam ? `&searchParam=${customSearchParam}` : ''}&pageNo=0&pageSize=${pageSize}`, [path, customSearchParam, pageSize])

    return (
        <Sheet>
            <SheetTrigger>
                <div className='px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-900 hover:font-medium flex items-center'>
                    <Filter size={19} className='mr-2' />
                    Filters
                </div>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px]">
                <div className='mt-10'>
                    <div className='grid grid-cols-3 mt-4'>
                        <div className='col-span-1 text-md flex items-center'>Applist / Bundle</div>
                        <div className='col-span-2 flex items-center'>
                            <Input
                                placeholder="Applist / Bundle"
                                name="searchParam"
                                value={customSearchParam}
                                onChange={(e) => setCustomSearchParam(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='flex justify-center my-5'>
                        <SheetClose asChild>
                            <Link href={url}>
                                <div className='bg-slate-800 text-slate-200 hover:bg-slate-950 dark:bg-slate-200 dark:text-slate-950 dark:hover:bg-slate-400 font-semibold py-3 px-4 rounded-xl'>Submit</div>
                            </Link>
                        </SheetClose>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}
