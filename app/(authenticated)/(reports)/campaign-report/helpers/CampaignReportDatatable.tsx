"use client"

import { Card } from '@/components/ui/card'
import DataTable, { CustomHeader, CustomPagination } from '@/components/ui/datatable'
import { TableCell, TableFooter, TableRow } from '@/components/ui/table'
import { numFormatter } from '@/components/utility/utils/Utils'
import { ColumnDef, PaginationState, SortingState, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useMemo, useState } from 'react'

const columns: ColumnDef<CampaignReportType, any>[] = [
    {
        accessorKey: "date",
        id: "date",
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
            return <div className='text-center'>{row.getValue('date')}</div>
        }
    },
    {
        accessorKey: "campaignId",
        header: ({ column }) => (
            <CustomHeader
                column={column}
                title="ID"
                className='justify-center'
                onSortAsc={() => column.toggleSorting(false)}
                onSortDesc={() => column.toggleSorting(true)}
                onHide={() => column.toggleVisibility(false)}
            />
        ),
        cell: ({ row }) => {
            return <div className='text-end'>{row.getValue('campaignId')}</div>
        }
    },
    {
        accessorKey: "campaignName",
        header: ({ column }) => (
            <CustomHeader
                column={column}
                title="Campaign Name"
                className='justify-center text-nowrap'
            />
        ),
        enableSorting: false,
        cell: ({ row }) => {
            return <div className='text-start'>{row.getValue('campaignName')}</div>
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
        accessorKey: "converions",
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
            return <div className='text-right'>{numFormatter(row.getValue("converions"))}</div>
        }
    },
    {
        accessorKey: "purchaseConversions",
        header: ({ column }) => (
            <CustomHeader
                column={column}
                title="Purchase Events"
                className='justify-center'
                onSortAsc={() => column.toggleSorting(false)}
                onSortDesc={() => column.toggleSorting(true)}
                onHide={() => column.toggleVisibility(false)}
            />
        ),
        cell: ({ row }) => {
            return <div className='text-right'>{row.getValue("purchaseConversions")}</div>
        }
    },
    {
        accessorKey: "registrationConversions",
        header: ({ column }) => (
            <CustomHeader
                column={column}
                title="Registration Events"
                className='justify-center'
                onSortAsc={() => column.toggleSorting(false)}
                onSortDesc={() => column.toggleSorting(true)}
                onHide={() => column.toggleVisibility(false)}
            />
        ),
        cell: ({ row }) => {
            return <div className='text-right'>{row.getValue("registrationConversions")}</div>
        }
    },
    {
        accessorKey: "repeatEventConversions",
        header: ({ column }) => (
            <CustomHeader
                column={column}
                title="Repeat Events"
                className='justify-center'
                onSortAsc={() => column.toggleSorting(false)}
                onSortDesc={() => column.toggleSorting(true)}
                onHide={() => column.toggleVisibility(false)}
            />
        ),
        cell: ({ row }) => {
            return <div className='text-right'>{row.getValue("repeatEventConversions")}</div>
        }
    },
    {
        accessorKey: "winRate",
        header: ({ column }) => (
            <CustomHeader
                column={column}
                title="Win Rate"
                className='justify-center text-nowrap'
            />
        ),
        enableSorting: false,
        cell: ({ row }) => {
            return <div className='text-right'>{row.getValue("winRate")}</div>
        }
    },
    {
        accessorKey: "dailyBudget",
        header: ({ column }) => (
            <CustomHeader
                column={column}
                title="Daily Cap($)"
                className='justify-center text-nowrap'
            />
        ),
        enableSorting: false,
        cell: ({ row }) => {
            return <div className='text-right'>{row.getValue("dailyBudget")}</div>
        }
    },
    {
        accessorKey: "ctr",
        header: ({ column }) => (
            <CustomHeader
                column={column}
                title="CTR(%)"
                className='justify-center'
            />
        ),
        enableSorting: false,
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
            />
        ),
        enableSorting: false,
        cell: ({ row }) => {
            return <div className='text-right'>{row.getValue("ecpm")}</div>
        }
    }
]

export default function CampaignReportDatatable({
    pageNo,
    pageSize,
    data
}: {
    pageNo: number,
    pageSize: number
    data: CampaignReportTabularData
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
    const [sorting, setSorting] = useState<SortingState>([{ id: "date", desc: true }])

    const table = useReactTable({
        data: data.content,
        columns,
        getSortedRowModel: getSortedRowModel(),
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        rowCount: data.totalElements,
        onSortingChange: setSorting,
        state: { pagination, sorting }
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
                    <TableCell className="text-right">{numFormatter(data.content.reduce((converions, item) => converions + item.converions, 0))}</TableCell>
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
