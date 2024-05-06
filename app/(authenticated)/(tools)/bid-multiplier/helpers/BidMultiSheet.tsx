"use client"

import { fetchCampaignIdNameList, searchCampaign } from '@/app/(authenticated)/(manage)/campaigns/actions'
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { AutoComplete, SelectInput } from '@/components/utility/customComponents/SelectInput'
import { statusWithoutInactiveOptions } from '@/components/utility/utils/Utils'
import { Filter } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'

export default function BidMultiSheet({
    pageSize,
    campaignId,
    status
}: BidMultiFilter) {

    const path = usePathname()
    const [customStatus, setCustomStatus] = useState<string>(status || '')
    const [customCampaignId, setCustomCampaignId] = useState<string>(campaignId || '')

    const [campaignOptions, setCampaignOptions] = useState<{ value: string, label: string }[]>([])

    useEffect(() => {
        const fetchValue = async () => {
            const result = await searchCampaign({ pageNo: "0", pageSize: "50", filter: { campaignId } })
            setCampaignOptions(result.content.map((v: { id: number, campaignName: string }) => ({ value: v.id.toString(), label: v.campaignName })))
        }
        fetchValue()
    }, [campaignId])

    const campaignFilter = async (inputValue: string) => {
        const fetch = !parseInt(inputValue) ? await fetchCampaignIdNameList(inputValue) : await searchCampaign({ pageNo: "0", pageSize: "50", filter: { campaignId: inputValue } })
        const options = !parseInt(inputValue) ? fetch.map((v: { id: string, name: string }) => ({ value: v.id, label: v.name })) : fetch.content.map((v: { id: number, campaignName: string }) => ({ value: v.id.toString(), label: v.campaignName }))
        setCampaignOptions(options)
        return options
    }

    const url = useMemo(() => `${path}?${customCampaignId ? `&campaignId=${customCampaignId}` : ''}${customStatus ? `&status=${customStatus}` : ''}&pageNo=0&pageSize=${pageSize}`, [path, customStatus, customCampaignId, pageSize])

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
                    <div className='grid grid-cols-3'>
                        <div className='col-span-1 text-md flex items-center'>Campaigns</div>
                        <div className='col-span-2 flex items-center'>
                            <AutoComplete
                                placeholder="Campaign..."
                                isClearable={true}
                                isSearchable={true}
                                name="campaign"
                                value={campaignOptions.filter(v => v.value === customCampaignId)[0]}
                                loadOptions={campaignFilter}
                                onChange={(e) => setCustomCampaignId(e ? e.value : '')}
                            />
                        </div>
                    </div>
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
