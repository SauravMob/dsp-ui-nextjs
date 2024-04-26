"use client"

import React, { useCallback, useMemo } from 'react'

import { Card, CardHeader } from '@/components/ui/card'
import DataTable, { CustomHeader, CustomPagination } from '@/components/ui/datatable'
import { ColumnDef, PaginationState, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { numFormatter } from '@/components/utility/utils/Utils'

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
            return <div className='text-center text-nowrap'>{row.getValue('deliveryDate')}</div>
        }
    },
    {
        accessorKey: "advertiser",
        header: ({ column }) => (
            <CustomHeader
                column={column}
                title="Advertiser"
                className='justify-center'
                onSortAsc={() => column.toggleSorting(false)}
                onSortDesc={() => column.toggleSorting(true)}
                onHide={() => column.toggleVisibility(false)}
            />
        ),
        enableSorting: false,
        cell: ({ row }) => {
            return <div className='text-center'>{row.getValue('advertiser')}</div>
        }
    },
    {
        accessorKey: "sspUser",
        header: ({ column }) => (
            <CustomHeader
                column={column}
                title="SSP"
                className='justify-center'
                onSortAsc={() => column.toggleSorting(false)}
                onSortDesc={() => column.toggleSorting(true)}
                onHide={() => column.toggleVisibility(false)}

            />
        ),
        enableSorting: false,
        cell: ({ row }) => {
            return <div className='text-center'>{row.getValue('sspUser')}</div>
        }
    },
    {
        accessorKey: "bids",
        header: ({ column }) => (
            <CustomHeader
                column={column}
                title="Bids"
                className='justify-center'
                onSortAsc={() => column.toggleSorting(false)}
                onSortDesc={() => column.toggleSorting(true)}
                onHide={() => column.toggleVisibility(false)}

            />
        ),
        cell: ({ row }) => {
            return <div className='text-end'>{numFormatter(row.getValue('bids'))}</div>
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
            return <div className='text-end'>{numFormatter(row.getValue('impressions'))}</div>
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
            return <div className='text-end'>{numFormatter(row.getValue('clicks'))}</div>
        }
    },
    {
        accessorKey: "spends",
        header: ({ column }) => (
            <CustomHeader
                column={column}
                title="Spends($)"
                className='justify-center'
                onSortAsc={() => column.toggleSorting(false)}
                onSortDesc={() => column.toggleSorting(true)}
                onHide={() => column.toggleVisibility(false)}
            />
        ),
        cell: ({ row }) => {
            return <div className='text-end'>{numFormatter(row.getValue('spends'))}</div>
        }
    },
    {
        accessorKey: "cost",
        header: ({ column }) => (
            <CustomHeader
                column={column}
                title="Costs($)"
                className='justify-center'
                onSortAsc={() => column.toggleSorting(false)}
                onSortDesc={() => column.toggleSorting(true)}
                onHide={() => column.toggleVisibility(false)}
            />
        ),
        cell: ({ row }) => {
            return <div className='text-end'>{row.getValue('cost')}</div>
        }
    },
    {
        accessorKey: "gmDollar",
        header: ({ column }) => (
            <CustomHeader
                column={column}
                title="GM($)"
                className='justify-center'
                onSortAsc={() => column.toggleSorting(false)}
                onSortDesc={() => column.toggleSorting(true)}
                onHide={() => column.toggleVisibility(false)}
            />
        ),
        cell: ({ row }) => {
            return <div className='text-end'>{numFormatter(row.getValue('gmDollar'))}</div>
        }
    },
    {
        accessorKey: "gmPercentage",
        header: ({ column }) => (
            <CustomHeader
                column={column}
                title="GM(%)"
                className='justify-center'
                onSortAsc={() => column.toggleSorting(false)}
                onSortDesc={() => column.toggleSorting(true)}
                onHide={() => column.toggleVisibility(false)}
            />
        ),
        cell: ({ row }) => {
            return <div className='text-end'>{numFormatter(row.getValue('gmPercentage'))}</div>
        }
    },
    {
        accessorKey: "winRate",
        header: ({ column }) => (
            <CustomHeader
                column={column}
                title="Win Rate(%)"
                className='justify-center'
                onSortAsc={() => column.toggleSorting(false)}
                onSortDesc={() => column.toggleSorting(true)}
                onHide={() => column.toggleVisibility(false)}
            />
        ),
        cell: ({ row }) => {
            return <div className='text-end'>{numFormatter(row.getValue('winRate'))}</div>
        }
    },
    {
        accessorKey: "ctr",
        header: ({ column }) => (
            <CustomHeader
                column={column}
                title="CTR(%)"
                className='justify-center'
                onSortAsc={() => column.toggleSorting(false)}
                onSortDesc={() => column.toggleSorting(true)}
                onHide={() => column.toggleVisibility(false)}

            />
        ),
        cell: ({ row }) => {
            return <div className='text-end'>{numFormatter(row.getValue('ctr'))}</div>
        }
    },
    {
        accessorKey: "ecpm",
        header: ({ column }) => (
            <CustomHeader
                column={column}
                title="eCPM(%)"
                className='justify-center'
                onSortAsc={() => column.toggleSorting(false)}
                onSortDesc={() => column.toggleSorting(true)}
                onHide={() => column.toggleVisibility(false)}
            />
        ),
        cell: ({ row }) => {
            return <div className='text-end'>{numFormatter(row.getValue('ecpm'))}</div>
        }
    }
]

const todayOrYesterdayColumns: ColumnDef<TYContentData, any>[] = [
    {
        accessorKey: "hour",
        header: ({ column }) => (
            <CustomHeader
                column={column}
                title="Hour"
                className='justify-center'
                onSortAsc={() => column.toggleSorting(false)}
                onSortDesc={() => column.toggleSorting(true)}
                onHide={() => column.toggleVisibility(false)}
            />
        ),
        cell: ({ row }) => {
            return <div className='text-end'>{row.getValue('hour')}</div>
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
            return <div className='text-end'>{numFormatter(row.getValue('impressions'))}</div>
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
            return <div className='text-end'>{numFormatter(row.getValue('clicks'))}</div>
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
            return <div className='text-end'>{numFormatter(row.getValue('ctr'))}</div>
        }
    },
    {
        accessorKey: "installs",
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
            return <div className='text-end'>{numFormatter(row.getValue('installs'))}</div>
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
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)
            if (name !== "pageSize") params.set("pageSize", pageSize.toString())
            else params.set("pageNo", '0')
            return params.toString()
        },
        [searchParams, pageSize]
    )

    const columns = interval === "TODAY" || interval === "YESTERDAY" ? todayOrYesterdayColumns : dashboardColumns

    const pagination = useMemo<PaginationState>(() => ({ pageIndex: pageNo, pageSize: data.pageSize }), [pageNo, data.pageSize])

    const table = useReactTable({
        data: data.content,
        columns,
        getSortedRowModel: getSortedRowModel(),
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
                goToFirstPage={() => router.push(`${pathname}?${createQueryString('pageNo', '0')}`)}
                goToPreviousPage={() => router.push(`${pathname}?${createQueryString('pageNo', (pageNo - 1).toString())}`)}
                goToNextPage={() => router.push(`${pathname}?${createQueryString('pageNo', (pageNo + 1).toString())}`)}
                goToLastPage={() => router.push(`${pathname}?${createQueryString('pageNo', (data.totalPages - 1).toString())}`)}
                onRowNumberChange={(value) => router.push(`${pathname}?${createQueryString('pageSize', value)}`)}
            />
        </Card>
    )
}