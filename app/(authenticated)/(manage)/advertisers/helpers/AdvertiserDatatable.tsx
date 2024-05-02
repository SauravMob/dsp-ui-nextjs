"use client"

import { Card } from '@/components/ui/card'
import DataTable, { CustomHeader, CustomPagination } from '@/components/ui/datatable'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { getStatusAvatar } from '@/components/utility/utils/JSXUtils'
import { ColumnDef, PaginationState, getCoreRowModel, getExpandedRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import { Bell, Camera, DollarSign, Ellipsis, Users } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useMemo } from 'react'

const columns: ColumnDef<AdvertiserType, any>[] = [
    {
        accessorKey: "",
        id: "edit",
        enableSorting: false,
        cell: ({ row }) => {
            return <div className='text-center w-7'>
                <Popover>
                    <PopoverTrigger asChild className='flex justify-center cursor-pointer'>
                        <div className='border rounded-md p-1'><Ellipsis size={18} /></div>
                    </PopoverTrigger>
                    <PopoverContent className='p-2 flex flex-col'>
                        <Link href={`/campaigns/create/${row.original.id}`} className='flex items-center justify-start px-3 py-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800'><Bell size={18} className='mr-2' />New Campaign</Link>
                        <Link href={`/creatives/create?${row.original.id}`} className='flex items-center justify-start px-3 py-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800'><Camera size={18} className='mr-2' />New Creative</Link>
                        <Link href={`/audiences/create?${row.original.id}`} className='flex items-center justify-start px-3 py-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800'><Users size={18} className='mr-2' />New Audience</Link>
                        <Link href={`/audiences/create?${row.original.id}`} className='flex items-center justify-start px-3 py-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800'><DollarSign size={18} className='mr-2' />Add Funds</Link>
                    </PopoverContent>
                </Popover>
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
        accessorKey: "email",
        header: ({ column }) => (
            <CustomHeader
                column={column}
                title="Account Name"
                className='justify-center'
                onSortAsc={() => column.toggleSorting(false)}
                onSortDesc={() => column.toggleSorting(true)}
                onHide={() => column.toggleVisibility(false)}
            />
        ),
        enableSorting: false,
        cell: ({ row }) => {
            return <div className='text-start'>{row.getValue('email')}</div>
        }
    },
    {
        accessorKey: "username",
        header: ({ column }) => (
            <CustomHeader
                column={column}
                title="Advertiser Name"
                className='justify-center'
                onSortAsc={() => column.toggleSorting(false)}
                onSortDesc={() => column.toggleSorting(true)}
                onHide={() => column.toggleVisibility(false)}
            />
        ),
        enableSorting: false,
        cell: ({ row }) => {
            return <div className='text-start'>{row.getValue('username')}</div>
        }
    },
    {
        accessorKey: "campaignCount",
        header: ({ column }) => (
            <CustomHeader
                column={column}
                title="Campaigns"
                className='justify-center'
                onSortAsc={() => column.toggleSorting(false)}
                onSortDesc={() => column.toggleSorting(true)}
                onHide={() => column.toggleVisibility(false)}
            />
        ),
        enableSorting: false,
        cell: ({ row }) => {
            return <div className='text-start'>{row.getValue('campaignCount')}</div>
        }
    },
    {
        accessorKey: "creativeCount",
        header: ({ column }) => (
            <CustomHeader
                column={column}
                title="Creatives"
                className='justify-center'
                onSortAsc={() => column.toggleSorting(false)}
                onSortDesc={() => column.toggleSorting(true)}
                onHide={() => column.toggleVisibility(false)}
            />
        ),
        enableSorting: false,
        cell: ({ row }) => {
            return <div className='text-start'>{row.getValue('creativeCount')}</div>
        }
    },
    {
        accessorKey: "availableBudget",
        header: ({ column }) => (
            <CustomHeader
                column={column}
                title="Amount"
                className='justify-center'
                onSortAsc={() => column.toggleSorting(false)}
                onSortDesc={() => column.toggleSorting(true)}
                onHide={() => column.toggleVisibility(false)}
            />
        ),
        enableSorting: false,
        cell: ({ row }) => {
            return <div className='text-start'>{row.original.availableBudget ? row.original.availableBudget.toFixed(2) : '0.00'}</div>
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
            return <div className='w-fit'>{getStatusAvatar(row.getValue("status"))}</div>
        }
    }
]

export default function AdvertiserDatatable({
    pageNo,
    pageSize,
    data
}: {
    pageNo: number,
    pageSize: number
    data: AdvertiserTabularData
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
        getExpandedRowModel: getExpandedRowModel(),
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
