"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Mobavenue_Logo from '@/public/Mobavenue_Logo.svg'
import ThemeToggler from "./ThemeToggler";

type NavOption = {
    title: string;
    path: string;
};

type NavItem = {
    label: string;
    options: NavOption[];
};

const mainNavList: NavItem[] = [
    {
        label: "Analyse",
        options: [
            { title: "Dashboard", path: "/" }
        ]
    },
    {
        label: "Manage",
        options: [
            { title: "Campaigns", path: "/campaigns" }
        ]
    },
    {
        label: "Assets",
        options: [
            { title: "Creatives", path: "/creatives" },
            { title: "Audiences", path: "/audiences" },
            { title: "Applists", path: "/applists" }
        ]
    },
    {
        label: "Reports",
        options: [
            { title: "Campaign Report", path: "/campaign-report" },
            { title: "Creative Report", path: "/creative-report" },
            { title: "SiteApp Report", path: "/siteapp-report" }
        ]
    },
    {
        label: "Tools",
        options: [
            { title: "Optimization", path: "/optimization" },
            { title: "Bid Multiplier", path: "/bid-multiplier" },
            { title: "Macros", path: "/macros" },
            { title: "Support", path: "/support" }
        ]
    }
]

export function Navbar({ className }: { className?: string }) {
    const [active, setActive] = useState<string | null>(null);
    return (
        <div className={cn("fixed top-10 inset-x-0 w-full mx-auto z-50", className)}>
            <nav
                className="relative boder border-transparent dark:bg-black dark:border-white/[0.2] flex items-center bg-white shadow-input "
            >
                <Image
                    className="ml-8"
                    src={Mobavenue_Logo}
                    width={120}
                    height={120}
                    alt="Mobavenue_logo"
                />
                <Menu setActive={setActive}>
                    {mainNavList.map((item: NavItem, k: number) => (
                        <MenuItem key={k} item={item.label} active={active} setActive={setActive}>
                            <div className="flex flex-col space-y-4 text-sm">
                                {item.options.map((option: NavOption, key: number) => (
                                    <HoveredLink href={option.path} key={key}>{option.title}</HoveredLink>
                                ))}
                            </div>
                        </MenuItem>
                    ))}
                </Menu>
                <div className="flex items-center mr-4">
                    <div>
                        <ThemeToggler />
                    </div>
                    <div>
                        <Menu setActive={setActive}>
                            <MenuItem setActive={setActive} active={active} item="admin@mobavenue.com">
                                <div className="flex flex-col space-y-4 text-sm">
                                    <HoveredLink href="/account-details">Account Details</HoveredLink>
                                    <HoveredLink href="/change-password">Change Password</HoveredLink>
                                    <HoveredLink href="/logout">Logout</HoveredLink>
                                </div>
                            </MenuItem>
                        </Menu>
                    </div>
                </div>
            </nav>
        </div>
    );
}
