"use client"

import { Card } from '@/components/ui/card'
import DataTable, { CustomHeader } from '@/components/ui/datatable'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { getStatusAvatar } from '@/components/utility/utils/JSXUtils'
import { getDateForPosix } from '@/components/utility/utils/Utils'
import { ColumnDef, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import { Edit, Ellipsis } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const columns = () => {
    const data: ColumnDef<AppsflyerAudienceType, any>[] = [
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
                            <Link href={`/admin-tools/appsflyer-audience/edit/${row.original.id}`} className='flex items-center justify-start px-3 py-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800'><Edit size={18} className='mr-2' />Edit</Link>
                        </PopoverContent>
                    </Popover>
                </div >
            }
        },
        {
            accessorKey: "id",
            header: ({ column }) => (
                <CustomHeader
                    column={column}
                    title="Id"
                    className='justify-center text-nowrap'
                    onSortAsc={() => column.toggleSorting(false)}
                    onSortDesc={() => column.toggleSorting(true)}
                    onHide={() => column.toggleVisibility(false)}
                />
            ),
            cell: ({ row }) => {
                return <div className='text-center'>{row.getValue('id')}</div>
            }
        },
        {
            accessorKey: "advertiserName",
            enableSorting: false,
            header: ({ column }) => (
                <CustomHeader
                    column={column}
                    title="Advertiser"
                    className='justify-center text-nowrap'
                />
            ),
            cell: ({ row }) => {
                return <div className='text-start'>{row.getValue('advertiserName')}</div>
            }
        },
        {
            accessorKey: "apiKey",
            enableSorting: false,
            header: ({ column }) => (
                <CustomHeader
                    column={column}
                    title="Api key"
                    className='justify-center text-nowrap'
                />
            ),
            cell: ({ row }) => {
                return <div className='text-start'>{row.getValue('apiKey')}</div>
            }
        },
        {
            accessorKey: "status",
            header: ({ column }) => (
                <CustomHeader
                    column={column}
                    title="Status"
                    className='justify-center'
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
                    className='justify-center'
                />
            ),
            enableSorting: false,
            cell: ({ row }) => {
                return <div className='text-center'>{getDateForPosix(row.getValue("createdAt"), 'SECONDS')}</div>
            }
        },
        {
            accessorKey: "updatedAt",
            header: ({ column }) => (
                <CustomHeader
                    column={column}
                    title="Updated At"
                    className='justify-center'
                />
            ),
            enableSorting: false,
            cell: ({ row }) => {
                return <div className='text-center'>{getDateForPosix(row.getValue("updatedAt"), 'SECONDS')}</div>
            }
        }
    ]
    return data
}

export default function AppsflyerAudDatatable({ data }: { data: AppsflyerAudienceType[] }) {
    const table = useReactTable({
        data,
        columns: columns(),
        getSortedRowModel: getSortedRowModel(),
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <Card className='p-3'>
            <DataTable table={table} columns={columns()} />
        </Card>
    )
}
