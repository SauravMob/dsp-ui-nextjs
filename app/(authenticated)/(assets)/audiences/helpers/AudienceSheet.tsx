"use client"

import { Input } from '@/components/ui/input'
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { SelectInput } from '@/components/utility/customComponents/SelectInput'
import { statusWithoutInactiveOptions, uploadTypeOptions } from '@/components/utility/utils/Utils'
import { Filter } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useMemo, useState } from 'react'

export default function AudienceSheet({
    pageSize,
    audName,
    uploadType,
    status,
    isAdmin
}: AudienceFilter) {

    const path = usePathname()
    const customUploadTypeOptions = uploadTypeOptions.filter(v => v.value !== 'internal')
    const [customAudName, setCustomAudName] = useState<string>(audName || '')
    const [customStatus, setCustomStatus] = useState<string>(status || '')
    const [customUploadType, setCustomUploadType] = useState<string>(uploadType || '')

    const url = useMemo(() => `${path}?${customAudName ? `&audName=${customAudName}` : ''}${customStatus ? `&status=${customStatus}` : ''}${customUploadType ? `&uploadType=${customUploadType}` : ''}&pageNo=0&pageSize=${pageSize}`, [path, customAudName, customStatus, customUploadType, pageSize])

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
                        <div className='col-span-1 text-md flex items-center'>Audience</div>
                        <div className='col-span-2 flex items-center'>
                            <Input
                                placeholder="Audience Name"
                                name="audName"
                                value={customAudName}
                                onChange={(e) => setCustomAudName(e.target.value)}
                            />
                        </div>
                    </div>
                    {isAdmin && <div className='grid grid-cols-3 mt-4'>
                        <div className='col-span-1 text-md flex items-center'>Upload Type</div>
                        <div className='col-span-2 flex items-center'>
                            <SelectInput
                                placeholder="Upload Type"
                                isClearable={true}
                                isSearchable={true}
                                name="uploadType"
                                value={customUploadTypeOptions.filter(v => v.value === customUploadType)[0]}
                                options={customUploadTypeOptions}
                                onChange={(e) => setCustomUploadType(e ? e.value : '')}
                            />
                        </div>
                    </div>}
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
