"use client"

import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import React from 'react'
import { PaymentHistoryTye } from '../../types/ProfileTypes'
import DataTable, { CustomHeader } from '@/components/ui/datatable'

const columns: ColumnDef<PaymentHistoryTye, any>[] = [
    {
        accessorKey: "txnOn",
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
        enableSorting: false,
        cell: ({ row }) => {
            return <div className='text-start'>{new Date(row.getValue('txnOn') as number * 1000).toUTCString()}</div>
        }
    },
    {
        accessorKey: "txnType",
        header: ({ column }) => (
            <CustomHeader
                column={column}
                title="Type"
                className='justify-center'
                onSortAsc={() => column.toggleSorting(false)}
                onSortDesc={() => column.toggleSorting(true)}
                onHide={() => column.toggleVisibility(false)}
            />
        ),
        enableSorting: false,
        cell: ({ row }) => {
            return <div className='text-start'>{row.getValue('txnType')}</div>
        }
    },
    {
        accessorKey: "txnAmount",
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
            return <div className='text-start'>{row.getValue('txnAmount')}</div>
        }
    }
]

export default function PaymentHistoryTable({
    data
}: {
    data: PaymentHistoryTye[]
}) {

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel()
    })

    return (
        <DataTable table={table} columns={columns} />
    )
}
