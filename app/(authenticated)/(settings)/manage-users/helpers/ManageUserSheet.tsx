"use client"

import { Input } from '@/components/ui/input'
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { SelectInput } from '@/components/utility/customComponents/SelectInput'
import { roleOptions, statusWithoutPauseOptions } from '@/components/utility/utils/Utils'
import { Filter } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useMemo, useState } from 'react'

export default function ManageUserSheet({
    pageSize,
    email,
    role,
    status
}: ManageUserFilter) {

    const path = usePathname()
    const [customStatus, setCustomStatus] = useState<string>(status || '')
    const [customRole, setCustomRole] = useState<string>(role || '')
    const [customEmail, setCustomEmail] = useState<string>(email || '')

    const url = useMemo(() => `${path}?${customEmail ? `&email=${customEmail}` : ''}${customStatus ? `&status=${customStatus}` : ''}${customRole ? `&role=${customRole}` : ''}&pageNo=0&pageSize=${pageSize}`, [path, customStatus, customEmail, customRole, pageSize])

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
                                value={statusWithoutPauseOptions.filter(v => v.value === customStatus)[0]}
                                options={statusWithoutPauseOptions}
                                onChange={(e) => setCustomStatus(e ? e.value : '')}
                            />
                        </div>
                    </div>
                    <div className='grid grid-cols-3 mt-4'>
                        <div className='col-span-1 text-md flex items-center'>Role</div>
                        <div className='col-span-2 flex items-center'>
                            <SelectInput
                                placeholder="Role"
                                isClearable={true}
                                isSearchable={true}
                                name="role"
                                value={roleOptions.filter(v => v.value === customRole)[0]}
                                options={roleOptions}
                                onChange={(e) => setCustomRole(e ? e.value : '')}
                            />
                        </div>
                    </div>
                    <div className='grid grid-cols-3 mt-4'>
                        <div className='col-span-1 text-md flex items-center'>Email</div>
                        <div className='col-span-2 flex items-center'>
                            <Input
                                placeholder="Email"
                                name="email"
                                value={customEmail}
                                onChange={(e) => setCustomEmail(e.target.value)}
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
