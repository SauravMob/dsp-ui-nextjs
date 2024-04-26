"use client"

import React from 'react'

import { Card, CardHeader } from '@/components/ui/card'
import DataTable, { CustomHeader, CustomPagination } from '@/components/ui/datatable'
import { ColumnDef, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'

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
            <CustomHeader
                column={column}
                title="Date"
                className='justify-center'
                onSortAsc={() => column.toggleSorting(false)}
                onSortDesc={() => column.toggleSorting(true)}
                onHide={() => column.toggleVisibility(false)}
            />
        ),
        cell: ({ row }) => {
            return <div className='text-center text-nowrap'>{row.getValue('date')}</div>
        }
    },
    {
        accessorKey: "impressions",
        header: ({ column }) => (
            <CustomHeader
                column={column}
                title="Impressions"
                className='justify-center'
                onSortAsc={() => column.toggleSorting(false)}
                onSortDesc={() => column.toggleSorting(true)}
                onHide={() => column.toggleVisibility(false)}
            />
        ),
        cell: ({ row }) => {
            return <div className='text-end'>{row.getValue('impressions')}</div>
        }
    },
    {
        accessorKey: "clicks",
        header: ({ column }) => (
            <CustomHeader
                column={column}
                title="Clicks"
                className='justify-center'
                onSortAsc={() => column.toggleSorting(false)}
                onSortDesc={() => column.toggleSorting(true)}
                onHide={() => column.toggleVisibility(false)}
            />
        ),
        cell: ({ row }) => {
            return <div className='text-end'>{row.getValue('clicks')}</div>
        }
    },
    {
        accessorKey: "ctr",
        header: ({ column }) => (
            <CustomHeader
                column={column}
                title="CTR"
                className='justify-center'
                onSortAsc={() => column.toggleSorting(false)}
                onSortDesc={() => column.toggleSorting(true)}
                onHide={() => column.toggleVisibility(false)}
            />
        ),
        cell: ({ row }) => {
            return <div className='text-end'>{row.getValue('ctr')}</div>
        }
    },
    {
        accessorKey: "install",
        header: ({ column }) => (
            <CustomHeader
                column={column}
                title="Installs"
                className='justify-center'
                onSortAsc={() => column.toggleSorting(false)}
                onSortDesc={() => column.toggleSorting(true)}
                onHide={() => column.toggleVisibility(false)}
            />
        ),
        cell: ({ row }) => {
            return <div className='text-end'>{row.getValue('install')}</div>
        }
    },
    {
        accessorKey: "spends",
        header: ({ column }) => (
            <CustomHeader
                column={column}
                title="Spends"
                className='justify-center'
                onSortAsc={() => column.toggleSorting(false)}
                onSortDesc={() => column.toggleSorting(true)}
                onHide={() => column.toggleVisibility(false)}
            />
        ),
        cell: ({ row }) => {
            return <div className='text-end'>{row.getValue('spends')}</div>
        }
    }
]

export default function DashboardDataTable<TData, TValue>({
    data
}: {
    data: TabularData[]
}) {

    const table = useReactTable({
        data,
        columns: dashboardColumns,
        getSortedRowModel: getSortedRowModel(),
        getCoreRowModel: getCoreRowModel()
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