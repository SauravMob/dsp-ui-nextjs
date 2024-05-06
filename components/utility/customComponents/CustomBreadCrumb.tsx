import React from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"

export default function CustomBreadCrumb(
    {
        secondItem,
        secondLink,
        thirdItem,
        thirdLink
    }: {
        secondItem: string,
        secondLink: string,
        thirdItem?: string,
        thirdLink?: string
    }
) {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbLink href={secondLink}>{secondItem}</BreadcrumbLink>
                </BreadcrumbItem>
                {thirdItem && <BreadcrumbSeparator />}
                <BreadcrumbItem>
                    <BreadcrumbLink href={thirdLink}>{thirdItem}</BreadcrumbLink>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    )
}
