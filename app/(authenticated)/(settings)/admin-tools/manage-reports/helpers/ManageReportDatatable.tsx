"use client"

import { Card } from '@/components/ui/card'
import DataTable, { CustomHeader } from '@/components/ui/datatable'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { getStatusAvatar } from '@/components/utility/utils/JSXUtils'
import { ColumnDef, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import { Edit, Ellipsis } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const columns = () => {
    const data: ColumnDef<ManageReportType, any>[] = [
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
                            <Link href={`/admin-tools/manage-reports/edit/${row.original.id}`} className='flex items-center justify-start px-3 py-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800'><Edit size={18} className='mr-2' />Edit</Link>
                        </PopoverContent>
                    </Popover>
                </div >
            }
        },
        {
            accessorKey: "email",
            enableSorting: false,
            header: ({ column }) => (
                <CustomHeader
                    column={column}
                    title="Email"
                    className='justify-center text-nowrap'
                />
            ),
            cell: ({ row }) => {
                return <div className='text-start'>{row.getValue('email')}</div>
            }
        },
        {
            accessorKey: "userId",
            header: ({ column }) => (
                <CustomHeader
                    column={column}
                    title="User Id"
                    className='justify-center text-nowrap'
                    onSortAsc={() => column.toggleSorting(false)}
                    onSortDesc={() => column.toggleSorting(true)}
                    onHide={() => column.toggleVisibility(false)}
                />
            ),
            cell: ({ row }) => {
                return <div className='text-center'>{row.getValue('userId')}</div>
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
            accessorKey: "bidsCalc",
            header: ({ column }) => (
                <CustomHeader
                    column={column}
                    title="Bids Calc"
                    className='justify-center'
                />
            ),
            enableSorting: false,
            cell: ({ row }) => {
                return <div className='text-end'>{row.getValue("bidsCalc")}</div>
            }
        },
        {
            accessorKey: "impsCalc",
            header: ({ column }) => (
                <CustomHeader
                    column={column}
                    title="Impression Calc"
                    className='justify-center'
                />
            ),
            enableSorting: false,
            cell: ({ row }) => {
                return <div className='text-end'>{row.getValue("impsCalc")}</div>
            }
        },
        {
            accessorKey: "clksCalc",
            header: ({ column }) => (
                <CustomHeader
                    column={column}
                    title="Clicks Calc"
                    className='justify-center'
                />
            ),
            enableSorting: false,
            cell: ({ row }) => {
                return <div className='text-end'>{row.getValue("clksCalc")}</div>
            }
        },
        {
            accessorKey: "spendsCalc",
            header: ({ column }) => (
                <CustomHeader
                    column={column}
                    title="Spends Calc"
                    className='justify-center'
                />
            ),
            enableSorting: false,
            cell: ({ row }) => {
                return <div className='text-end'>{row.getValue("spendsCalc")}</div>
            }
        }
    ]
    return data
}

export default function ManageReportDatatable({ tabularData }: { tabularData: ManageReportType[] }) {

    const table = useReactTable({
        data: tabularData,
        columns: columns(),
        getSortedRowModel: getSortedRowModel(),
        getCoreRowModel: getCoreRowModel()
    })

    return (
        <Card className='p-3'>
            <DataTable table={table} columns={columns()} />
        </Card>
    )
}
