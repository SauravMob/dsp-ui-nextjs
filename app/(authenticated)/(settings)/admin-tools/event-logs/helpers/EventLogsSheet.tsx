"use client"

import { usePathname } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import { fetchAllUsers } from '../../../manage-users/actions'
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { CalendarIcon, Filter } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { formatQryDate, endOfLastMonth, endOfThisMonth, startOfLastMonth, startOfThisMonth, todayDate, todayMinus3MonthsDate, todayMinus7Date, yesterdayDate } from '@/components/utility/utils/Utils'
import { Calendar } from '@/components/ui/calendar'
import { DateRange } from 'react-day-picker'
import { SelectInput } from '@/components/utility/customComponents/SelectInput'
import Link from 'next/link'
import { Input } from '@/components/ui/input'

const entityOptions = [
    { value: 'CREATIVE', label: 'CREATIVE' },
    { value: 'CAMPAIGN', label: 'CAMPAIGN' }
]

const eventTypeOptions = [
    { value: 'UPDATE', label: 'UPDATE' },
    { value: 'CREATE', label: 'CREATE' }
]

export default function EventLogsSheet({
    pageSize,
    interval,
    from,
    to,
    entity,
    entityId,
    eventType,
    userId
}: EventLogsFilter) {

    const path = usePathname()

    const [date, setDate] = useState<{
        from: Date | undefined
        to: Date | undefined
    } | undefined>({ from: from ? new Date(from) : undefined, to: to ? new Date(to) : undefined })

    const [customInterval, setCustomInterval] = useState<string>(interval)
    const [customUserId, setCustomUserId] = useState<string>(userId)
    const [customEntity, setCustomEntity] = useState<string>(entity)
    const [customEntityId, setCustomEntityId] = useState<string>(entityId)
    const [customEventType, setCustomEventType] = useState<string>(eventType)

    const [userOptions, setUserOptions] = useState<{ value: string, label: string }[]>([])

    useEffect(() => {
        const fetchUser = async () => {
            const userList = await fetchAllUsers({ pageNo: '0', pageSize: '512' })
            setUserOptions(userList.content.map((v: { id: number, email: string }) => ({ value: v.email === "admin@mobavenue.com" ? "-1" : v.id.toString(), label: v.email })))
        }
        fetchUser()
    }, [])

    const uri = useMemo(() => `${path}?${customInterval ? `&interval=${date ? `${customInterval}&from=${formatQryDate(date.from)}&to=${formatQryDate(date.to)}` : ''}` : ""}${customEntity && `&entity=${customEntity}`}${customEntityId && `&entityId=${customEntityId}`}${customEventType && `&eventType=${customEventType}`}${customUserId && `&userId=${customUserId}`}&pageNo=0&pageSize=${pageSize}`, [date, path, customInterval, customEntity, customEntityId, customEventType, customUserId, pageSize])

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
                                        setCustomInterval(value === "NO_FILTER" ? '' : value)
                                        if (value === "TODAY") setDate({ from: todayDate, to: todayDate })
                                        else if (value === "YESTERDAY") setDate({ from: yesterdayDate, to: yesterdayDate })
                                        else if (value === "LAST_SEVEN_DAYS") setDate({ from: todayMinus7Date, to: todayDate })
                                        else if (value === "THIS_MONTH") setDate({ from: startOfThisMonth, to: endOfThisMonth })
                                        else if (value === "LAST_MONTH") setDate({ from: startOfLastMonth, to: endOfLastMonth })
                                        else if (value === "NO_FILTER") setDate({ from: undefined, to: undefined })
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
                                        <SelectItem value="NO_FILTER">Clear Interval</SelectItem>
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
                    <div className='col-span-1 text-md flex items-center'>Entity Id</div>
                    <div className='col-span-2 flex items-center'>
                        <Input
                            placeholder="EntityId"
                            name="entityId"
                            value={customEntity}
                            onChange={(e) => setCustomEntityId(e.target.value)}
                        />
                    </div>
                </div>
                <div className='grid grid-cols-3 mt-4'>
                    <div className='col-span-1 text-md flex items-center'>Entity</div>
                    <div className='col-span-2 flex items-center'>
                        <SelectInput
                            placeholder="Campaign / Creative"
                            isClearable={true}
                            isSearchable={true}
                            name="entity"
                            value={entityOptions.filter(v => v.value === customEntity)[0]}
                            options={entityOptions}
                            onChange={(e) => setCustomEntity(e ? e.value : '')}
                        />
                    </div>
                </div>
                <div className='grid grid-cols-3 mt-4'>
                    <div className='col-span-1 text-md flex items-center'>Event Type</div>
                    <div className='col-span-2 flex items-center'>
                        <SelectInput
                            placeholder="Update / Create"
                            isClearable={true}
                            isSearchable={true}
                            name="os"
                            value={eventTypeOptions.filter(v => v.value === customEventType)[0]}
                            options={eventTypeOptions}
                            onChange={(e) => setCustomEventType(e ? e.value : '')}
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
                            name="userId"
                            value={userOptions.filter(v => v.value === customUserId)[0]}
                            options={userOptions}
                            onChange={(e) => setCustomUserId(e ? e.value : '')}
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
