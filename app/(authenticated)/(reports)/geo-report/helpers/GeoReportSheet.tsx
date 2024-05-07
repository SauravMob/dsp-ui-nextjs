"use client"

import { fetchUserByRole } from '@/app/(authenticated)/(analyze)/actions'
import { fetchCampaignIdNameList, searchCampaign } from '@/app/(authenticated)/(manage)/campaigns/actions'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { AutoComplete, SelectInput } from '@/components/utility/customComponents/SelectInput'
import { countryOption } from '@/components/utility/utils/GeoUtils'
import { formatQryDate, endOfLastMonth, endOfThisMonth, startOfLastMonth, startOfThisMonth, todayDate, todayMinus3MonthsDate, todayMinus7Date, yesterdayDate } from '@/components/utility/utils/Utils'
import { cn } from '@/lib/utils'
import { CalendarIcon, Filter } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import { DateRange } from 'react-day-picker'

export default function GeoReportSheet({
    interval,
    from,
    to,
    campaignId,
    country,
    ssp,
    advertiserId,
    pageSize,
    exchangeFilterNotAllowed
}: GeoReportFilter) {

    const path = usePathname()

    const [date, setDate] = useState<{
        from: Date | undefined
        to: Date | undefined
    } | undefined>({ from: new Date(from), to: new Date(to) })

    const [customInterval, setCustomInterval] = useState<string>(interval)
    const [customAdvertiserId, setCustomAdvertiserId] = useState<string>(advertiserId)
    const [customCampaignId, setCustomCampaignId] = useState<string>(campaignId)
    const [customCountry, setCustomCountry] = useState<string>(country)
    const [customSsp, setCustomSsp] = useState<string>(ssp)

    const [campaignOptions, setCampaignOptions] = useState<{ value: string, label: string }[]>([])
    const [advertiserOptions, setAdvertiserOptions] = useState<{ value: string, label: string }[]>([])
    const [sspOptions, setSspOptions] = useState<{ value: string, label: string }[]>([])

    useEffect(() => {
        const fetchAdvertiser = async () => {
            const advertiserList = await fetchUserByRole('ADVERTISER')
            setAdvertiserOptions(advertiserList.map((v: { id: number, name: string }) => ({ value: v.id.toString(), label: v.name })))
        }
        fetchAdvertiser()
        const fetchExchange = async () => {
            const exchangeList = await fetchUserByRole('SSP')
            setSspOptions(exchangeList.map((v: { id: number, name: string }) => ({ value: v.id.toString(), label: v.name })))
        }
        if (!exchangeFilterNotAllowed) fetchExchange()
        const fetchCampaign = async () => {
            const result = await searchCampaign({ pageNo: "0", pageSize: "50", filter: { campaignId } })
            setCampaignOptions(result.content.map((v: { id: number, campaignName: string }) => ({ value: v.id.toString(), label: v.campaignName })))
        }
        fetchCampaign()
    }, [advertiserId, ssp, campaignId])

    const campaignFilter = async (inputValue: string) => {
        const fetch = !parseInt(inputValue) ? await fetchCampaignIdNameList(inputValue) : await searchCampaign({ pageNo: "0", pageSize: "50", filter: { campaignId: inputValue } })
        const options = !parseInt(inputValue) ? fetch.map((v: { id: string, name: string }) => ({ value: v.id, label: v.name })) : fetch.content.map((v: { id: number, campaignName: string }) => ({ value: v.id.toString(), label: v.campaignName }))
        setCampaignOptions(options)
        return options
    }

    const uri = useMemo(() => `${path}?interval=${customInterval === "CUSTOM" && date ? `CUSTOM&from=${formatQryDate(date.from)}&to=${formatQryDate(date.to)}` : `${customInterval}`}${customAdvertiserId ? `&advertiserId=${customAdvertiserId}` : ''}${customSsp ? `&ssp=${customSsp}` : ''}${customCampaignId ? `&campaignId=${customCampaignId}` : ''}${customCountry ? `&country=${customCountry}` : ''}&pageNo=0&pageSize=${pageSize}`, [date, path, customInterval, customAdvertiserId, customSsp, customCampaignId, customCountry, pageSize])

    return (
        <Sheet>
            <SheetTrigger>
                <div className='px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-900 hover:font-medium flex items-center'>
                    <Filter size={19} className='mr-2' />
                    Filters
                </div>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px]">
                <div className='grid grid-cols-3 mt-10'>
                    <div className='col-span-1 text-md flex items-center'>Interval</div>
                    <div className='col-span-2 flex items-center'>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? <span>{customInterval}</span> : <span>Interval</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
                                <Select
                                    onValueChange={(value) => {
                                        setCustomInterval(value)
                                        if (value === "TODAY") setDate({ from: todayDate, to: todayDate })
                                        else if (value === "YESTERDAY") setDate({ from: yesterdayDate, to: yesterdayDate })
                                        else if (value === "LAST_SEVEN_DAYS") setDate({ from: todayMinus7Date, to: todayDate })
                                        else if (value === "THIS_MONTH") setDate({ from: startOfThisMonth, to: endOfThisMonth })
                                        else if (value === "LAST_MONTH") setDate({ from: startOfLastMonth, to: endOfLastMonth })
                                    }}
                                >
                                    <SelectTrigger>
                                        <SelectValue defaultValue={customInterval} placeholder="SELECT" />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        <SelectItem value="TODAY">Today</SelectItem>
                                        <SelectItem value="YESTERDAY">Yesterday</SelectItem>
                                        <SelectItem value="LAST_SEVEN_DAYS">Last 7 Days</SelectItem>
                                        <SelectItem value="THIS_MONTH">This Month</SelectItem>
                                        <SelectItem value="LAST_MONTH">Last Month</SelectItem>
                                    </SelectContent>
                                </Select>
                                <div className="rounded-md border">
                                    <Calendar
                                        mode="range"
                                        selected={date}
                                        onSelect={(e: DateRange | undefined) => {
                                            if (e) {
                                                setCustomInterval("CUSTOM")
                                                setDate({ from: e.from, to: e.to })
                                            } else setCustomInterval(interval)
                                        }}
                                        className="rounded-md border"
                                        fromMonth={todayMinus3MonthsDate}
                                        toMonth={todayDate}
                                    />
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
                <div className='grid grid-cols-3 mt-4'>
                    <div className='col-span-1 text-md flex items-center'>Campaigns</div>
                    <div className='col-span-2 flex items-center'>
                        <AutoComplete
                            placeholder="Campaign..."
                            isClearable={true}
                            isSearchable={true}
                            name="campaign"
                            value={campaignOptions.filter(v => v.label === customCampaignId)[0]}
                            loadOptions={campaignFilter}
                            onChange={(e) => setCustomCampaignId(e ? e.value : '')}
                        />
                    </div>
                </div>
                <div className='grid grid-cols-3 mt-4'>
                    <div className='col-span-1 text-md flex items-center'>Country</div>
                    <div className='col-span-2 flex items-center'>
                        <SelectInput
                            placeholder="Country"
                            isClearable={true}
                            isSearchable={true}
                            name="country"
                            value={countryOption.filter(v => v.value === customCountry)[0]}
                            options={countryOption}
                            onChange={(e) => setCustomCountry(e ? e.value : '')}
                        />
                    </div>
                </div>
                <div className='grid grid-cols-3 mt-4'>
                    <div className='col-span-1 text-md flex items-center'>Advertiser</div>
                    <div className='col-span-2 flex items-center'>
                        <SelectInput
                            placeholder="Advertiser"
                            isClearable={true}
                            isSearchable={true}
                            name="advertiserId"
                            value={advertiserOptions.filter(v => v.value === customAdvertiserId)[0]}
                            options={advertiserOptions}
                            onChange={(e) => setCustomAdvertiserId(e ? e.value : '')}
                        />
                    </div>
                </div>
                {!exchangeFilterNotAllowed && <div className='grid grid-cols-3 mt-4'>
                    <div className='col-span-1 text-md flex items-center'>Exchange</div>
                    <div className='col-span-2 flex items-center'>
                        <SelectInput
                            placeholder="Exchange"
                            isClearable={true}
                            isSearchable={true}
                            name="ssp"
                            value={sspOptions.filter(v => v.label === customSsp)[0]}
                            options={sspOptions}
                            onChange={(e) => setCustomSsp(e ? e.label : '')}
                        />
                    </div>
                </div>}
                <div className='flex justify-center my-5'>
                    <SheetClose asChild>
                        <Link href={uri}>
                            <div className='bg-slate-800 text-slate-200 hover:bg-slate-950 dark:bg-slate-200 dark:text-slate-950 dark:hover:bg-slate-400 font-semibold py-3 px-4 rounded-xl'>Submit</div>
                        </Link>
                    </SheetClose>
                </div>
            </SheetContent>
        </Sheet>
    )
}
