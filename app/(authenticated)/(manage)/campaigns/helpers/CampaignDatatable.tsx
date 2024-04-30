"use client"

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import DataTable, { CustomHeader, CustomPagination } from '@/components/ui/datatable'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Progress } from '@/components/ui/progress'
import ConfirmDialog from '@/components/utility/customComponents/ConfirmDialog'
import { getStatusAvatar, handleStatus } from '@/components/utility/utils/JSXUtils'
import { formatNumbers, getDateForPosix, getUpdateStatus } from '@/components/utility/utils/Utils'
import { ColumnDef, ExpandedState, PaginationState, Row, getCoreRowModel, getExpandedRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import { ChevronDown, ChevronUp, Copy, Edit, Ellipsis, PieChart, Trash, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useMemo, useState } from 'react'
import { cloneCampaign, updateCampaign } from '../actions'
import { toast } from '@/components/ui/use-toast'
import { PopoverClose } from '@radix-ui/react-popover'

const updateStatus = async (status: string, campaign: CampaignType) => {
    const cr = { ...campaign }
    cr.status = status
    const result = await updateCampaign(cr.id, cr)
    if (result.status === 200) toast({ title: `Updated Successfully`, description: `Sucessfully updated ${cr.campaignName} campaign` })
    else toast({ title: `Error occured`, description: result.message })
}

const cloneHandler = async (row: CampaignType) => {
    await cloneCampaign(row.id)
    toast({
        title: `Cloned Successfully`,
        description: `Created new campaign with name ${row.campaignName}`
    })
}

const columns: ColumnDef<CampaignType, any>[] = [
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
                            <Link href={`/campaigns/edit/${row.original.id}`} className='flex items-center justify-start px-3 py-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800'><Edit size={18} className='mr-2' />Edit</Link>
                            <ConfirmDialog
                                title='Do you want to clone this Campaign?'
                                description='Ad creatives associated with this campaign will not be cloned.'
                                buttonContent={<><Copy size={18} className='mr-2' />Clone</>}
                                onConfirm={() => cloneHandler(row.original)}
                            />
                            <PopoverClose asChild>
                                <Button variant="ghost" size="sm" className='justify-start' onClick={() => updateStatus(getUpdateStatus(row.getValue("status")), row.original)}>{handleStatus(row.getValue("status"))}{getUpdateStatus(row.getValue("status"))}</Button>
                            </PopoverClose>
                            <ConfirmDialog
                                title='Do you want to delete this campaign?'
                                description='Deleted action cannot be reverted.'
                                buttonContent={<><Trash size={18} className='mr-2' />Delete</>}
                                onConfirm={() => updateStatus("DELETE", row.original)}
                            />
                            <Link href={`/campaign-report?campaignId=${row.original.id}`} className='flex items-center justify-start px-3 py-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800'><PieChart size={18} className='mr-2' />View Report</Link>
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
                title="ID"
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
        accessorKey: "campaignName",
        header: ({ column }) => (
            <CustomHeader
                column={column}
                title="Campaign Name"
                className='justify-center'
                onSortAsc={() => column.toggleSorting(false)}
                onSortDesc={() => column.toggleSorting(true)}
                onHide={() => column.toggleVisibility(false)}
            />
        ),
        enableSorting: false,
        cell: ({ row }) => {
            return <div className='text-start'>{<Link href={`/creatives?campaignId=${row.getValue("id")}`}>{row.getValue('campaignName')}</Link>}</div>
        }
    },
    {
        accessorKey: "brandName",
        header: ({ column }) => (
            <CustomHeader
                column={column}
                title="Brands"
                className='justify-center'
                onSortAsc={() => column.toggleSorting(false)}
                onSortDesc={() => column.toggleSorting(true)}
                onHide={() => column.toggleVisibility(false)}
            />
        ),
        enableSorting: false,
        cell: ({ row }) => {
            return <div className='text-start'>{row.getValue('brandName')}</div>
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
            const isExpired = row.getValue("endDate") as number < Math.floor(new Date().getTime() / 1000)
            return <div className='w-fit'>{getStatusAvatar(isExpired ? "EXPIRED" : row.getValue("status"))}</div>
        }
    },
    {
        accessorKey: "startDate",
        header: ({ column }) => (
            <CustomHeader
                column={column}
                title="Start At"
                className='justify-center'
                onSortAsc={() => column.toggleSorting(false)}
                onSortDesc={() => column.toggleSorting(true)}
                onHide={() => column.toggleVisibility(false)}
            />
        ),
        cell: ({ row }) => {
            return <div className='text-center'>{getDateForPosix(row.getValue('startDate'), "SECONDS")}</div>
        }
    },
    {
        accessorKey: "endDate",
        header: ({ column }) => (
            <CustomHeader
                column={column}
                title="End At"
                className='justify-center'
                onSortAsc={() => column.toggleSorting(false)}
                onSortDesc={() => column.toggleSorting(true)}
                onHide={() => column.toggleVisibility(false)}
            />
        ),
        cell: ({ row }) => {
            return <div className='text-center'>{getDateForPosix(row.getValue('endDate'), "SECONDS")}</div>
        }
    },
    {
        accessorKey: "maxBudget",
        header: ({ column }) => (
            <CustomHeader
                column={column}
                title="Max Budget ($)"
                className='justify-center'
                onSortAsc={() => column.toggleSorting(false)}
                onSortDesc={() => column.toggleSorting(true)}
                onHide={() => column.toggleVisibility(false)}
            />
        ),
        cell: ({ row }) => {
            const amountSpent = row.original.amountSpent
            const maxBudget = row.original.maxBudget
            const per = amountSpent && maxBudget ? ((amountSpent / maxBudget) * 100).toFixed(2) : "0"
            return <div className='text-center'>
                <Progress value={parseInt(per)} />
                <div className='mt-0.5 text-[12px]'>
                    {`${amountSpent ? formatNumbers(amountSpent) : 0.00} / ${maxBudget ? formatNumbers(maxBudget) : 0.00} (${per})%`}
                </div>
            </div>
        }
    },
    {
        accessorKey: "budgetPerDay",
        header: ({ column }) => (
            <CustomHeader
                column={column}
                title="Daily Budget ($)"
                className='justify-center'
                onSortAsc={() => column.toggleSorting(false)}
                onSortDesc={() => column.toggleSorting(true)}
                onHide={() => column.toggleVisibility(false)}
            />
        ),
        cell: ({ row }) => {
            const dailyAmountSpent = row.original.dailyAmountSpent || 0
            const budgetPerDay = row.original.budgetPerDay
            const per = budgetPerDay && budgetPerDay ? ((dailyAmountSpent / budgetPerDay) * 100).toFixed(2) : "0"
            return <div className='text-center'>
                <Progress value={parseInt(per)} />
                <div className='mt-0.5 text-[12px]'>
                    {`${dailyAmountSpent ? formatNumbers(dailyAmountSpent) : 0.00} / ${budgetPerDay ? formatNumbers(budgetPerDay) : 0.00} (${per})%`}
                </div>
            </div>
        }
    },
    {
        accessorKey: "bidPrice",
        header: ({ column }) => (
            <CustomHeader
                column={column}
                title="Bid Price ($)"
                className='justify-center'
                onSortAsc={() => column.toggleSorting(false)}
                onSortDesc={() => column.toggleSorting(true)}
                onHide={() => column.toggleVisibility(false)}
            />
        ),
        cell: ({ row }) => {
            return <div className='text-end'>{row.getValue("bidPrice")}</div>
        }
    }
]

export default function CampaignDatatable({
    pageNo,
    pageSize,
    data
}: {
    pageNo: number,
    pageSize: number
    data: CampaignTabularData
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
        manualPagination: true,
        onExpandedChange: setExpanded,
        rowCount: data.totalElements,
        state: {
            pagination,
            expanded
        }
    })

    const ExpandedRows = ({ row }: { row: Row<CampaignType> }) => {
        return (
            <div className='px-20 m-1'>
                <div className='m-2'>
                    <span>Exchanges:</span>
                    <span className='ml-3'>{row.original.supplyType}</span>
                </div>
                <div className='m-2'>
                    <span>Countries:</span>
                    <span className='ml-3'>{row.original.countries}</span>
                </div>
                <div className='m-2'>
                    <span>Carrier:</span>
                    <span className='ml-3'>{row.original.carriers}</span>
                </div>
                <div className='m-2'>
                    <span>Platforms:</span>
                    <span className='ml-3'>{row.original.platforms}</span>
                </div>
                <div className='m-2'>
                    <span>Devices:</span>
                    <span className='ml-3'>{row.original.deviceManufacturer}</span>
                </div>
                <div className='m-2'>
                    <span>Connection Type:</span>
                    <span className='ml-3'>{row.original.connectionType}</span>
                </div>
                <div className='m-2'>
                    <span>Freq Cap:</span>
                    <span className='ml-3'>{row.original.fcap}</span>
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
