"use client"

import React from 'react'

import { Card, CardHeader } from '@/components/ui/card'
import DataTable, { CustomPagination, DataTableColumnHeader } from '@/components/ui/datatable'
import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table'

type TabularData = {
    impressions: number,
    clicks: number,
    ctr: number,
    install: number,
    spends: number,
    date: string
}

const dashboardColumns: ColumnDef<TabularData, any>[] = [
    {
        accessorKey: "date",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Date" className='justify-center' />
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
        accessorKey: "install",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Installs" className='justify-center' />
        )
    },
    {
        accessorKey: "spends",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Spends" className='justify-center' />
        )
    }
]

export default function DashboardDataTable<TData, TValue>({
    data
}: {
    data: TabularData[]
}) {

    const table = useReactTable({
        data: data,
        columns: dashboardColumns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <Card className='p-6'>
            <CardHeader className='font-bold text-lg py-2 px-0'>Performance by Day</CardHeader>
            <DataTable columns={dashboardColumns} table={table} />
            <CustomPagination
                table={table}
                goToFirstPage={() => table.setPageIndex(0)}
                goToPreviousPage={() => table.previousPage()}
                goToNextPage={() => table.nextPage()}
                goToLastPage={() => table.setPageIndex(table.getPageCount() - 1)}
                onRowNumberChange={(value) => {
                    table.setPageSize(Number(value))
                }}
            />
        </Card>
    )
}