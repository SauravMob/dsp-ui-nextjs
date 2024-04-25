"use client"

import { Calendar } from '@/components/ui/calendar'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { formatQryDate, todayDate, todayMinus2Date, todayMinus3MonthsDate } from '@/components/utility/utils/Utils'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import React, { useCallback, useState } from 'react'

export default function DashboardSheet() {
    const [date, setDate] = useState<{
        from: Date | undefined;
        to?: Date | undefined;
    } | undefined>({ from: todayMinus2Date, to: todayDate })

    const pathname = usePathname()
    const searchParams = useSearchParams()

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            if (value) params.set(name, value)
            else params.delete(name)
            return params.toString()
        },
        [searchParams]
    )

    return <Sheet>
        <SheetTrigger>
            Custom
        </SheetTrigger>
        <SheetContent className="w-[400px] sm:w-[540px]">
            <div className='flex justify-center my-3 text-lg'>Please Select the date</div>
            <div className='flex justify-center'>
                <Calendar
                    mode="range"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                    fromMonth={todayMinus3MonthsDate}
                    toMonth={todayDate}
                />
            </div>
            <div className='flex justify-center my-3'>
                <Link href={pathname + '?' + [
                    createQueryString('interval', date ? 'CUSTOM' : 'LAST_SEVEN_DAYS'),
                    date ? `from=${formatQryDate(date.from)}` : '',
                    date ? `to=${formatQryDate(date.to)}` : ''
                ].filter(Boolean).join('&')}>Submit</Link>
            </div>
        </SheetContent>
    </Sheet>
}