"use client"

import { HoveredLink, Menu, MenuItem } from '@/components/ui/navbar-menu'
import { LayoutDashboard } from 'lucide-react'
import React, { useState } from 'react'
import DashboardSheet from './DashboardSheet'
import { useSearchParams } from 'next/navigation'

export default function DashboardHeaders({ interval }: { interval: string }) {
    const searchParams = useSearchParams()
    const uri = searchParams.has('reportType') ? `/dashboard?reportType=${searchParams.get('reportType')}&interval=` : `/dashboard?interval=`
    const [active, setActive] = useState<string | null>(interval)

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
            <div className='font-bold flex items-center text-2xl'>
                <LayoutDashboard size={20} className='mr-1' /> Dashboard
            </div>

            <div>
                <Menu setActive={setActive} className='px-0'>
                    <MenuItem setActive={setActive} active={active} item={item}>
                        <div className="flex flex-col space-y-4 text-sm">
                            <HoveredLink href={`${uri}TODAY`}>
                                <div className='flex items-center'>
                                    Today
                                </div>
                            </HoveredLink>
                            <HoveredLink href={`${uri}YESTERDAY`}>
                                <div className='flex items-center'>
                                    Yesterday
                                </div>
                            </HoveredLink>
                            <HoveredLink href={`${uri}LAST_SEVEN_DAYS`}>
                                <div className='flex items-center'>
                                    Last 7 days
                                </div>
                            </HoveredLink>
                            <HoveredLink href={`${uri}THIS_MONTH`}>
                                <div className='flex items-center'>
                                    This Month
                                </div>
                            </HoveredLink>
                            <HoveredLink href={`${uri}LAST_MONTH`}>
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
