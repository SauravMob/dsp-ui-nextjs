"use client"

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import DataTable, { CustomHeader, CustomPagination } from '@/components/ui/datatable'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import ConfirmDialog from '@/components/utility/customComponents/ConfirmDialog'
import { getStatusAvatar, handleStatus } from '@/components/utility/utils/JSXUtils'
import { getUpdateStatus } from '@/components/utility/utils/Utils'
import { PopoverClose } from '@radix-ui/react-popover'
import { ColumnDef, PaginationState, getCoreRowModel, getExpandedRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import { Edit, Ellipsis, Trash, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useMemo } from 'react'
import { updateAudience } from '../actions'
import { toast } from '@/components/ui/use-toast'

const updateStatus = async (status: string, audience: AudienceType) => {
    const cr = { ...audience }
    cr.status = status
    const result = await updateAudience(cr.id, cr)
    if (result.status === 200) toast({ title: `Updated Successfully`, description: `Sucessfully updated ${cr.name} audience` })
    else toast({ title: `Error occured`, description: result.message })
}

const columns = (isAdmin: boolean) => {
    const data: ColumnDef<AudienceType, any>[] = [
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
                                {!isAdmin && <>
                                    <PopoverClose asChild>
                                        <Button variant="ghost" size="sm" className='justify-start' onClick={() => updateStatus(getUpdateStatus(row.getValue("status")), row.original)}>{handleStatus(row.getValue("status"))}{getUpdateStatus(row.getValue("status"))}</Button>
                                    </PopoverClose>
                                    <ConfirmDialog
                                        title='Do you want to delete this audience?'
                                        description='Deleted action cannot be reverted.'
                                        buttonContent={<><Trash size={18} className='mr-2' />Delete</>}
                                        onConfirm={() => updateStatus("DELETE", row.original)}
                                    />
                                </>}
                            </PopoverContent>
                        </Popover>
                    </>}
                </div>
            }
        },
        {
            accessorKey: "id",
            id: 'id',
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
                return <div className='text-start'>{row.getValue('id')}</div>
            }
        },
        {
            accessorKey: "name",
            header: ({ column }) => (
                <CustomHeader
                    column={column}
                    title="Name"
                    className='justify-center'
                />
            ),
            enableSorting: false,
            cell: ({ row }) => {
                return <div className='text-start'>{row.getValue('name')}</div>
            }
        },
        {
            accessorKey: "description",
            header: ({ column }) => (
                <CustomHeader
                    column={column}
                    title="Description"
                    className='justify-center'
                />
            ),
            enableSorting: false,
            cell: ({ row }) => {
                return <div className='text-start'>{row.getValue('description')}</div>
            }
        },
        {
            accessorKey: "uploadType",
            header: ({ column }) => (
                <CustomHeader
                    column={column}
                    title="Upload Type"
                    className='justify-center text-nowrap'
                />
            ),
            enableSorting: false,
            cell: ({ row }) => {
                return <div className='text-center'>{row.getValue('uploadType')}</div>
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
            accessorKey: "days",
            header: ({ column }) => (
                <CustomHeader
                    column={column}
                    title="Days"
                    className='justify-center'
                    onSortAsc={() => column.toggleSorting(false)}
                    onSortDesc={() => column.toggleSorting(true)}
                    onHide={() => column.toggleVisibility(false)}
                />
            ),
            cell: ({ row }) => {
                return <div className='text-center'>{row.getValue('days') ? row.getValue('days') : 'NA'}</div>
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
            accessorKey: "rules",
            header: ({ column }) => (
                <CustomHeader
                    column={column}
                    title="Rules"
                    className='justify-center'
                />
            ),
            enableSorting: false,
            cell: ({ row }) => {
                const list = row.original.rules ? row.original.rules.split(',') : undefined
                return <div className='text-start'>
                    {row.original.rules ? <>
                        {list?.map((v, k) => {
                            return <div key={k}>{v}</div>
                        })}
                    </> : "NA"}
                </div>
            }
        },
        {
            accessorKey: "dmpPartner",
            header: ({ column }) => (
                <CustomHeader
                    column={column}
                    title="DMP"
                    className='justify-center'
                    onSortAsc={() => column.toggleSorting(false)}
                    onSortDesc={() => column.toggleSorting(true)}
                    onHide={() => column.toggleVisibility(false)}
                />
            ),
            cell: ({ row }) => {
                return <div className='text-start'>{row.getValue('dmpPartner') ? row.getValue('dmpPartner') : "NA"}</div>
            }
        }
    ]

    return isAdmin ? data : data.filter(v => v.id !== 'id')
}

export default function AudienceDatatable({
    pageNo,
    pageSize,
    isAdmin,
    data
}: {
    pageNo: number,
    isAdmin: boolean,
    pageSize: number
    data: AudienceTabularData
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
        columns: columns(isAdmin),
        getSortedRowModel: getSortedRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        rowCount: data.totalElements,
        state: { pagination }
    })

    return (
        <Card className='p-3'>
            <DataTable table={table} columns={columns(isAdmin)} />
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
