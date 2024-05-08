"use server"

import React from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { cookies } from 'next/headers'

export default async function CustomBreadCrumb(
    {
        secondItem,
        secondLink,
        thirdItem,
        thirdLink,
        fourthItem,
        fourthLink,
        fifthItem,
        fifthLink
    }: {
        secondItem: string,
        secondLink: string,
        thirdItem?: string,
        thirdLink?: string,
        fourthItem?: string,
        fourthLink?: string,
        fifthItem?: string,
        fifthLink?: string
    }
) {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href={cookies().get("roleId")?.value === '2' ? "/admin-dashboard" : "/dashboard"}>Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbLink href={secondLink}>{secondItem}</BreadcrumbLink>
                </BreadcrumbItem>
                {thirdItem && <BreadcrumbSeparator />}
                <BreadcrumbItem>
                    <BreadcrumbLink href={thirdLink}>{thirdItem}</BreadcrumbLink>
                </BreadcrumbItem>
                {fourthItem && <BreadcrumbSeparator />}
                <BreadcrumbItem>
                    <BreadcrumbLink href={fourthLink}>{fourthItem}</BreadcrumbLink>
                </BreadcrumbItem>
                {fifthItem && <BreadcrumbSeparator />}
                <BreadcrumbItem>
                    <BreadcrumbLink href={fifthLink}>{fifthItem}</BreadcrumbLink>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    )
}
