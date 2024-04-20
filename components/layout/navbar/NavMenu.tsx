"use client"

import { HoveredLink, Menu, MenuItem } from '@/components/ui/navbar-menu';
import React, { useState } from 'react'
import { NavList } from './NavList';
import { NavOption } from './NavbarTypes';

export default function NavMenu({ roleId }: { roleId: string }) {
    const [active, setActive] = useState<string | null>(null);
    return (
        <Menu setActive={setActive}>
            {NavList(roleId).map((item, k: number) => (
                <MenuItem key={k} item={item.label} active={active} setActive={setActive}>
                    <div className="flex flex-col space-y-4 text-sm">
                        {item.options.map((option: NavOption, key: number) => (
                            <HoveredLink href={option.path} key={key}>
                                <div className='flex items-center'>
                                    {option.icon}
                                    {option.title}
                                </div>
                            </HoveredLink>
                        ))}
                    </div>
                </MenuItem>
            ))}
        </Menu>
    )
}
