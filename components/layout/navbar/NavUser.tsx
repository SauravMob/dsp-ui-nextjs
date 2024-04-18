"use client"

import { logout } from '@/app/(auth)/_actions';
import { HoveredLink, Menu, MenuItem } from '@/components/ui/navbar-menu';
import ThemeToggler from '@/components/utility/ThemeToggler';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

export default function NavUser({ emailId }: { emailId: string }) {

    const router = useRouter()
    const [active, setActive] = useState<string | null>(null);

    const handleLogout = async () => {
        const result = await logout()
        if (result.status === 200) router.push('/login')
    }

    return (
        <div className="flex items-center mr-4">
            <div>
                <ThemeToggler />
            </div>
            <div>
                <Menu setActive={setActive}>
                    <MenuItem setActive={setActive} active={active} item={emailId}>
                        <div className="flex flex-col space-y-4 text-sm">
                            <HoveredLink href="/account-details">Account Details</HoveredLink>
                            <HoveredLink href="/change-password">Change Password</HoveredLink>
                            <HoveredLink href="#" onClick={() => handleLogout()}>Logout</HoveredLink>
                        </div>
                    </MenuItem>
                </Menu>
            </div>
        </div>
    )
}