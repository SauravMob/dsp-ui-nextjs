"use client"

import { Calendar } from '@/components/ui/calendar'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { formatQryDate, todayDate, todayMinus2Date, todayMinus3MonthsDate } from '@/components/utility/utils/Utils'
import Link from 'next/link'
import React, { useState } from 'react'

export default function DashboardSheet () {
    const [date, setDate] = useState<{
        from: Date | undefined;
        to?: Date | undefined;
    } | undefined>({ from: todayMinus2Date, to: todayDate })

    const url = date ? `/dashboard?interval=CUSTOM&from=${formatQryDate(date.from)}&to=${formatQryDate(date.to)}` : '/dashboard?interval=LAST_SEVEN_DAYS'

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
                <Link href={url}>Submit</Link>
            </div>
        </SheetContent>
    </Sheet>
}