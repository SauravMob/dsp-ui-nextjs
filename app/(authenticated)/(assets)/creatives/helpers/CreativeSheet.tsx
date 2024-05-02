"use client"

import { fetchCampaignIdNameList, searchCampaign } from '@/app/(authenticated)/(manage)/campaigns/actions'
import { usePathname } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import { fetchCreativeIdNameList } from '../actions'
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Filter } from 'lucide-react'
import { AutoComplete, MultiSelectInput, SelectInput } from '@/components/utility/customComponents/SelectInput'
import { creativeSizeOptions, creativeTypeOptions, statusOptions } from '@/components/utility/utils/Utils'
import Link from 'next/link'

export default function CreativeSheet({ pageSize, campaignId, status, creativeSize, creativeId, creativeType }: CreativeFilterTypes) {

    const path = usePathname()

    const [campaign, setCampaign] = useState<string | undefined>(campaignId)
    const [creative, setCreative] = useState<string | undefined>(creativeId)
    const [customCreativeSize, setCustomCreativeSize] = useState<string>(creativeSize || '')
    const [customCreativeType, setCustomCreativeType] = useState<string>(creativeType || '')
    const [customStatus, setCustomStatus] = useState<string[] | string>(status ? status.split(',') : '')
    const [campaignOptions, setCampaignOptions] = useState<{ value: string, label: string }[]>([])
    const [creativeOptions, setCreativeOptions] = useState<{ value: string, label: string }[]>([])

    const campaignFilter = async (inputValue: string) => {
        const fetch = !parseInt(inputValue) ? await fetchCampaignIdNameList(inputValue) : await searchCampaign({ pageNo: "0", pageSize: "50", filter: { campaignId: inputValue } })
        const options = !parseInt(inputValue) ? fetch.map((v: { id: string, name: string }) => ({ value: v.id, label: v.name })) : fetch.content.map((v: { id: number, campaignName: string }) => ({ value: v.id.toString(), label: v.campaignName }))
        setCampaignOptions(options)
        return options
    }

    const creativeFilter = async (inputValue: string) => {
        const fetch = await fetchCreativeIdNameList(inputValue)
        const options = !parseInt(inputValue) ? fetch.map((v: { id: string, name: string }) => ({ value: v.id, label: v.name })) : fetch.content.map((v: { id: number, creativeName: string }) => ({ value: v.id.toString(), label: v.creativeName }))
        setCreativeOptions(options)
        return options
    }

    useEffect(() => {
        const fetchValue = async () => {
            const result = await searchCampaign({ pageNo: "0", pageSize: "50", filter: { campaignId } })
            setCampaignOptions(result.content.map((v: { id: number, campaignName: string }) => ({ value: v.id.toString(), label: v.campaignName })))
        }
        fetchValue()
    }, [campaignId])

    useEffect(() => {
        const fetchValue = async () => {
            const result = await fetchCreativeIdNameList('', creativeId)
            setCreativeOptions(result.map((v: { id: number, name: string }) => ({ value: v.id.toString(), label: v.name })))
        }
        fetchValue()
    }, [creativeId])


    const url = useMemo(() => `${path}?${campaign ? `&campaignId=${campaign}` : ''}${creative ? `&creativeId=${creative}` : ''}${customCreativeSize ? `&creativeSize=${customCreativeSize}` : ''}${customCreativeType ? `&creativeType=${customCreativeType}` : ''}${Array.isArray(customStatus) ? `&status=${customStatus.join(',')}` : ''}&pageNo=0&pageSize=${pageSize}`, [path, campaign, customCreativeSize, creative, customCreativeType, customStatus, pageSize])

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
                                value={campaignOptions.filter(v => v.value === campaign)[0]}
                                loadOptions={campaignFilter}
                                onChange={(e) => setCampaign(e ? e.value : '')}
                            />
                        </div>
                    </div>
                    <div className='grid grid-cols-3 mt-3'>
                        <div className='col-span-1 text-md flex items-center'>Creatives</div>
                        <div className='col-span-2 flex items-center'>
                            <AutoComplete
                                placeholder="Creatives..."
                                isClearable={true}
                                isSearchable={true}
                                name="creative"
                                value={creativeOptions.filter(v => v.value === creative)[0]}
                                loadOptions={creativeFilter}
                                onChange={(e) => setCreative(e ? e.value : '')}
                            />
                        </div>
                    </div>
                    <div className='grid grid-cols-3 mt-4'>
                        <div className='col-span-1 text-md flex items-center'>Ad Size</div>
                        <div className='col-span-2 flex items-center'>
                            <SelectInput
                                placeholder="Creative Size"
                                isClearable={true}
                                isSearchable={true}
                                name="creativeSize"
                                value={creativeSizeOptions.filter(v => customCreativeSize.includes(v.value))[0]}
                                options={creativeSizeOptions}
                                onChange={(e) => setCustomCreativeSize(e ? e.value : '')}
                            />
                        </div>
                    </div>
                    <div className='grid grid-cols-3 mt-4'>
                        <div className='col-span-1 text-md flex items-center'>Ad Format</div>
                        <div className='col-span-2 flex items-center'>
                            <SelectInput
                                placeholder="Creative Type"
                                isClearable={true}
                                isSearchable={true}
                                name="creativeType"
                                value={creativeTypeOptions.filter(v => customCreativeType.includes(v.value))[0]}
                                options={creativeTypeOptions}
                                onChange={(e) => setCustomCreativeType(e ? e.value : '')}
                            />
                        </div>
                    </div>
                    <div className='grid grid-cols-3 mt-4'>
                        <div className='col-span-1 text-md flex items-center'>Status</div>
                        <div className='col-span-2 flex items-center'>
                            <MultiSelectInput
                                placeholder="Status"
                                isClearable={true}
                                isSearchable={true}
                                name="status"
                                value={statusOptions.filter(v => customStatus.includes(v.value))}
                                options={statusOptions}
                                onChange={(e) => setCustomStatus(e?.length ? e.map(v => v.value) : '')}
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
