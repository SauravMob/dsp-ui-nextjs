import { LayoutDashboard } from 'lucide-react'
import React from 'react'

export default function AdminDashboardHeader() {
  return (
    <div className='mb-4 flex justify-between'>
            <div className='font-bold flex items-center text-2xl'>
                <LayoutDashboard size={20} className='mr-1' /> Admin Dashboard
            </div>

            <div>
                {/* <Menu setActive={setActive} className='px-0'>
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
                </Menu> */}
            </div>
        </div>
  )
}
