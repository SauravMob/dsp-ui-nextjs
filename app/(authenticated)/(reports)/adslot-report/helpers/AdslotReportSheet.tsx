"use client"

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { SelectInput } from '@/components/utility/customComponents/SelectInput'
import { formatQryDate, todayDate, todayMinus2Date, yesterdayDate } from '@/components/utility/utils/Utils'
import { cn } from '@/lib/utils'
import { CalendarIcon, Filter } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import { DateRange } from 'react-day-picker'
import { getBundlesDropdown, getExchangesIdName } from '../actions'

export default function AdslotReportSheet({
    interval,
    from,
    to,
    bundleId,
    exchangeId,
    pageSize
}: AdslotReportFilter) {

    const path = usePathname()

    const [date, setDate] = useState<{
        from: Date | undefined
        to: Date | undefined
    } | undefined>({ from: new Date(from), to: new Date(to) })

    const [customInterval, setCustomInterval] = useState<string>(interval)
    const [customBundleId, setCustomBundleId] = useState<string>(bundleId)
    const [customExchangeId, setCustomExchangeId] = useState<string>(exchangeId)

    const [bundleOptions, setBundleOptions] = useState<{ value: string, label: string }[]>([])
    const [exchangeOptions, setExchangeOptions] = useState<{ value: string, label: string }[]>([])

    useEffect(() => {
        const fetchExchange = async () => {
            const exchangeList = await getExchangesIdName()
            setExchangeOptions(exchangeList.map((v: { id: number, name: string }) => ({ value: v.id.toString(), label: v.name })))
        }
        fetchExchange()
    }, [exchangeId])

    const fetchBundles = async (exchangeId: string) => {
        const bundleList = await getBundlesDropdown(exchangeId)
        setBundleOptions(bundleList.map((v: string) => ({ value: v, label: v })))
    }

    const uri = useMemo(() => `${path}?interval=${customInterval === "CUSTOM" && date ? `CUSTOM&from=${formatQryDate(date.from)}&to=${formatQryDate(date.to)}` : `${customInterval}`}${customExchangeId ? `&exchangeId=${customExchangeId}` : ''}${customBundleId ? `&bundleId=${customBundleId}` : ''}&pageNo=0&pageSize=${pageSize}`, [date, path, customInterval, customBundleId, customExchangeId, pageSize])

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
                                    }}
                                >
                                    <SelectTrigger>
                                        <SelectValue defaultValue={customInterval} placeholder="SELECT" />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        <SelectItem value="TODAY">Today</SelectItem>
                                        <SelectItem value="YESTERDAY">Yesterday</SelectItem>
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
                                        fromDate={todayMinus2Date}
                                        toDate={todayDate}
                                    />
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
                <div className='grid grid-cols-3 mt-4'>
                    <div className='col-span-1 text-md flex items-center'>Exchange</div>
                    <div className='col-span-2 flex items-center'>
                        <SelectInput
                            placeholder="Exchange"
                            isClearable={true}
                            isSearchable={true}
                            name="exchangeId"
                            value={exchangeOptions.filter(v => v.value === customExchangeId)[0]}
                            options={exchangeOptions}
                            onChange={(e) => {
                                if (e) fetchBundles(e?.value)
                                setCustomBundleId('')
                                setCustomExchangeId(e ? e.value : '')
                            }}
                        />
                    </div>
                </div>
                <div className='grid grid-cols-3 mt-4'>
                    <div className='col-span-1 text-md flex items-center'>Bundles</div>
                    <div className='col-span-2 flex items-center'>
                        <SelectInput
                            placeholder="Bundles"
                            isClearable={true}
                            isSearchable={true}
                            name="bundleId"
                            isDisabled={!customExchangeId}
                            value={bundleOptions.filter(v => v.value === customBundleId)[0]}
                            options={bundleOptions}
                            onChange={(e) => setCustomBundleId(e ? e.value : '')}
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
    )
}
