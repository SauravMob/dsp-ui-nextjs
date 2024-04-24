"use client"

import React from 'react'

import { ColumnDef } from "@tanstack/react-table"
import { Card, CardHeader } from '@/components/ui/card'
import DataTable, { DataTableColumnHeader } from '@/components/ui/datatable'

type TabularData = {
    impressions: number,
    clicks: number,
    ctr: number,
    install: number,
    spends: number,
    date: string
}

const dashboardColumns: ColumnDef<TabularData>[] = [
    {
        accessorKey: "date",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Date" />
        )
    },
    {
        accessorKey: "impressions",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Impressions" />
        )
    },
    {
        accessorKey: "clicks",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Clicks" />
        )
    },
    {
        accessorKey: "ctr",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="CTR" />
        )
    },
    {
        accessorKey: "install",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Installs" />
        )
    },
    {
        accessorKey: "spends",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Spends" />
        )
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