"use client"

import { getAudEvents } from '@/app/(authenticated)/(assets)/audiences/actions'
import { Input } from '@/components/ui/input'
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { SelectInput } from '@/components/utility/customComponents/SelectInput'
import { statusWithoutInactiveOptions } from '@/components/utility/utils/Utils'
import { Filter } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'

export default function MmpSettingSheet({
    pageSize,
    bundle,
    events,
    status,
    mmp
}: MmpSettingFilter) {

    const path = usePathname()
    const [customStatus, setCustomStatus] = useState<string>(status || '')
    const [customMmp, setCustomMmp] = useState<string>(mmp || '')
    const [customBundle, setCustomBundle] = useState<string>(bundle || '')
    const [customEvents, setCustomEvents] = useState<string>(events || '')

    const [mmpOptions, setMmpOptions] = useState<{ value: string, label: string }[]>([])

    useEffect(() => {
        const fetchMMP = async () => {
            const mmpList = await getAudEvents()            
            setMmpOptions(Object.keys(mmpList).map((v: string) => ({ value: v, label: v })))
        }
        fetchMMP()
    }, [])

    const url = useMemo(() => `${path}?${customStatus && `&status=${customStatus}`}${customMmp && `&mmp=${customMmp}`}${customBundle && `&bundle=${customBundle}`}${customEvents && `&events=${customEvents}`}&pageNo=0&pageSize=${pageSize}`, [path, customBundle, customEvents, customMmp, customStatus, pageSize])

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
                        <div className='col-span-1 text-md flex items-center'>Status</div>
                        <div className='col-span-2 flex items-center'>
                            <SelectInput
                                placeholder="Status"
                                isClearable={true}
                                isSearchable={true}
                                name="status"
                                value={statusWithoutInactiveOptions.filter(v => v.value === customStatus)[0]}
                                options={statusWithoutInactiveOptions}
                                onChange={(e) => setCustomStatus(e ? e.value : '')}
                            />
                        </div>
                    </div>
                    <div className='grid grid-cols-3 mt-4'>
                        <div className='col-span-1 text-md flex items-center'>MMP</div>
                        <div className='col-span-2 flex items-center'>
                            <SelectInput
                                placeholder="MMP"
                                isClearable={true}
                                isSearchable={true}
                                name="mmp"
                                value={mmpOptions.filter(v => v.value === customMmp)[0]}
                                options={mmpOptions}
                                onChange={(e) => setCustomMmp(e ? e.value : '')}
                            />
                        </div>
                    </div>
                    <div className='grid grid-cols-3 mt-4'>
                        <div className='col-span-1 text-md flex items-center'>Bundle</div>
                        <div className='col-span-2 flex items-center'>
                            <Input
                                placeholder="Bundle"
                                name="bundle"
                                value={customBundle}
                                onChange={(e) => setCustomBundle(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='grid grid-cols-3 mt-4'>
                        <div className='col-span-1 text-md flex items-center'>Events</div>
                        <div className='col-span-2 flex items-center'>
                            <Input
                                placeholder="Events"
                                name="events"
                                value={customEvents}
                                onChange={(e) => setCustomEvents(e.target.value)}
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
