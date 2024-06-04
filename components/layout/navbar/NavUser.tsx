"use client"

import { logout } from '@/app/(public)/actions'
import { HoveredLink, Menu, MenuItem } from '@/components/ui/navbar-menu'
import { toast } from '@/components/ui/use-toast'
import ThemeToggler from '@/components/utility/customComponents/ThemeToggler'
import { History, Power, SquareCheckBig, UserRound } from 'lucide-react'
import React, { useState } from 'react'

export default function NavUser({ emailId, accountBalance }: { emailId: string, accountBalance: string }) {

    const [active, setActive] = useState<string | null>(null)

    const handleLogout = async () => {
        const result = await logout()
        toast({
            title: `Logged out successfully`,
            description: "Please login again to access dashboard."
        })
    }

    return (
        <div className="flex items-center mr-4">
            <div className='hidden'>
                <ThemeToggler />
            </div>
            {emailId !== "admin@mobavenue.com" && <div>
                <Menu setActive={setActive} className='px-0'>
                    <MenuItem setActive={setActive} active={active} item={accountBalance}>
                        <div className="flex flex-col space-y-4 text-sm">
                            <HoveredLink href="/profile/billing" prefetch={false}>
                                <div className='flex items-center'>
                                    <History size={18} className='mr-1' />Transaction history
                                </div>
                            </HoveredLink>
                        </div>
                    </MenuItem>
                </Menu>
            </div>}
            <div>
                <Menu setActive={setActive} className='px-0'>
                    <MenuItem setActive={setActive} active={active} item={emailId}>
                        <div className="flex flex-col space-y-4 text-sm">
                            <HoveredLink href="#">
                                <div className='flex items-center justify-center'>
                                    <ThemeToggler />
                                </div>
                            </HoveredLink>
                            <HoveredLink href="/profile/account-details" prefetch={false}>
                                <div className='flex items-center'>
                                    <UserRound size={18} className='mr-1' />Account Details
                                </div>
                            </HoveredLink>
                            <HoveredLink href="/profile/change-password" prefetch={false}>
                                <div className='flex items-center'>
                                    <SquareCheckBig size={18} className='mr-1' />Change Password
                                </div>
                            </HoveredLink>
                            <HoveredLink href="#" onClick={() => handleLogout()}>
                                <div className='flex items-center'>
                                    <Power size={18} className='mr-1' />Logout
                                </div>
                            </HoveredLink>
                        </div>
                    </MenuItem>
                </Menu>
            </div>
        </div>
    )
}
