"use client"

import React, { useMemo, useState } from 'react'

import { Card, CardHeader } from '@/components/ui/card'
import DataTable, { CustomPagination, DataTableColumnHeader } from '@/components/ui/datatable'
import { ColumnDef, PaginationState, SortingState, Table as TanstackTable, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'

type ContentType = {
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

type TabularData = {
    content: ContentType[],
    totalElements: number,
    totalPages: number,
    last: boolean,
    pageNo: number,
    pageSize: number
}

type TYContentData = {
    date?: string,
    impressions?: number,
    clicks?: number,
    ctr?: number,
    installs?: number
    spends?: number,
}

const dashboardColumns: ColumnDef<ContentType, any>[] = [
    {
        accessorKey: "deliveryDate",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Date" className='justify-center' />
        )
    },
    {
        accessorKey: "advertiser",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Advertiser" className='justify-center' />
        )
    },
    {
        accessorKey: "sspUser",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="SSP" className='justify-center' />
        )
    },
    {
        accessorKey: "bids",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Bids" className='justify-center' />
        )
    },
    {
        accessorKey: "impressions",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Impressions" className='justify-center' />
        )
    },
    {
        accessorKey: "clicks",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Clicks" className='justify-center' />
        )
    },
    {
        accessorKey: "spends",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Spends" className='justify-center' />
        )
    },
    {
        accessorKey: "cost",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Costs" className='justify-center' />
        )
    },
    {
        accessorKey: "gmDollar",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="GM" className='justify-center' />
        )
    },
    {
        accessorKey: "gmPercentage",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="GM" className='justify-center' />
        )
    },
    {
        accessorKey: "winRate",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Win Rate" className='justify-center' />
        )
    },
    {
        accessorKey: "ctr",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="CTR" className='justify-center' />
        )
    },
    {
        accessorKey: "ecpm",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="eCPM" className='justify-center' />
        )
    }
]

const todayOrYesterdayColumns: ColumnDef<TYContentData, any>[] = [
    {
        accessorKey: "hour",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Hour" className='justify-center' />
        )
    },
    {
        accessorKey: "impressions",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Impressions" className='justify-center' />
        )
    },
    {
        accessorKey: "clicks",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Clicks" className='justify-center' />
        )
    },
    {
        accessorKey: "ctr",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="CTR" className='justify-center' />
        )
    },
    {
        accessorKey: "installs",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Installs" className='justify-center' />
        )
    },
    {
        accessorKey: "spends",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Spends" className='justify-center' />
        )
    },
]

export default function AdminDashboardDatatable({
    interval,
    data,
    pageNo,
    pageSize
}: {
    interval: string,
    data: TabularData,
    pageNo: number,
    pageSize: number
}) {

    const router = useRouter()
    const columns = interval === "TODAY" || interval === "YESTERDAY" ? todayOrYesterdayColumns : dashboardColumns

    const [sorting, setSorting] = useState<SortingState>([{ id: "date", desc: true }])
    const pagination = useMemo<PaginationState>(() => ({ pageIndex: pageNo, pageSize: data.pageSize }), [pageNo, pageSize])

    const table = useReactTable({
        data: data.content,
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        rowCount: data.totalElements,
        state: {
            pagination
        }
    })

    return (
        <Card className='p-6'>
            <CardHeader className='font-bold text-lg py-2 px-0'>Statistics</CardHeader>
            <DataTable table={table} columns={columns} />
            <CustomPagination
                table={table}
                goToFirstPage={() => router.push(`/admin-dashboard?pageNo=0&pageSize=${pageSize}`)}
                goToPreviousPage={() => router.push(`/admin-dashboard?pageNo=${pageNo - 1}&pageSize=${pageSize}`)}
                goToNextPage={() => router.push(`/admin-dashboard?pageNo=${pageNo + 1}&pageSize=${pageSize}`)}
                goToLastPage={() => router.push(`/admin-dashboard?pageNo=${data.totalPages - 1}&pageSize=${pageSize}`)}
                onRowNumberChange={(value) => {
                    router.push(`/admin-dashboard?pageNo=${pageNo}&pageSize=${value}`)
                }}
            />
        </Card>
    )
}