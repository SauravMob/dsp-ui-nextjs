"use client"

import { usePathname } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import { fetchAccountManagerAndAdmins, fetchCampaignIdNameList, searchCampaign } from '../../campaigns/actions'
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Filter } from 'lucide-react'
import { AutoComplete, MultiSelectInput, SelectInput } from '@/components/utility/customComponents/SelectInput'
import { countryOption } from '@/components/utility/utils/GeoUtils'
import { osOptions, statusOptions } from '@/components/utility/utils/Utils'
import Link from 'next/link'
import { fetchUserByRole } from '@/app/(authenticated)/(analyze)/actions'

export default function CampaignManagerSheet({
    pageSize, advertiserId, accountManagerId, country, os, status, campaignId
}: CampaignFilterTypes) {

    const path = usePathname()

    const [campaign, setCampaign] = useState<string | undefined>(campaignId)
    const [customCountry, setCustomCountry] = useState<string[] | string>(country ? country.split(',') : '')
    const [customOs, setCustomOs] = useState<string[] | string>(os ? os.split(',') : '')
    const [customStatus, setCustomStatus] = useState<string[] | string>(status ? status.split(',') : '')
    const [customAdvertiserId, setCustomAdvertiserId] = useState<string | undefined>(advertiserId)
    const [customAccountManagerId, setCustomAccountManagerId] = useState<string | undefined>(accountManagerId)

    const [campaignOptions, setCampaignOptions] = useState<{ value: string, label: string }[]>([])
    const [accManagersOptions, setAccManagersOptions] = useState<{ value: string, label: string }[]>([])
    const [advertisersOptions, setAdvertisersOptions] = useState<{ value: string, label: string }[]>([])

    const campaignFilter = async (inputValue: string) => {
        const fetch = !parseInt(inputValue) ? await fetchCampaignIdNameList(inputValue) : await searchCampaign({ pageNo: "0", pageSize: "50", filter: { campaignId: inputValue } })
        const options = !parseInt(inputValue) ? fetch.map((v: { id: string, name: string }) => ({ value: v.id, label: v.name })) : fetch.content.map((v: { id: number, campaignName: string }) => ({ value: v.id.toString(), label: v.campaignName }))
        setCampaignOptions(options)
        return options
    }

    useEffect(() => {
        const fetchCampaigns = async () => {
            const result = await searchCampaign({ pageNo: "0", pageSize: "50", filter: { campaignId } })
            setCampaignOptions(result.content.map((v: { id: number, campaignName: string }) => ({ value: v.id.toString(), label: v.campaignName })))
        }
        fetchCampaigns()

        const fetchAccountManagers = async () => {
            const result = await fetchAccountManagerAndAdmins()
            setAccManagersOptions(result.map((v: { id: number, email: string }) => ({ value: v.id.toString(), label: v.email })))
        }
        fetchAccountManagers()

        const fetchUser = async () => {
            const result = await fetchUserByRole("ADVERTISER")
            setAdvertisersOptions(result.map((v: { id: number, name: string }) => ({ value: v.id.toString(), label: v.name })))
        }
        fetchUser()
    }, [campaignId, advertiserId, accountManagerId])

    const uri = useMemo(() => `${path}?${campaign ? `&campaignId=${campaign}` : ''}${customAdvertiserId ? `&advertiserId=${customAdvertiserId}` : ''}${customAccountManagerId ? `&accountManagerId=${customAccountManagerId}` : ''}${Array.isArray(customCountry) ? `&country=${customCountry.join(',')}` : ''}${Array.isArray(customOs) ? `&os=${customOs.join(',')}` : ''}${Array.isArray(customStatus) ? `&status=${customStatus.join(',')}` : ''}&pageNo=0&pageSize=${pageSize}`, [path, campaign, customCountry, customOs, customStatus, customAdvertiserId, customAccountManagerId, pageSize])

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
                    <div className='grid grid-cols-3 mt-4'>
                        <div className='col-span-1 text-md flex items-center'>Country</div>
                        <div className='col-span-2 flex items-center'>
                            <MultiSelectInput
                                placeholder="Country"
                                isClearable={true}
                                isSearchable={true}
                                name="country"
                                value={countryOption.filter(v => customCountry.includes(v.value))}
                                options={countryOption}
                                onChange={(e) => setCustomCountry(e?.length ? e.map(v => v.value) : '')}
                            />
                        </div>
                    </div>
                    <div className='grid grid-cols-3 mt-4'>
                        <div className='col-span-1 text-md flex items-center'>OS</div>
                        <div className='col-span-2 flex items-center'>
                            <MultiSelectInput
                                placeholder="OS"
                                isClearable={true}
                                isSearchable={true}
                                name="os"
                                value={osOptions.filter(v => customOs.includes(v.value))}
                                options={osOptions}
                                onChange={(e) => setCustomOs(e?.length ? e.map(v => v.value) : '')}
                            />
                        </div>
                    </div>
                    <div className='grid grid-cols-3 mt-4'>
                        <div className='col-span-1 text-md flex items-center'>Status</div>
                        <div className='col-span-2 flex items-center'>
                            <MultiSelectInput
                                placeholder="Staus"
                                isClearable={true}
                                isSearchable={true}
                                name="status"
                                value={statusOptions.filter(v => customStatus.includes(v.value))}
                                options={statusOptions}
                                onChange={(e) => setCustomStatus(e?.length ? e.map(v => v.value) : '')}
                            />
                        </div>
                    </div>
                    <div className='grid grid-cols-3 mt-4'>
                        <div className='col-span-1 text-md flex items-center'>Advertiser</div>
                        <div className='col-span-2 flex items-center'>
                            <SelectInput
                                placeholder="Advertiser Id"
                                isClearable={true}
                                isSearchable={true}
                                name="advertiserId"
                                value={advertisersOptions.filter(v => v.value === customAdvertiserId)[0]}
                                options={advertisersOptions}
                                onChange={(e) => setCustomAdvertiserId(e ? e.value : '')}
                            />
                        </div>
                    </div>
                    <div className='grid grid-cols-3 mt-4'>
                        <div className='col-span-1 text-md flex items-center'>Account Manager</div>
                        <div className='col-span-2 flex items-center'>
                            <SelectInput
                                placeholder="Account Manager Id"
                                isClearable={true}
                                isSearchable={true}
                                name="accountManagerId"
                                value={accManagersOptions.filter(v => v.value === customAccountManagerId)[0]}
                                options={accManagersOptions}
                                onChange={(e) => setCustomAccountManagerId(e ? e.value : '')}
                            />
                        </div>
                    </div>
                    <div className='flex justify-center my-5'>
                        <SheetClose asChild>
                            <Link href={uri}>
                                <div className='bg-slate-800 text-slate-200 hover:bg-slate-950 dark:bg-slate-200 dark:text-slate-950 dark:hover:bg-slate-400 font-semibold py-3 px-4 rounded-xl'>Submit</div>
                            </Link>
                        </SheetClose>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}
