"use client"

import { Card } from '@/components/ui/card'
import DataTable, { CustomHeader, CustomPagination } from '@/components/ui/datatable'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { TableCell, TableFooter, TableRow } from '@/components/ui/table'
import { numFormatter } from '@/components/utility/utils/Utils'
import { ColumnDef, PaginationState, SortingState, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import { DollarSign, Ellipsis } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useMemo, useState } from 'react'
import AttachApplist from './AttachApplist'

const columns = (isCumulative: boolean, hasVideoCompletion: boolean, hasBidMultiplier: boolean, existingBids: number[], sspIsAllowed: boolean | undefined, onSort: (newValue: SortingState) => void) => {
    const data: ColumnDef<SiteAppReportType, any>[] = [
        {
            accessorKey: "",
            id: "edit",
            enableSorting: false,
            cell: ({ row }) => {
                const bidMultiplierCheck = existingBids.includes(row.original.campaignId)
                return <div className='text-center w-7'>
                    <Popover>
                        <PopoverTrigger asChild className='flex justify-center cursor-pointer'>
                            <div className='border rounded-md p-1'><Ellipsis size={18} /></div>
                        </PopoverTrigger>
                        <PopoverContent className='p-2 flex flex-col'>
                            <AttachApplist siteApp={row.original} />
                            {hasBidMultiplier && <Link href={bidMultiplierCheck ? `/bid-multiplier/edit/${row.original.campaignId}/${row.original.sspName}/${row.original.bundleId}` : `/bid-multiplier/create/${row.original.campaignId}/${row.original.sspName}/${row.original.bundleId}`} className='flex items-center justify-start px-3 py-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800'>
                                <DollarSign size={18} className='mr-2' />{bidMultiplierCheck ? 'Edit' : 'Create'} Bid Multiplier
                            </Link>}
                        </PopoverContent>
                    </Popover>
                </div>
            }
        },
        {
            accessorKey: "date",
            id: "date",
            header: ({ column }) => (
                <CustomHeader
                    column={column}
                    title="Date"
                    className='justify-center'
                    onSortAsc={() => onSort([{ id: 'date', desc: false }])}
                    onSortDesc={() => onSort([{ id: 'date', desc: true }])}
                    onHide={() => column.toggleVisibility(false)}
                />
            ),
            cell: ({ row }) => {
                return <div className='text-center text-nowrap'>{row.getValue('date')}</div>
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
            accessorKey: "creativeName",
            header: ({ column }) => (
                <CustomHeader
                    column={column}
                    title="Creative Name"
                    className='justify-center text-nowrap'
                />
            ),
            enableSorting: false,
            cell: ({ row }) => {
                return <div className='text-start'>{row.getValue('creativeName')}</div>
            }
        },
        {
            accessorKey: "sspName",
            id: "sspName",
            header: ({ column }) => (
                <CustomHeader
                    column={column}
                    title="SSP"
                    className='justify-center text-nowrap'
                />
            ),
            enableSorting: false,
            cell: ({ row }) => {
                return <div className='text-start'>{row.getValue('sspName')}</div>
            }
        },
        {
            accessorKey: "siteAppName",
            header: ({ column }) => (
                <CustomHeader
                    column={column}
                    title="SiteApp"
                    className='justify-center text-nowrap'
                />
            ),
            enableSorting: false,
            cell: ({ row }) => {
                return <div className='text-start'>{row.getValue('siteAppName')}</div>
            }
        },
        {
            accessorKey: "bundleId",
            header: ({ column }) => (
                <CustomHeader
                    column={column}
                    title="Bundle"
                    className='justify-center text-nowrap'
                />
            ),
            enableSorting: false,
            cell: ({ row }) => {
                return <div className='text-start'>{row.getValue('bundleId')}</div>
            }
        },
        {
            accessorKey: "bids",
            header: ({ column }) => (
                <CustomHeader
                    column={column}
                    title="Bids"
                    className='justify-center'
                    onSortAsc={() => onSort([{ id: 'bids', desc: false }])}
                    onSortDesc={() => onSort([{ id: 'bids', desc: true }])}
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
                    onSortAsc={() => onSort([{ id: 'impressions', desc: false }])}
                    onSortDesc={() => onSort([{ id: 'impressions', desc: true }])}
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
                    onSortAsc={() => onSort([{ id: 'clicks', desc: false }])}
                    onSortDesc={() => onSort([{ id: 'clicks', desc: true }])}
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
                    onSortAsc={() => onSort([{ id: 'spends', desc: false }])}
                    onSortDesc={() => onSort([{ id: 'spends', desc: true }])}
                    onHide={() => column.toggleVisibility(false)}
                />
            ),
            cell: ({ row }) => {
                return <div className='text-right'>{numFormatter(row.getValue("spends"))}</div>
            }
        },
        {
            accessorKey: "conversions",
            header: ({ column }) => (
                <CustomHeader
                    column={column}
                    title="Installs"
                    className='justify-center'
                    onSortAsc={() => onSort([{ id: 'conversions', desc: false }])}
                    onSortDesc={() => onSort([{ id: 'conversions', desc: true }])}
                    onHide={() => column.toggleVisibility(false)}
                />
            ),
            cell: ({ row }) => {
                return <div className='text-right'>{numFormatter(row.getValue("conversions"))}</div>
            }
        },
        {
            accessorKey: "videoCompletion",
            header: ({ column }) => (
                <CustomHeader
                    column={column}
                    title="Video Completion"
                    className='justify-center text-nowrap'
                />
            ),
            enableSorting: false,
            cell: ({ row }) => {
                return <div className='text-right'>{numFormatter(row.getValue("videoCompletion"))}</div>
            }
        },
        {
            accessorKey: "purchaseConversions",
            header: ({ column }) => (
                <CustomHeader
                    column={column}
                    title="Purchase Events"
                    className='justify-center'
                    onSortAsc={() => onSort([{ id: 'purchaseConversions', desc: false }])}
                    onSortDesc={() => onSort([{ id: 'purchaseConversions', desc: true }])}
                    onHide={() => column.toggleVisibility(false)}
                />
            ),
            cell: ({ row }) => {
                return <div className='text-right'>{row.getValue("purchaseConversions")}</div>
            }
        },
        {
            accessorKey: "repeatEventConversions",
            header: ({ column }) => (
                <CustomHeader
                    column={column}
                    title="Repeat Events"
                    className='justify-center'
                    onSortAsc={() => onSort([{ id: 'repeatEventConversions', desc: false }])}
                    onSortDesc={() => onSort([{ id: 'repeatEventConversions', desc: true }])}
                    onHide={() => column.toggleVisibility(false)}
                />
            ),
            cell: ({ row }) => {
                return <div className='text-right'>{row.getValue("repeatEventConversions")}</div>
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
        }
    ]

    const videoCompletionFilter = hasVideoCompletion ? data : data.filter(v => v.id !== 'videoCompletion')
    const sspFiltered = sspIsAllowed ? videoCompletionFilter : videoCompletionFilter.filter(v => v.id !== 'sspName')
    return isCumulative ? sspFiltered.filter(v => v.id !== 'date') : sspFiltered
}

export default function SiteappDatatable({
    pageNo,
    pageSize,
    data,
    reportType,
    existingBids,
    customFeatures,
    sspIsAllowed
}: {
    pageNo: number
    pageSize: number
    reportType: string
    customFeatures: string
    existingBids: number[]
    sspIsAllowed: boolean | undefined
    data: SiteAppReportTabularData
}) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const hasVideoCompletion = customFeatures.split(',').includes('VIDEO TRACKING')
    const hasBidMultiplier = customFeatures.split(',').includes('BID MULTIPLIER')
    const isCumulative = reportType === 'CUMULATIVE'

    const [sorting, setSorting] = useState<SortingState>([{ id: "date", desc: true }])

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

    const onSort = (sortState: SortingState) => {
        setSorting(sortState)
        const params = new URLSearchParams(searchParams.toString())
        params.set('pageNo', '0')
        params.set('sortBy', sortState[0].id)
        params.set('sortDirection', sortState[0].desc ? 'DESC' : 'ASC')
        router.push(`${pathname}?${params}`)
    }

    const table = useReactTable({
        data: data.content,
        columns: columns(isCumulative, hasVideoCompletion, hasBidMultiplier, existingBids, sspIsAllowed, onSort),
        getSortedRowModel: getSortedRowModel(),
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        manualSorting: true,
        rowCount: data.totalElements,
        state: { pagination, sorting }
    })

    const TableFooterProps = () => {
        return (
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={7}>Total</TableCell>
                    <TableCell className="text-right">{numFormatter(data.content.reduce((bids, item) => bids + item.bids, 0))}</TableCell>
                    <TableCell className="text-right">{numFormatter(data.content.reduce((impressions, item) => impressions + item.impressions, 0))}</TableCell>
                    <TableCell className="text-right">{numFormatter(data.content.reduce((clicks, item) => clicks + item.clicks, 0))}</TableCell>
                    <TableCell className="text-right">{numFormatter(data.content.reduce((spends, item) => spends + item.spends, 0))}</TableCell>
                    <TableCell className="text-right">{numFormatter(data.content.reduce((conversions, item) => conversions + item.conversions, 0))}</TableCell>
                </TableRow>
            </TableFooter>
        )
    }

    return (
        <Card className='p-3'>
            <DataTable table={table} columns={columns(isCumulative, hasVideoCompletion, hasBidMultiplier, existingBids, sspIsAllowed, onSort)} TableFooterProps={TableFooterProps} />
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
