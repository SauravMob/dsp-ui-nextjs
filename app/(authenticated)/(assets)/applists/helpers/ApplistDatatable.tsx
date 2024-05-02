"use client"

import { Button } from '@/components/ui/button'
import DataTable, { CustomHeader, CustomPagination } from '@/components/ui/datatable'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import ConfirmDialog from '@/components/utility/customComponents/ConfirmDialog'
import { getStatusAvatar, handleStatus } from '@/components/utility/utils/JSXUtils'
import { getDateForPosix, getUpdateStatus } from '@/components/utility/utils/Utils'
import { PopoverClose } from '@radix-ui/react-popover'
import { ColumnDef, ExpandedState, PaginationState, Row, getCoreRowModel, getExpandedRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import { ChevronDown, ChevronUp, Edit, Ellipsis, Trash, Trash2 } from 'lucide-react'
import Link from 'next/link'
import React, { useCallback, useMemo, useState } from 'react'
import { updateApp } from '../actions'
import { toast } from '@/components/ui/use-toast'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Card } from '@/components/ui/card'

const updateStatus = async (status: string, app: ApplistType) => {
    const cr = { ...app }
    cr.status = status
    const result = await updateApp(cr.id, cr)
    if (result.status === 200) toast({ title: `Updated Successfully`, description: `Sucessfully updated ${cr.name} app` })
    else toast({ title: `Error occured`, description: result.message })
}

const columns: ColumnDef<ApplistType, any>[] = [
    {
        accessorKey: "",
        id: "expand",
        enableSorting: false,
        cell: ({ row }) => {
            return <div className='flex justify-center p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer' onClick={() => row.toggleExpanded()}>
                {row.getIsExpanded() ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
            </div>
        }
    },
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
                            <Link href={`/audiences/edit/${row.original.id}`} className='flex items-center justify-start px-3 py-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800'><Edit size={18} className='mr-2' />Edit</Link>
                            <PopoverClose asChild>
                                <Button variant="ghost" size="sm" className='justify-start' onClick={() => updateStatus(getUpdateStatus(row.getValue("status")), row.original)}>{handleStatus(row.getValue("status"))}{getUpdateStatus(row.getValue("status"))}</Button>
                            </PopoverClose>
                            <ConfirmDialog
                                title='Do you want to delete this app?'
                                description='Deleted action cannot be reverted.'
                                buttonContent={<><Trash size={18} className='mr-2' />Delete</>}
                                onConfirm={() => updateStatus("DELETE", row.original)}
                            />
                        </PopoverContent>
                    </Popover>
                </>}
            </div>
        }
    },
    {
        accessorKey: "name",
        header: ({ column }) => (
            <CustomHeader
                column={column}
                title="Name"
                className='justify-center'
                onSortAsc={() => column.toggleSorting(false)}
                onSortDesc={() => column.toggleSorting(true)}
                onHide={() => column.toggleVisibility(false)}
            />
        ),
        enableSorting: false,
        cell: ({ row }) => {
            return <div className='text-start'>{row.getValue('name')}</div>
        }
    },
    {
        accessorKey: "bundle_count",
        header: ({ column }) => (
            <CustomHeader
                column={column}
                title="No. of Bundles"
                className='justify-center'
                onSortAsc={() => column.toggleSorting(false)}
                onSortDesc={() => column.toggleSorting(true)}
                onHide={() => column.toggleVisibility(false)}
            />
        ),
        enableSorting: false,
        cell: ({ row }) => {
            return <div className='text-center'>{row.getValue('bundle_count')}</div>
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
        accessorKey: "created_by",
        header: ({ column }) => (
            <CustomHeader
                column={column}
                title="Created By"
                className='justify-start'
                onSortAsc={() => column.toggleSorting(false)}
                onSortDesc={() => column.toggleSorting(true)}
                onHide={() => column.toggleVisibility(false)}
            />
        ),
        cell: ({ row }) => {
            return <div className='text-start'>{row.getValue('created_by')}</div>
        }
    },
    {
        accessorKey: "updatedAt",
        header: ({ column }) => (
            <CustomHeader
                column={column}
                title="Last Updated"
                className='justify-start'
                onSortAsc={() => column.toggleSorting(false)}
                onSortDesc={() => column.toggleSorting(true)}
                onHide={() => column.toggleVisibility(false)}
            />
        ),
        cell: ({ row }) => {
            return <div className='text-start'>{getDateForPosix(row.getValue('updatedAt'), "SECONDS")}</div>
        }
    }
]

export default function ApplistDatatable({
    pageNo,
    pageSize,
    data
}: {
    pageNo: number,
    pageSize: number
    data: ApplistTabularData
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
    const [expanded, setExpanded] = useState<ExpandedState>({})

    const table = useReactTable({
        data: data.content,
        columns,
        getSortedRowModel: getSortedRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        rowCount: data.totalElements,
        manualPagination: true,
        onExpandedChange: setExpanded,
        state: { pagination, expanded }
    })

    const ExpandedRows = ({ row }: { row: Row<ApplistType> }) => {
        return (
            <div className='px-20 m-1'>
                <div className='m-2 grid grid-cols-5'>
                    <div className='col-span-1'>Bundles:</div>
                    <div className='col-span-4'>{row.original.bundles.split(',').map((v, k) => {
                        return <div key={k}>{v}</div>
                    })}</div>
                </div>
                <div className='m-2 grid grid-cols-5'>
                    <div className='col-span-1'>Description:</div>
                    <div className='col-span-4'>{row.original.description || '-'}</div>
                </div>
            </div>
        )
    }

    return (
        <Card className='p-3'>
            <DataTable table={table} columns={columns} ExpandedRows={ExpandedRows} />
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
