"use client"

import { Card } from '@/components/ui/card'
import DataTable, { CustomHeader, CustomPagination } from '@/components/ui/datatable'
import { getStatusAvatar } from '@/components/utility/utils/JSXUtils'
import { numFormatter } from '@/components/utility/utils/Utils'
import { ColumnDef, PaginationState, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useMemo } from 'react'

const columns: ColumnDef<AdslotReportType, any>[] = [
    {
        accessorKey: "deliveryDate",
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
            return <div className='text-center text-nowrap'>{row.getValue('deliveryDate')}</div>
        }
    },
    {
        accessorKey: "exchangeId",
        header: ({ column }) => (
            <CustomHeader
                column={column}
                title="SSP"
                className='justify-center text-nowrap'
            />
        ),
        enableSorting: false,
        cell: ({ row }) => {
            return <div className='text-center'>{row.getValue('exchangeId')}</div>
        }
    },
    {
        accessorKey: "placementId",
        header: ({ column }) => (
            <CustomHeader
                column={column}
                title="Placement Id"
                className='justify-center text-nowrap'
            />
        ),
        enableSorting: false,
        cell: ({ row }) => {
            return <div className='text-start'>{row.getValue('placementId')}</div>
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
            return <div className='w-fit text-center'>{getStatusAvatar(row.getValue("status"))}</div>
        }
    },
    {
        accessorKey: "bundleId",
        header: ({ column }) => (
            <CustomHeader
                column={column}
                title="Bundle Id"
                className='justify-center'
            />
        ),
        enableSorting: false,
        cell: ({ row }) => {
            return <div className='text-start'>{row.getValue("bundleId")}</div>
        }
    },
    {
        accessorKey: "counts",
        header: ({ column }) => (
            <CustomHeader
                column={column}
                title="Counts"
                className='justify-center'
            />
        ),
        enableSorting: false,
        cell: ({ row }) => {
            return <div className='text-right'>{numFormatter(row.getValue("counts"))}</div>
        }
    }
]

export default function AdslotReportDatatable({
    pageNo,
    pageSize,
    data
}: {
    pageNo: number,
    pageSize: number,
    data: AdslotReportTabularData
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
