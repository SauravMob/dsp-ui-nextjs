"use client"

import { Card } from '@/components/ui/card'
import DataTable, { CustomHeader, CustomPagination } from '@/components/ui/datatable'
import { ColumnDef, PaginationState, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useMemo } from 'react'
import DataModal from './DataModal'

const columns = () => {
    const data: ColumnDef<EventLogsType, any>[] = [
        {
            accessorKey: "logId",
            header: ({ column }) => (
                <CustomHeader
                    column={column}
                    title="ID"
                    className='justify-end text-nowrap'
                    onSortAsc={() => column.toggleSorting(false)}
                    onSortDesc={() => column.toggleSorting(true)}
                    onHide={() => column.toggleVisibility(false)}
                />
            ),
            cell: ({ row }) => {
                return <div className='text-end'>{row.getValue('logId')}</div>
            }
        },
        {
            accessorKey: "entityType",
            header: ({ column }) => (
                <CustomHeader
                    column={column}
                    title="Entity Type"
                    className='justify-center text-nowrap'
                />
            ),
            enableSorting: false,
            cell: ({ row }) => {
                return <div className='text-start'>{row.getValue('entityType')}</div>
            }
        },
        {
            accessorKey: "entityId",
            header: ({ column }) => (
                <CustomHeader
                    column={column}
                    title="Entity Id"
                    className='justify-center text-nowrap'
                />
            ),
            enableSorting: false,
            cell: ({ row }) => {
                return <div className='text-start'>{row.getValue('entityId')}</div>
            }
        },
        {
            accessorKey: "eventType",
            header: ({ column }) => (
                <CustomHeader
                    column={column}
                    title="Entity Type"
                    className='justify-center text-nowrap'
                />
            ),
            enableSorting: false,
            cell: ({ row }) => {
                return <div className='text-start'>{row.getValue('eventType')}</div>
            }
        },
        {
            accessorKey: "modifiedFieldsJson",
            header: ({ column }) => (
                <CustomHeader
                    column={column}
                    title="Edited Fields"
                    className='justify-center'
                />
            ),
            enableSorting: false,
            cell: ({ row }) => {
                const dataJson = row.original.modifiedFieldsJson ? JSON.parse(row.original.modifiedFieldsJson) : []
                return Array.isArray(dataJson) ? <div className='grid grid-cols-4 max-w-96'>
                    <div className='col-span-3'>
                        {dataJson.map((v, k) => v.fn).join(', ')}
                    </div>
                    <div className='col-span-1'>
                        <DataModal row={row.original} />
                    </div>
                </div> : null
            }
        },
        {
            accessorKey: "userId",
            header: ({ column }) => (
                <CustomHeader
                    column={column}
                    title="User"
                    className='justify-center'
                />
            ),
            enableSorting: false,
            cell: ({ row }) => {
                return <div className='text-center'>{row.getValue('userId')}</div>
            }
        },
        {
            accessorKey: "timestamp",
            header: ({ column }) => (
                <CustomHeader
                    column={column}
                    title="Datetime"
                    className='justify-center'
                />
            ),
            enableSorting: false,
            cell: ({ row }) => {
                return <div className='text-center'>{row.getValue('timestamp')}</div>
            }
        }
    ]
    return data
}

export default function EventLogsDatatable({
    pageNo,
    pageSize,
    data
}: {
    pageNo: number,
    pageSize: number
    data: EventLogsTabularData
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
        columns: columns(),
        getSortedRowModel: getSortedRowModel(),
        getCoreRowModel: getCoreRowModel(),
        rowCount: data.totalElements,
        manualPagination: true,
        state: { pagination }
    })

    return (
        <Card className='p-3'>
            <DataTable table={table} columns={columns()} />
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
