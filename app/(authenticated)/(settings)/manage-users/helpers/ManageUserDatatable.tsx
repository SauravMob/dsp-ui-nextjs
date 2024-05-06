"use client"

import { Card } from '@/components/ui/card'
import DataTable, { CustomHeader, CustomPagination } from '@/components/ui/datatable'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { getStatusAvatar } from '@/components/utility/utils/JSXUtils'
import { getRole } from '@/components/utility/utils/Utils'
import { ColumnDef, PaginationState, getCoreRowModel, getExpandedRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import { Edit, Ellipsis, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useMemo } from 'react'

const columns = () => {
    const data: ColumnDef<ManageUserType, any>[] = [
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
                                <Link href={`/bid-multiplier/edit/${row.original.id}`} className='flex items-center justify-start px-3 py-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800'><Edit size={18} className='mr-2' />Edit</Link>
                            </PopoverContent>
                        </Popover>
                    </>}
                </div >
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
            accessorKey: "company",
            enableSorting: false,
            header: ({ column }) => (
                <CustomHeader
                    column={column}
                    title="Company"
                    className='justify-center text-nowrap'
                />
            ),
            cell: ({ row }) => {
                return <div className='text-start'>{row.getValue('company')}</div>
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
            accessorKey: "role",
            header: ({ column }) => (
                <CustomHeader
                    column={column}
                    title="Role"
                    className='justify-center'
                />
            ),
            enableSorting: false,
            cell: ({ row }) => {
                return <div className='text-start'>{getRole(row.getValue("role"))}</div>
            }
        },
        {
            accessorKey: "country",
            header: ({ column }) => (
                <CustomHeader
                    column={column}
                    title="Country"
                    className='justify-center'
                />
            ),
            enableSorting: false,
            cell: ({ row }) => {
                return <div className='text-start'>{row.getValue("country")}</div>
            }
        },
        {
            accessorKey: "customFeatures",
            header: ({ column }) => (
                <CustomHeader
                    column={column}
                    title="Custom Features"
                    className='justify-center'
                />
            ),
            enableSorting: false,
            cell: ({ row }) => {
                return <div className='text-start'>{row.original.customFeatures ? row.original.customFeatures.replace('INTERNAL', 'NEW AUDIENCE') : ''}</div>
            }
        },
        {
            accessorKey: "domainUrl",
            header: ({ column }) => (
                <CustomHeader
                    column={column}
                    title="Domain"
                    className='justify-center'
                />
            ),
            enableSorting: false,
            cell: ({ row }) => {
                return <div className='text-start'>{row.original.domainUrl}</div>
            }
        },
        {
            accessorKey: "accountManager",
            header: ({ column }) => (
                <CustomHeader
                    column={column}
                    title="A/C Manager"
                    className='justify-center'
                />
            ),
            enableSorting: false,
            cell: ({ row }) => {
                return <div className='text-start'>{row.original.accountManager}</div>
            }
        }
    ]

    return data
}

export default function ManageUserDatatable({
    pageNo,
    pageSize,
    data
}: {
    pageNo: number,
    pageSize: number
    data: ManageUserTabularData
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
        getExpandedRowModel: getExpandedRowModel(),
        rowCount: data.totalElements,
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
