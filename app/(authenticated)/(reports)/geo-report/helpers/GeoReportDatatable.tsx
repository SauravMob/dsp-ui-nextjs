"use client"

import { Card } from '@/components/ui/card'
import DataTable, { CustomHeader, CustomPagination } from '@/components/ui/datatable'
import { TableCell, TableFooter, TableRow } from '@/components/ui/table'
import { numFormatter } from '@/components/utility/utils/Utils'
import { ColumnDef, PaginationState, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useMemo } from 'react'

const columns: ColumnDef<GeoReportType, any>[] = [
    {
        accessorKey: "geo",
        header: ({ column }) => (
            <CustomHeader
                column={column}
                title="Geo"
                className='justify-center'
            />
        ),
        enableSorting: false,
        cell: ({ row }) => {
            return <div className='text-center text-nowrap'>{row.getValue('geo')}</div>
        }
    },
    {
        accessorKey: "campaignName",
        header: ({ column }) => (
            <CustomHeader
                column={column}
                title="Campaign"
                className='justify-center text-nowrap'
            />
        ),
        enableSorting: false,
        cell: ({ row }) => {
            return <div className='text-start'>{row.getValue('campaignName')}</div>
        }
    },
    {
        accessorKey: "supplyType",
        header: ({ column }) => (
            <CustomHeader
                column={column}
                title="SSP"
                className='justify-center text-nowrap'
            />
        ),
        enableSorting: false,
        cell: ({ row }) => {
            return <div className='text-start'>{row.getValue('supplyType')}</div>
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
            return <div className='text-right'>{row.getValue("ctr")}</div>
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
            return <div className='text-right'>{row.getValue("ecpm")}</div>
        }
    }
]

export default function GeoReportDatatable({
    pageNo,
    pageSize,
    data
}: {
    pageNo: number,
    pageSize: number,
    data: GeoReportTabularData
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

    const pagination = useMemo<PaginationState>(() => ({ pageIndex: pageNo, pageSize: data.pageSize }), [pageNo, data.pageSize])

    const table = useReactTable({
        data: data.content,
        columns,
        getSortedRowModel: getSortedRowModel(),
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        rowCount: data.totalElements,
        state: { pagination }
    })

    const TableFooterProps = () => {
        return (
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={3}>Total</TableCell>
                    <TableCell className="text-right">{numFormatter(data.content.reduce((bids, item) => bids + item.bids, 0))}</TableCell>
                    <TableCell className="text-right">{numFormatter(data.content.reduce((impressions, item) => impressions + item.impressions, 0))}</TableCell>
                    <TableCell className="text-right">{numFormatter(data.content.reduce((clicks, item) => clicks + item.clicks, 0))}</TableCell>
                    <TableCell className="text-right">{numFormatter(data.content.reduce((spends, item) => spends + item.spends, 0))}</TableCell>
                </TableRow>
            </TableFooter>
        )
    }

    return (
        <Card className='p-3'>
            <DataTable table={table} columns={columns} TableFooterProps={TableFooterProps} />
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
