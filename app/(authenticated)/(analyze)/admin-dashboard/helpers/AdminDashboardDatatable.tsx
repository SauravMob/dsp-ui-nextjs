"use client"

import React from 'react'

import { Card, CardHeader } from '@/components/ui/card'
import DataTable, { DataTableColumnHeader, ExtendedColumnDef } from '@/components/ui/datatable'

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

const dashboardColumns: ExtendedColumnDef<TabularData, any>[] = [
    {
        accessorKey: "deliveryDate",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Date" className='justify-center' />
        ),
        className: "text-center text-nowrap"
    },
    {
        accessorKey: "advertiser",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Advertiser" className='justify-center' />
        ),
        className: "text-center"
    },
    {
        accessorKey: "sspUser",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="SSP" className='justify-center' />
        ),
        className: "text-center"
    },
    {
        accessorKey: "bids",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Bids" className='justify-center' />
        ),
        className: "text-end"
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
        accessorKey: "spends",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Spends" className='justify-center' />
        ),
        className: "text-end"
    },
    {
        accessorKey: "cost",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Costs" className='justify-center' />
        ),
        className: "text-end"
    },
    {
        accessorKey: "gmDollar",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="GM" className='justify-center' />
        ),
        className: "text-end"
    },
    {
        accessorKey: "gmPercentage",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="GM" className='justify-center' />
        ),
        className: "text-end"
    },
    {
        accessorKey: "winRate",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Win Rate" className='justify-center' />
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
        accessorKey: "ecpm",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="eCPM" className='justify-center' />
        ),
        className: "text-end"
    }
]

const todayOrYesterdayColumns: ExtendedColumnDef<TabularDataTodayOrYesterday, any>[] = [
    {
        accessorKey: "hour",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Hour" className='justify-center' />
        ),
        className: "text-nowrap text-center"
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
        accessorKey: "installs",
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
