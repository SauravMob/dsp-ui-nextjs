"use client"

import { HoveredLink, Menu, MenuItem } from '@/components/ui/navbar-menu'
import { LayoutDashboard } from 'lucide-react'
import React, { useCallback, useState } from 'react'
import DashboardSheet from './DashboardSheet'
import { usePathname, useSearchParams } from 'next/navigation'

export default function DashboardHeaders({ interval }: { interval: string }) {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [active, setActive] = useState<string | null>(interval)

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.delete('from')
            params.delete('to')
            if (value) params.set(name, value)
            else params.delete(name)
            return params.toString()
        },
        [searchParams]
    )

    const item = (() => {
        switch (interval) {
            case "TODAY":
                return "Today"
            case "YESTERDAY":
                return "Yesterday"
            case "LAST_SEVEN_DAYS":
                return "Last 7 days"
            case "THIS_MONTH":
                return "This Month"
            case "LAST_MONTH":
                return "Last Month"
            case "CUSTOM":
                return "Custom"
            default:
                return "default"
        }
    })()

    return (
        <div className='mb-4 flex justify-between'>
            <div className='font-bold flex items-center text-xl'>
                <LayoutDashboard size={26} className='mr-1' /> Dashboard
            </div>

            <div>
                <Menu setActive={setActive} className='px-0'>
                    <MenuItem setActive={setActive} active={active} item={item}>
                        <div className="flex flex-col space-y-4 text-sm">
                            <HoveredLink href={`${pathname}?${createQueryString('interval', 'TODAY')}`}>
                                <div className='flex items-center'>
                                    Today
                                </div>
                            </HoveredLink>
                            <HoveredLink href={`${pathname}?${createQueryString('interval', "YESTERDAY")}`}>
                                <div className='flex items-center'>
                                    Yesterday
                                </div>
                            </HoveredLink>
                            <HoveredLink href={`${pathname}?${createQueryString('interval', "LAST_SEVEN_DAYS")}`}>
                                <div className='flex items-center'>
                                    Last 7 days
                                </div>
                            </HoveredLink>
                            <HoveredLink href={`${pathname}?${createQueryString('interval', "THIS_MONTH")}`}>
                                <div className='flex items-center'>
                                    This Month
                                </div>
                            </HoveredLink>
                            <HoveredLink href={`${pathname}?${createQueryString('interval', "LAST_MONTH")}`}>
                                <div className='flex items-center'>
                                    Last Month
                                </div>
                            </HoveredLink>
                            <HoveredLink href="#">
                                <div className='flex items-center'>
                                    <DashboardSheet />
                                </div>
                            </HoveredLink>
                        </div>
                    </MenuItem>
                </Menu>
            </div>
        </div>
    )
}
