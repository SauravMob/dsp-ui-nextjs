"use client"

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import DataTable, { CustomHeader, CustomPagination } from '@/components/ui/datatable'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import ConfirmDialog from '@/components/utility/customComponents/ConfirmDialog'
import { getStatusAvatar, handleStatus } from '@/components/utility/utils/JSXUtils'
import { getContentWithLimit, getUpdateStatus } from '@/components/utility/utils/Utils'
import { ColumnDef, ExpandedState, PaginationState, Row, getCoreRowModel, getExpandedRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import { ChevronDown, ChevronUp, Edit, Ellipsis, PieChart, Trash, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useMemo, useState } from 'react'
import { updateCreative } from '../actions'
import { toast } from '@/components/ui/use-toast'
import { PopoverClose } from '@radix-ui/react-popover'
import AttachCampaign from '@/app/(authenticated)/(manage)/campaigns/helpers/AttachCampaign'
import DetachCampaign from '@/app/(authenticated)/(manage)/campaigns/helpers/DetachCampaign'

const updateStatus = async (status: string, creative: CreativeType) => {
    const cr = { ...creative }
    cr.status = status
    const result = await updateCreative(cr.id, cr)
    if (result.status === 200) toast({ title: `Updated Successfully`, description: `Sucessfully updated ${cr.adName} creative` })
    else toast({ title: `Error occured`, description: result.message })
}

const columns: ColumnDef<CreativeType, any>[] = [
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
                            <Link href={`/creatives/edit/${row.original.id}`} className='flex items-center justify-start px-3 py-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800'><Edit size={18} className='mr-2' />Edit</Link>
                            <PopoverClose asChild>
                                <Button variant="ghost" size="sm" className='justify-start' onClick={() => updateStatus(getUpdateStatus(row.getValue("status")), row.original)}>{handleStatus(row.getValue("status"))}{getUpdateStatus(row.getValue("status"))}</Button>
                            </PopoverClose>
                            <AttachCampaign creative={row.original} />
                            <DetachCampaign creative={row.original} />
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
        accessorKey: "adName",
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
            return <div className='text-start'>{row.getValue('adName')}</div>
        }
    },
    {
        accessorKey: "creativeType",
        header: ({ column }) => (
            <CustomHeader
                column={column}
                title="Ad Format"
                className='justify-center'
                onSortAsc={() => column.toggleSorting(false)}
                onSortDesc={() => column.toggleSorting(true)}
                onHide={() => column.toggleVisibility(false)}
            />
        ),
        enableSorting: false,
        cell: ({ row }) => {
            return <div className='text-start'>{row.getValue('creativeType') === "JS" ? "RICHMEDIA" : row.getValue("creativeType")}</div>
        }
    },
    {
        accessorKey: "creativeSize",
        header: ({ column }) => (
            <CustomHeader
                column={column}
                title="Ad Size"
                className='justify-center'
                onSortAsc={() => column.toggleSorting(false)}
                onSortDesc={() => column.toggleSorting(true)}
                onHide={() => column.toggleVisibility(false)}
            />
        ),
        enableSorting: false,
        cell: ({ row }) => {
            return <div className='text-start'>{row.getValue('creativeSize')}</div>
        }
    },
    {
        accessorKey: "creative_preview",
        header: ({ column }) => (
            <CustomHeader
                column={column}
                title="Preview"
                className='justify-center'
                onSortAsc={() => column.toggleSorting(false)}
                onSortDesc={() => column.toggleSorting(true)}
                onHide={() => column.toggleVisibility(false)}
            />
        ),
        enableSorting: false,
        cell: ({ row }) => {
            return <div className='text-start'>Preview</div>
        }
    },
    {
        accessorKey: "advDomain",
        header: ({ column }) => (
            <CustomHeader
                column={column}
                title="Advertiser Domain"
                className='justify-start'
                onSortAsc={() => column.toggleSorting(false)}
                onSortDesc={() => column.toggleSorting(true)}
                onHide={() => column.toggleVisibility(false)}
            />
        ),
        enableSorting: false,
        cell: ({ row }) => {
            return <div className='text-start'>{getContentWithLimit(row.getValue("advDomain"), 18)}</div>
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
            return <div className='text-center'>{row.getValue("status") === "INACTIVE" && row.original.deactiveFlag === 1 ? getStatusAvatar("DEACTIVE") : getStatusAvatar(row.getValue("status"))}</div>
        }
    },
    {
        accessorKey: "runningCampaigns",
        header: ({ column }) => (
            <CustomHeader
                column={column}
                title="Running on Campaigns"
                className='justify-center'
                onSortAsc={() => column.toggleSorting(false)}
                onSortDesc={() => column.toggleSorting(true)}
                onHide={() => column.toggleVisibility(false)}
            />
        ),
        cell: ({ row }) => {
            return <div className='text-center'>{row.getValue('runningCampaigns')}</div>
        }
    },
    {
        accessorKey: "pausedCamapigns",
        header: ({ column }) => (
            <CustomHeader
                column={column}
                title="Paused on Campaigns"
                className='justify-center'
                onSortAsc={() => column.toggleSorting(false)}
                onSortDesc={() => column.toggleSorting(true)}
                onHide={() => column.toggleVisibility(false)}
            />
        ),
        cell: ({ row }) => {
            return <div className='text-center'>{row.getValue('pausedCamapigns')}</div>
        }
    }
]


export default function CreativeDatatable({
    pageNo,
    pageSize,
    data
}: {
    pageNo: number,
    pageSize: number
    data: CreativeTabularData
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

    const ExpandedRows = ({ row }: { row: Row<CreativeType> }) => {
        return (
            <div className='px-20 m-1'>
                <div className='m-2'>
                    <span>Campaigns:</span>
                    <span className='ml-3'>{row.original.campaigns?.length ? row.original.campaigns.map(campaign => {
                        return <label key={campaign.id}>{campaign.name} {(campaign.id)}</label>
                    }) : '-'}</span>
                </div>
                <div className='m-2'>
                    <span>Redirect URL:</span>
                    <span className='ml-3'>{row.original.redirectUrl || '-'}</span>
                </div>
                <div className='m-2'>
                    <span>Ad Attribute:</span>
                    <span className='ml-3'>{row.original.iabAdAttribute || '-'}</span>
                </div>
                <div className='m-2'>
                    <span>Adv Domain:</span>
                    <span className='ml-3'>{row.original.advDomain || '-'}</span>
                </div>
                <div className='m-2'>
                    <span>Secure:</span>
                    <span className='ml-3'>{row.original.secureTag ? "YES" : "NO"}</span>
                </div>
                {row.original.creativeType === "JS" && <div className='m-2'>
                    <span>JS / Richmedia:</span>
                    <span className='ml-3'>{getContentWithLimit(row.original.rmaContent || '-', 128)}</span>
                </div>}
                {row.original.creativeType === "VIDEO" && <>
                    <div className='m-2'>
                        <span>Video Content:</span>
                        <span className='ml-3'>{getContentWithLimit(row.original.videoContent || '-', 128)}</span>
                    </div>
                    <div className='m-2'>
                        <span>Creative Size:</span>
                        <span className='ml-3'>{row.original.videoCreativeSize || '-'}</span>
                    </div>
                    <div className='m-2'>
                        <span>API Framework:</span>
                        <span className='ml-3'>{row.original.apiFramework || '-'}</span>
                    </div>
                    <div className='m-2'>
                        <span>MimeType:</span>
                        <span className='ml-3'>{row.original.videoMimeType || '-'}</span>
                    </div>
                    <div className='m-2'>
                        <span>Max Duration:</span>
                        <span className='ml-3'>{row.original.maxDuration || '-'}</span>
                    </div>
                    <div className='m-2'>
                        <span>Protocols:</span>
                        <span className='ml-3'>{row.original.protocols || '-'}</span>
                    </div>
                    <div className='m-2'>
                        <span>Playback Method:</span>
                        <span className='ml-3'>{row.original.playbackmethod || '-'}</span>
                    </div>
                    <div className='m-2'>
                        <span>Skip:</span>
                        <span className='ml-3'>{row.original.skip || '-'}</span>
                    </div>
                </>}
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
