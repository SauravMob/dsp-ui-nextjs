"use client"

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { PopoverContent } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { SelectInput } from '@/components/utility/customComponents/SelectInput'
import { endOfLastMonth, endOfLastWeekDate, endOfThisMonth, formatQryDate, startOfLastMonth, startOfLastWeekDate, startOfThisMonth, todayDate, todayMinus2Date, todayMinus3MonthsDate, todayMinus7Date, yesterdayDate } from '@/components/utility/utils/Utils'
import { cn } from '@/lib/utils'
import { Popover, PopoverTrigger } from '@radix-ui/react-popover'
import { CalendarIcon, Filter } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import { fetchUserByRole } from '../../actions'
import { DateRange } from 'react-day-picker'
import Link from 'next/link'

const reportTypeOptions = [
    { value: "impressions", label: "Impressions" },
    { value: "clicks", label: "Clicks" },
    { value: "bids", label: "Bids" }
]

export default function AdminDashboardSheet({
    interval,
    reportType,
    advertiserId,
    sspUserId,
    pageSize
}: {
    interval: string,
    reportType: string,
    advertiserId: string,
    sspUserId: string,
    pageSize: string
}) {

    const path = usePathname()

    const [advertiserOptions, setAdvertiserOptions] = useState<{ value: string, label: string }[]>([])
    const [sspOptions, setSSPOptions] = useState<{ value: string, label: string }[]>([])

    const [date, setDate] = useState<{
        from: Date | undefined;
        to?: Date | undefined;
    } | undefined>({ from: todayMinus2Date, to: todayDate })

    const [customInterval, setCustomInterval] = useState<string>(interval)
    const [customReportType, setCustomReportType] = useState<string>(reportType)
    const [customAdvertiserId, setCustomAdvertiserId] = useState<string>(advertiserId)
    const [customSspUserId, setCustomSspUserId] = useState<string>(sspUserId)

    useEffect(() => {
        const fetchData = async () => {
            const advertiserList = await fetchUserByRole('ADVERTISER')
            setAdvertiserOptions(advertiserList.map((v: { id: number, name: string }) => ({ value: v.id, label: v.name })))

            const sspList = await fetchUserByRole('SSP')
            setSSPOptions(sspList.map((v: { id: number, name: string }) => ({ value: v.id, label: v.name })))
        }
        fetchData()
    }, [])

    const uri = useMemo(() => `${path}?interval=${customInterval === "CUSTOM" && date ? `CUSTOM&from=${formatQryDate(date.from)}&to=${formatQryDate(date.to)}` : `${customInterval}`}${customReportType ? `&reportType=${customReportType}` : ''}${customAdvertiserId ? `&advertiserId=${customAdvertiserId}` : ''}${customSspUserId ? `&sspUserId=${customSspUserId}` : ''}&pageNo=0&pageSize=${pageSize}`, [date, path, customInterval, customReportType, customAdvertiserId, customSspUserId, pageSize])

    return <Sheet>
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
                                    else if (value === "TODAY_YESTERDAY") setDate({ from: yesterdayDate, to: todayDate })
                                    else if (value === "LAST_SEVEN_DAYS") setDate({ from: todayMinus7Date, to: todayDate })
                                    else if (value === "LAST_WEEK") setDate({ from: startOfLastWeekDate, to: endOfLastWeekDate })
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
                                    <SelectItem value="TODAY_YESTERDAY">Today vs YTD</SelectItem>
                                    <SelectItem value="LAST_SEVEN_DAYS">Last 7 Days</SelectItem>
                                    <SelectItem value="LAST_WEEK">Last Week</SelectItem>
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
                <div className='col-span-1 text-md flex items-center'>Report Type</div>
                <div className='col-span-2 flex items-center'>
                    <SelectInput
                        placeholder="Report Type"
                        isClearable={true}
                        isSearchable={true}
                        name="reportType"
                        value={reportTypeOptions.filter(v => v.value === customReportType)[0]}
                        options={reportTypeOptions}
                        onChange={(e) => setCustomReportType(e ? e.value : '')}
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
            <div className='grid grid-cols-3 mt-4'>
                <div className='col-span-1 text-md flex items-center'>SSP</div>
                <div className='col-span-2 flex items-center'>
                    <SelectInput
                        placeholder="SSP"
                        isClearable={true}
                        isSearchable={true}
                        name="sspUserId"
                        value={sspOptions.filter(v => v.value === customSspUserId)[0]}
                        options={sspOptions}
                        onChange={(e) => setCustomSspUserId(e ? e.value : '')}
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
        </SheetContent>
    </Sheet>
}