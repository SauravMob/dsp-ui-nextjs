"use client"

import { Card } from '@/components/ui/card'
import DataTable, { CustomHeader, CustomPagination } from '@/components/ui/datatable'
import { numFormatter } from '@/components/utility/utils/Utils'
import { ColumnDef, PaginationState, SortingState, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useMemo, useState } from 'react'

const columns = (isTodayOrYesterday: boolean) => {
    const data: ColumnDef<TrafficReportType, any>[] = [
        {
            accessorKey: "hour",
            id: "hour",
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
                return <div className='text-center'>{row.getValue("hour")}</div>
            }
        },
        {
            accessorKey: "deliveryDate",
            id: "deliveryDate",
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
                return <div className='text-center'>{row.getValue('deliveryDate')}</div>
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
                return <div className='text-right'>{numFormatter(row.getValue("bids"))}</div>
            }
        },
        {
            accessorKey: "impressions",
            header: ({ column }) => (
                <CustomHeader
                    column={column}
                    title="Impression"
                    className='justify-center'
                    onSortAsc={() => column.toggleSorting(false)}
                    onSortDesc={() => column.toggleSorting(true)}
                    onHide={() => column.toggleVisibility(false)}
                />
            ),
            cell: ({ row }) => {
                return <div className='text-right'>{numFormatter(row.getValue("impressions"))}</div>
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
                return <div className='text-right'>{numFormatter(row.getValue("clicks"))}</div>
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
                return <div className='text-right'>{numFormatter(row.getValue("spends"))}</div>
            }
        },
        {
            accessorKey: "cost",
            header: ({ column }) => (
                <CustomHeader
                    column={column}
                    title="Cost($)"
                    className='justify-center'
                    onSortAsc={() => column.toggleSorting(false)}
                    onSortDesc={() => column.toggleSorting(true)}
                    onHide={() => column.toggleVisibility(false)}
                />
            ),
            cell: ({ row }) => {
                return <div className='text-right'>{numFormatter(row.getValue("cost"))}</div>
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
                return <div className='text-right'>{numFormatter(row.getValue("gmDollar"))}</div>
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
                return <div className='text-right'>{numFormatter(row.getValue("gmPercentage"))}</div>
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
                return <div className='text-right'>{numFormatter(row.getValue("winRate"))}</div>
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
                return <div className='text-right'>{numFormatter(row.getValue("ctr"))}</div>
            }
        },
        {
            accessorKey: "ecpm",
            header: ({ column }) => (
                <CustomHeader
                    column={column}
                    title="eCPM"
                    className='justify-center'
                    onSortAsc={() => column.toggleSorting(false)}
                    onSortDesc={() => column.toggleSorting(true)}
                    onHide={() => column.toggleVisibility(false)}
                />
            ),
            cell: ({ row }) => {
                return <div className='text-right'>{numFormatter(row.getValue("ecpm"))}</div>
            }
        }
    ]

    return isTodayOrYesterday ? data.filter(v => v.id !== 'deliveryDate') : data.filter(v => v.id !== 'hour')
}

export default function TrafficReportDatatable({
    pageNo,
    pageSize,
    data,
    interval
}: {
    pageNo: number,
    pageSize: number
    data: TrafficReportTabularData,
    interval: string
}) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const isTodayOrYesterday = interval === "TODAY" || interval === "YESTERDAY"

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

    const pagination = useMemo<PaginationState>(() => ({ pageIndex: pageNo, pageSize: data.pageSize }), [pageNo, data.pageSize])
    const [sorting, setSorting] = useState<SortingState>(isTodayOrYesterday ? [{ id: "hour", desc: true }] : [{ id: "deliveryDate", desc: true }])

    const table = useReactTable({
        data: data.content,
        columns: columns(isTodayOrYesterday),
        getSortedRowModel: getSortedRowModel(),
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        rowCount: data.totalElements,
        onSortingChange: setSorting,
        state: { pagination, sorting }
    })

    return (
        <Card className='p-3'>
            <DataTable table={table} columns={columns(isTodayOrYesterday)} />
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
