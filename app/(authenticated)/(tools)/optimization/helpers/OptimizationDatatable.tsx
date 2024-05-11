"use client"

import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import ConfirmDialog from '@/components/utility/customComponents/ConfirmDialog'
import { PopoverClose } from '@radix-ui/react-popover'
import { ColumnDef, PaginationState, getCoreRowModel, getExpandedRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import { Edit, Ellipsis, Trash, Trash2 } from 'lucide-react'
import Link from 'next/link'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { updateOptimization } from '../actions'
import { toast } from '@/components/ui/use-toast'
import { getUpdateStatus } from '@/components/utility/utils/Utils'
import { getStatusAvatar, handleStatus } from '@/components/utility/utils/JSXUtils'
import DataTable, { CustomHeader, CustomPagination } from '@/components/ui/datatable'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { searchCampaign } from '@/app/(authenticated)/(manage)/campaigns/actions'
import { Card } from '@/components/ui/card'

const updateStatus = async (status: string, optimization: OptimizationType) => {
    const cr = { ...optimization }
    cr.status = status
    const result = await updateOptimization(cr.id, cr)
    if (result.status === 200) toast({ title: `Updated Successfully`, description: `Sucessfully updated optimization` })
    else toast({ title: `Error occured`, description: result.message })
}

const columns = (campaignList: { id: number, name: string }[]) => {
    const data: ColumnDef<OptimizationType, any>[] = [
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
                                <Link href={`/optimization/edit/${row.original.id}`} className='flex items-center justify-start px-3 py-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800'><Edit size={18} className='mr-2' />Edit</Link>
                                <PopoverClose asChild>
                                    <Button variant="ghost" size="sm" className='justify-start' onClick={() => updateStatus(getUpdateStatus(row.getValue("status")), row.original)}>{handleStatus(row.getValue("status"))}{getUpdateStatus(row.getValue("status"))}</Button>
                                </PopoverClose>
                                <ConfirmDialog
                                    title='Do you want to delete this optimization?'
                                    description='Deleted action cannot be reverted.'
                                    buttonContent={<><Trash size={18} className='mr-2' />Delete</>}
                                    onConfirm={() => updateStatus("DELETE", row.original)}
                                />
                            </PopoverContent>
                        </Popover>
                    </>
                    }
                </div >
            }
        },
        {
            accessorKey: "campaignId",
            header: ({ column }) => (
                <CustomHeader
                    column={column}
                    title="Campaign"
                    className='justify-center'
                />
            ),
            enableSorting: false,
            cell: ({ row }) => {
                const campName = campaignList.filter(v => v.id === row.original.campaignId)[0]
                return <div className='text-start'>{campName?.name}</div>
            }
        },
        {
            accessorKey: "maxBudgetPerSiteid",
            header: ({ column }) => (
                <CustomHeader
                    column={column}
                    title="Max Spends per Bundle Id"
                    className='justify-center text-nowrap'
                    onSortAsc={() => column.toggleSorting(false)}
                    onSortDesc={() => column.toggleSorting(true)}
                    onHide={() => column.toggleVisibility(false)}
                />
            ),
            cell: ({ row }) => {
                return <div className='text-center'>{row.getValue('maxBudgetPerSiteid')}</div>
            }
        },
        {
            accessorKey: "maxImpPerClick",
            header: ({ column }) => (
                <CustomHeader
                    column={column}
                    title="Max Impression before Click"
                    className='justify-center text-nowrap'
                    onSortAsc={() => column.toggleSorting(false)}
                    onSortDesc={() => column.toggleSorting(true)}
                    onHide={() => column.toggleVisibility(false)}
                />
            ),
            cell: ({ row }) => {
                return <div className='text-center'>{row.getValue('maxImpPerClick')}</div>
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
        }
    ]

    return data
}

export default function OptimizationDatatable({
    pageNo,
    pageSize,
    data
}: {
    pageNo: number,
    pageSize: number
    data: OptimizationTabularData
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
    const [campaignList, setCampaignList] = useState<{ id: number, name: string }[]>([])

    useEffect(() => {
        const fetchCampaignList = async () => {
            const campaignList = await searchCampaign({ pageNo: '0', pageSize: "50", filter: {} })
            setCampaignList(campaignList.content.map((v: CampaignType) => ({ id: v.id, name: v.campaignName })))
        }
        fetchCampaignList()
    }, [])

    const table = useReactTable({
        data: data.content,
        columns: columns(campaignList),
        getSortedRowModel: getSortedRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        rowCount: data.totalElements,
        state: { pagination }
    })

    return (
        <Card className='p-3'>
            <DataTable table={table} columns={columns(campaignList)} />
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
