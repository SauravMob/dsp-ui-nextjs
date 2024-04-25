"use client"

import React from 'react'

import { ColumnDef } from "@tanstack/react-table"
import { Card, CardHeader } from '@/components/ui/card'
import DataTable, { DataTableColumnHeader } from '@/components/ui/datatable'

type TabularData = {
    deliveryDate?: string,
    advertiser?: string,
    sspUser?: string,
    bids?: number,
    impressions?: number,
    clicks?: number,
    spends?: number,
    cost?: number,
    gmDollar?: number,
    gmPercentage?: number,
    winRate?: number,
    ctr?: number,
    ecpm?: number
}

type TabularDataTodayOrYesterday = {
    date?: string,
    impressions?: number,
    clicks?: number,
    ctr?: number,
    installs?: number
    spends?: number,
}

const dashboardColumns: ColumnDef<TabularData>[] = [
    {
        accessorKey: "deliveryDate",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Date" />
        )
    },
    {
        accessorKey: "advertiser",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Advertiser" />
        )
    },
    {
        accessorKey: "sspUser",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="SSP" />
        )
    },
    {
        accessorKey: "bids",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Bids" />
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
        accessorKey: "spends",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Spends" />
        )
    },
    {
        accessorKey: "cost",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Costs" />
        )
    },
    {
        accessorKey: "gmDollar",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="GM" />
        )
    },
    {
        accessorKey: "gmPercentage",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="GM" />
        )
    },
    {
        accessorKey: "winRate",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Win Rate" />
        )
    },
    {
        accessorKey: "ctr",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="CTR" />
        )
    },
    {
        accessorKey: "ecpm",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="eCPM" />
        )
    }
]

const todayOrYesterdayColumns: ColumnDef<TabularDataTodayOrYesterday>[] = [
    {
        accessorKey: "hour",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Hour" />
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
        accessorKey: "installs",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Installs" />
        )
    },
    {
        accessorKey: "spends",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Spends" />
        )
    },
]

export default function AdminDashboardDatatable({
    interval,
    data
}: {
    interval: string,
    data: TabularData[] | TabularDataTodayOrYesterday[]
}) {
    const columns = interval === "TODAY" || interval === "YESTERDAY" ? todayOrYesterdayColumns : dashboardColumns
    return (
        <Card className='p-6'>
            <CardHeader className='font-bold text-lg py-2 px-0'>Statistics</CardHeader>
            <DataTable columns={columns} data={data} />
        </Card>
    )
}
