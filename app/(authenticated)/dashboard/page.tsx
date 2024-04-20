import React from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { LayoutDashboard } from 'lucide-react'
import { Card } from '@/components/ui/card'

export default function pages() {
    return (
        <div>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className='font-bold my-2 text-2xl flex items-center'>
                <LayoutDashboard size={20} className='mr-1'/> Dashboard
            </div>

            <Card className=' min-h-96'>
                hdfhsdfj
            </Card>
        </div>
    )
}
