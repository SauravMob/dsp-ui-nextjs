"use client"

import { fetchUserByRole } from '@/app/(authenticated)/(analyze)/actions'
import { Input } from '@/components/ui/input'
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { SelectInput } from '@/components/utility/customComponents/SelectInput'
import { statusWithoutInactiveOptions } from '@/components/utility/utils/Utils'
import { Filter } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'

export default function InventorySheet({
    pageSize,
    status,
    exchangeId,
    bundleOrDomain
}: {
    pageSize: string,
    status: string,
    exchangeId: string,
    bundleOrDomain: string
}) {

    const path = usePathname()
    const [customStatus, setCustomStatus] = useState<string | undefined>(status)
    const [customExchangeId, setCustomExchangeId] = useState<string | undefined>(exchangeId)
    const [customBundleOrDomain, setCustomBundleOrDomain] = useState<string | undefined>(bundleOrDomain)

    const [sspOptions, setSSPOptions] = useState<{ value: string, label: string }[]>([])

    useEffect(() => {
        const fetchValue = async () => {
            const result = await fetchUserByRole("SSP")
            setSSPOptions(result.map((v: { id: number, name: string }) => ({ value: v.id.toString(), label: v.name })))
        }
        fetchValue()
    }, [])

    const uri = useMemo(() => `${path}?${customStatus ? `&status=${customStatus}` : ''}${customExchangeId ? `&exchangeId=${customExchangeId}` : ''}${customBundleOrDomain ? `&bundleOrDomain=${customBundleOrDomain}` : ''}&pageNo=0&pageSize=${pageSize}`, [path, customBundleOrDomain, customExchangeId, customStatus, pageSize])

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
                        <div className='col-span-1 text-md flex items-center'>Exchange</div>
                        <div className='col-span-2 flex items-center'>
                            <SelectInput
                                placeholder="Exchange"
                                isClearable={true}
                                isSearchable={true}
                                name="exchangeId"
                                value={sspOptions.filter(v => v.value === customExchangeId)[0]}
                                options={sspOptions}
                                onChange={(e) => setCustomExchangeId(e ? e.value : '')}
                            />
                        </div>
                    </div>
                    <div className='grid grid-cols-3 mt-4'>
                        <div className='col-span-1 text-md flex items-center'>Status</div>
                        <div className='col-span-2 flex items-center'>
                            <SelectInput
                                placeholder="Status"
                                isClearable={true}
                                isDisabled={!customExchangeId}
                                isSearchable={true}
                                name="status"
                                value={statusWithoutInactiveOptions.filter(v => v.value === customStatus)[0]}
                                options={statusWithoutInactiveOptions}
                                onChange={(e) => setCustomStatus(e ? e.value : '')}
                            />
                        </div>
                    </div>
                    <div className='grid grid-cols-3 mt-4'>
                        <div className='col-span-1 text-md flex items-center'>Bundle / Domain</div>
                        <div className='col-span-2 flex items-center'>
                            <Input
                                placeholder="Bundle Or Domain"
                                name="bundleOrDomain"
                                disabled={!customExchangeId}
                                value={customBundleOrDomain}
                                onChange={(e) => setCustomBundleOrDomain(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='flex justify-center my-5'>
                        <SheetClose asChild>
                            <Link href={!customExchangeId ? '/inventory' : uri}>
                                <div className='bg-slate-800 text-slate-200 hover:bg-slate-950 dark:bg-slate-200 dark:text-slate-950 dark:hover:bg-slate-400 font-semibold py-3 px-4 rounded-xl'>Submit</div>
                            </Link>
                        </SheetClose>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}
