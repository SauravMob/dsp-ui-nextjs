"use client"

import { Button } from '@/components/ui/button'
import { Card, CardHeader } from '@/components/ui/card'
import DataTable, { CustomHeader, CustomPagination } from '@/components/ui/datatable'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Progress } from '@/components/ui/progress'
import { getStatusAvatar, handleStatus } from '@/components/utility/utils/JSXUtils'
import { formatNumbers, getDateForPosix, getUpdateStatus } from '@/components/utility/utils/Utils'
import { ColumnDef, PaginationState, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import { Copy, Edit, Ellipsis, PieChart, Trash, Trash2 } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useMemo } from 'react'

const columns: ColumnDef<CampaignType, any>[] = [
    {
        accessorKey: "",
        id: "edit",
        enableSorting: false,
        cell: ({ row }) => {
            return <div className='text-center w-7'>
                {row.getValue("status") === "DELETE" ? <>
                    <Trash2 />
                </> : <>
                    <Popover>
                        <PopoverTrigger asChild className='flex justify-center cursor-pointer'>
                            <div className='border rounded-md p-1'><Ellipsis size={18} /></div>
                        </PopoverTrigger>
                        <PopoverContent className='p-2 flex flex-col'>
                            <Button variant="ghost" size="sm" className='justify-start'><Edit size={18} className='mr-2' />Edit</Button>
                            <Button variant="ghost" size="sm" className='justify-start'><Copy size={18} className='mr-2' />Clone</Button>
                            <Button variant="ghost" size="sm" className='justify-start'>{handleStatus(row.getValue("status"))}{getUpdateStatus(row.getValue("status"))}</Button>
                            <Button variant="ghost" size="sm" className='justify-start'><Trash size={18} className='mr-2' />Delete</Button>
                            <Button variant="ghost" size="sm" className='justify-start'><PieChart size={18} className='mr-2' />View Report</Button>
                        </PopoverContent>
                    </Popover>
                </>}
            </div>
        }
    },
    {
        accessorKey: "id",
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
            return <div className='text-end'>{row.getValue("id")}</div>
        }
    },
    {
        accessorKey: "campaignName",
        header: ({ column }) => (
            <CustomHeader
                column={column}
                title="Campaign Name"
                className='justify-center'
                onSortAsc={() => column.toggleSorting(false)}
                onSortDesc={() => column.toggleSorting(true)}
                onHide={() => column.toggleVisibility(false)}
            />
        ),
        enableSorting: false,
        cell: ({ row }) => {
            return <div className='text-start'>{row.getValue('campaignName')}</div>
        }
    },
    {
        accessorKey: "brandName",
        header: ({ column }) => (
            <CustomHeader
                column={column}
                title="Brands"
                className='justify-center'
                onSortAsc={() => column.toggleSorting(false)}
                onSortDesc={() => column.toggleSorting(true)}
                onHide={() => column.toggleVisibility(false)}
            />
        ),
        enableSorting: false,
        cell: ({ row }) => {
            return <div className='text-start'>{row.getValue('brandName')}</div>
        }
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <CustomHeader
                column={column}
                title="Status"
                className='justify-center'
                onSortAsc={() => column.toggleSorting(false)}
                onSortDesc={() => column.toggleSorting(true)}
                onHide={() => column.toggleVisibility(false)}
            />
        ),
        enableSorting: false,
        cell: ({ row }) => {
            const isExpired = row.getValue("endDate") as number < Math.floor(new Date().getTime() / 1000)
            return <div className='text-center'>{getStatusAvatar(isExpired ? "EXPIRED" : row.getValue("status"))}</div>
        }
    },
    {
        accessorKey: "startDate",
        header: ({ column }) => (
            <CustomHeader
                column={column}
                title="Start At"
                className='justify-center'
                onSortAsc={() => column.toggleSorting(false)}
                onSortDesc={() => column.toggleSorting(true)}
                onHide={() => column.toggleVisibility(false)}
            />
        ),
        cell: ({ row }) => {
            return <div className='text-center'>{getDateForPosix(row.getValue('startDate'), "SECONDS")}</div>
        }
    },
    {
        accessorKey: "endDate",
        header: ({ column }) => (
            <CustomHeader
                column={column}
                title="End At"
                className='justify-center'
                onSortAsc={() => column.toggleSorting(false)}
                onSortDesc={() => column.toggleSorting(true)}
                onHide={() => column.toggleVisibility(false)}
            />
        ),
        cell: ({ row }) => {
            return <div className='text-center'>{getDateForPosix(row.getValue('endDate'), "SECONDS")}</div>
        }
    },
    {
        accessorKey: "maxBudget",
        header: ({ column }) => (
            <CustomHeader
                column={column}
                title="Max Budget ($)"
                className='justify-center'
                onSortAsc={() => column.toggleSorting(false)}
                onSortDesc={() => column.toggleSorting(true)}
                onHide={() => column.toggleVisibility(false)}
            />
        ),
        cell: ({ row }) => {
            const amountSpent = row.original.amountSpent
            const maxBudget = row.original.maxBudget
            const per = amountSpent && maxBudget ? ((amountSpent / maxBudget) * 100).toFixed(2) : "0"
            return <div className='text-center'>
                <Progress value={parseInt(per)} />
                <div className='mt-0.5 text-[12px]'>
                    {`${amountSpent ? formatNumbers(amountSpent) : 0.00} / ${maxBudget ? formatNumbers(maxBudget) : 0.00} (${per})%`}
                </div>
            </div>
        }
    },
    {
        accessorKey: "budgetPerDay",
        header: ({ column }) => (
            <CustomHeader
                column={column}
                title="Daily Budget ($)"
                className='justify-center'
                onSortAsc={() => column.toggleSorting(false)}
                onSortDesc={() => column.toggleSorting(true)}
                onHide={() => column.toggleVisibility(false)}
            />
        ),
        cell: ({ row }) => {
            const dailyAmountSpent = row.original.dailyAmountSpent || 0
            const budgetPerDay = row.original.budgetPerDay
            const per = budgetPerDay && budgetPerDay ? ((dailyAmountSpent / budgetPerDay) * 100).toFixed(2) : "0"
            return <div className='text-center'>
                <Progress value={parseInt(per)} />
                <div className='mt-0.5 text-[12px]'>
                    {`${dailyAmountSpent ? formatNumbers(dailyAmountSpent) : 0.00} / ${budgetPerDay ? formatNumbers(budgetPerDay) : 0.00} (${per})%`}
                </div>
            </div>
        }
    },
    {
        accessorKey: "bidPrice",
        header: ({ column }) => (
            <CustomHeader
                column={column}
                title="Bid Price ($)"
                className='justify-center'
                onSortAsc={() => column.toggleSorting(false)}
                onSortDesc={() => column.toggleSorting(true)}
                onHide={() => column.toggleVisibility(false)}
            />
        ),
        cell: ({ row }) => {
            return <div className='text-end'>{row.getValue("bidPrice")}</div>
        }
    }
]

export default function CampaignDatatable({
    pageNo,
    pageSize,
    data
}: {
    pageNo: number,
    pageSize: number
    data: TabularData
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
        state: {
            pagination
        }
    })

    return (
        <Card className='p-3'>
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
