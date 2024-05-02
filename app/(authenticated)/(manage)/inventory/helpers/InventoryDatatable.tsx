"use client"

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import DataTable, { CustomHeader, CustomPagination } from '@/components/ui/datatable'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { toast } from '@/components/ui/use-toast'
import { getStatusAvatar, handleStatus } from '@/components/utility/utils/JSXUtils'
import { getUpdateStatus } from '@/components/utility/utils/Utils'
import { PopoverClose } from '@radix-ui/react-popover'
import { ColumnDef, PaginationState, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import { Ellipsis, Trash2 } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { updateSiteApp } from '../actions'
import { fetchUserByRole } from '@/app/(authenticated)/(analyze)/actions'

const updateStatus = async (status: string, inventory: InventoryType) => {
    const cr = { ...inventory }
    cr.status = status
    const result = await updateSiteApp(cr.id, cr)
    if (result.status === 200) toast({ title: `Updated Successfully`, description: `Sucessfully updated ${cr.appName} inventory` })
    else toast({ title: `Error occured`, description: result.message })
}

const columns = (sspOptions: { value: string, label: string }[]) => {
    const data: ColumnDef<InventoryType, any>[] = [
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
                                <PopoverClose asChild>
                                    <Button variant="ghost" size="sm" className='justify-start' onClick={() => updateStatus(getUpdateStatus(row.getValue("status")), row.original)}>{handleStatus(row.getValue("status"))}{getUpdateStatus(row.getValue("status"))}</Button>
                                </PopoverClose>
                            </PopoverContent>
                        </Popover>
                    </>}
                </div>
            }
        },
        {
            accessorKey: "id",
            header: ({ column }) => (
                <CustomHeader
                    column={column}
                    title="Site ID"
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
            accessorKey: "appName",
            header: ({ column }) => (
                <CustomHeader
                    column={column}
                    title="App Name"
                    className='justify-center'
                    onSortAsc={() => column.toggleSorting(false)}
                    onSortDesc={() => column.toggleSorting(true)}
                    onHide={() => column.toggleVisibility(false)}
                />
            ),
            enableSorting: false,
            cell: ({ row }) => {
                return <div className='text-start'>{row.getValue('appName')}</div>
            }
        },
        {
            accessorKey: "publisherId",
            header: ({ column }) => (
                <CustomHeader
                    column={column}
                    title="SSP"
                    className='justify-center'
                    onSortAsc={() => column.toggleSorting(false)}
                    onSortDesc={() => column.toggleSorting(true)}
                    onHide={() => column.toggleVisibility(false)}
                />
            ),
            enableSorting: false,
            cell: ({ row }) => {
                const name = sspOptions.filter(v => parseInt(v.value) === row.original.publisherId)[0]?.label
                return <div className='text-start'>{name}</div>
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
        },
        {
            accessorKey: "bundleId",
            header: ({ column }) => (
                <CustomHeader
                    column={column}
                    title="Bundle"
                    className='justify-center'
                    onSortAsc={() => column.toggleSorting(false)}
                    onSortDesc={() => column.toggleSorting(true)}
                    onHide={() => column.toggleVisibility(false)}
                />
            ),
            enableSorting: false,
            cell: ({ row }) => {
                return <div className='text-start'>{row.getValue('bundleId')}</div>
            }
        },
        {
            accessorKey: "domain",
            header: ({ column }) => (
                <CustomHeader
                    column={column}
                    title="Domain"
                    className='justify-center'
                    onSortAsc={() => column.toggleSorting(false)}
                    onSortDesc={() => column.toggleSorting(true)}
                    onHide={() => column.toggleVisibility(false)}
                />
            ),
            enableSorting: false,
            cell: ({ row }) => {
                return <div className='text-start'>{row.getValue('domain')}</div>
            }
        }
    ]
    return data
}

export default function InventoryDatatable({
    pageNo,
    pageSize,
    data
}: {
    pageNo: number,
    pageSize: number
    data: InventoryTabularData
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
    const [sspOptions, setSSPOptions] = useState<{ value: string, label: string }[]>([])

    useEffect(() => {
        const fetchValue = async () => {
            const result = await fetchUserByRole("SSP")
            setSSPOptions(result.map((v: { id: number, name: string }) => ({ value: v.id.toString(), label: v.name })))
        }
        fetchValue()
    }, [])

    const table = useReactTable({
        data: data.content,
        columns: columns(sspOptions),
        getSortedRowModel: getSortedRowModel(),
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        rowCount: data.totalElements,
        state: { pagination }
    })

    return (
        <Card className='p-3'>
            <DataTable table={table} columns={columns(sspOptions)} />
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
