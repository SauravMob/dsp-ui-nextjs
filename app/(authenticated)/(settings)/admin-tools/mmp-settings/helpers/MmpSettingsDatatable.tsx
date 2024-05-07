"use client"

import { Card } from '@/components/ui/card'
import DataTable, { CustomHeader, CustomPagination } from '@/components/ui/datatable'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { getStatusAvatar } from '@/components/utility/utils/JSXUtils'
import { getDateForPosix } from '@/components/utility/utils/Utils'
import { ColumnDef, PaginationState, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import { Edit, Ellipsis, Eye } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useMemo } from 'react'
import EventsDataModal from './EventsDataModal'

const columns = () => {
    const data: ColumnDef<MmpSettingType, any>[] = [
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
                            <Link href={`/admin-tools/mmp-settings/edit/${row.original.id}`} className='flex items-center justify-start px-3 py-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800'><Edit size={18} className='mr-2' />Edit</Link>
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
                return <div className='text-end'>{row.getValue('id')}</div>
            }
        },
        {
            accessorKey: "bundle",
            header: ({ column }) => (
                <CustomHeader
                    column={column}
                    title="Bundle"
                    className='justify-center'
                />
            ),
            enableSorting: false,
            cell: ({ row }) => {
                return <div className='text-start'>{row.getValue('bundle')}</div>
            }
        },
        {
            accessorKey: "mmp",
            header: ({ column }) => (
                <CustomHeader
                    column={column}
                    title="MMP"
                    className='justify-center'
                />
            ),
            enableSorting: false,
            cell: ({ row }) => {
                return <div className='text-start'>{row.getValue('mmp')}</div>
            }
        },
        {
            accessorKey: "mmpEvents",
            header: ({ column }) => (
                <CustomHeader
                    column={column}
                    title="MMP Events"
                    className='justify-center'
                />
            ),
            enableSorting: false,
            cell: ({ row }) => {
                return <div className='flex justify-center'>
                    <EventsDataModal row={row.original} type='EVENTS'/>
                </div>
            }
        },
        {
            accessorKey: "suppressedData",
            header: ({ column }) => (
                <CustomHeader
                    column={column}
                    title="Suppressed Data"
                    className='justify-center'
                />
            ),
            enableSorting: false,
            cell: ({ row }) => {
                return <div className='flex justify-center'>
                    <EventsDataModal row={row.original} type='BUNDLE' />
                </div>
            }
        },
        {
            accessorKey: "blDeviceModels",
            header: ({ column }) => (
                <CustomHeader
                    column={column}
                    title="Device Models"
                    className='justify-start text-nowrap'
                />
            ),
            enableSorting: false,
            cell: ({ row }) => {
                return <div className='text-start'>{row.getValue('blDeviceModels')}</div>
            }
        },
        {
            accessorKey: "status",
            header: ({ column }) => (
                <CustomHeader
                    column={column}
                    title="Status"
                    className='justify-start'
                    onSortAsc={() => column.toggleSorting(false)}
                    onSortDesc={() => column.toggleSorting(true)}
                    onHide={() => column.toggleVisibility(false)}
                />
            ),
            enableSorting: false,
            cell: ({ row }) => {
                return <div className='w-fit'>{getStatusAvatar(row.getValue("status"))}</div>
            }
        },
        {
            accessorKey: "createdAt",
            header: ({ column }) => (
                <CustomHeader
                    column={column}
                    title="Created At"
                    className='justify-start'
                    onSortAsc={() => column.toggleSorting(false)}
                    onSortDesc={() => column.toggleSorting(true)}
                    onHide={() => column.toggleVisibility(false)}
                />
            ),
            cell: ({ row }) => {
                return <div className='text-start'>{getDateForPosix(row.getValue('createdAt'), "SECONDS")}</div>
            }
        }
    ]
    return data
}

export default function MmpSettingsDatatable({
    pageNo,
    pageSize,
    data
}: {
    pageNo: number,
    pageSize: number
    data: MmpSettingTabularData
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
