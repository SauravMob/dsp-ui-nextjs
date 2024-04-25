"use client"

import React from 'react'

import { Card, CardHeader } from '@/components/ui/card'
import DataTable, { DataTableColumnHeader, ExtendedColumnDef } from '@/components/ui/datatable'

type TabularData = {
    impressions: number,
    clicks: number,
    ctr: number,
    install: number,
    spends: number,
    date: string
}

const dashboardColumns: ExtendedColumnDef<TabularData, any>[] = [
    {
        accessorKey: "date",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Date" className='justify-center' />
        ),
        className: "text-center text-nowrap"
    },
    {
        accessorKey: "impressions",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Impressions" className='justify-center' />
        ),
        className: "text-end"
    },
    {
        accessorKey: "clicks",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Clicks" className='justify-center' />
        ),
        className: "text-end"
    },
    {
        accessorKey: "ctr",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="CTR" className='justify-center' />
        ),
        className: "text-end"
    },
    {
        accessorKey: "install",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Installs" className='justify-center' />
        ),
        className: "text-end"
    },
    {
        accessorKey: "spends",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Spends" className='justify-center' />
        ),
        className: "text-end"
    }
]

export default function DashboardDataTable<TData, TValue>({
    data
}: {
    data: TabularData[]
}) {
    return (
        <Card className='p-6'>
            <CardHeader className='font-bold text-lg py-2 px-0'>Performance by Day</CardHeader>
            <DataTable columns={dashboardColumns} data={data} />
        </Card>
    )
}