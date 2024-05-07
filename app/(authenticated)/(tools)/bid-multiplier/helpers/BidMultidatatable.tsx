"use client"

import { fetchAllUsers } from '@/app/(authenticated)/(manage)/advertisers/actions'
import { fetchAllCampaigns } from '@/app/(authenticated)/(manage)/campaigns/actions'
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
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { updateBidMultiplier } from '../actions'
import { toast } from '@/components/ui/use-toast'

const updateStatus = async (status: string, bids: BidMultiType) => {
    const cr = { ...bids }
    cr.status = status
    const result = await updateBidMultiplier(cr.id, cr)
    if (result.status === 200) toast({ title: `Updated Successfully`, description: `Sucessfully updated bid multiplier` })
    else toast({ title: `Error occured`, description: result.message })
}

const columns = (isAdmin: boolean, campaignList: { id: number, name: string }[], userList: { id: number, name: string }[]) => {
    const data: ColumnDef<BidMultiType, any>[] = [
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
                                {!isAdmin && <Link href={`/bid-multiplier/edit/${row.original.id}`} className='flex items-center justify-start px-3 py-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800'><Edit size={18} className='mr-2' />Edit</Link>}
                                <PopoverClose asChild>
                                    <Button variant="ghost" size="sm" className='justify-start' onClick={() => updateStatus(getUpdateStatus(row.getValue("status")), row.original)}>{handleStatus(row.getValue("status"))}{getUpdateStatus(row.getValue("status"))}</Button>
                                </PopoverClose>
                                <ConfirmDialog
                                    title='Do you want to delete this Bidmultiplier?'
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
            accessorKey: "accountName",
            id: 'accountName',
            enableSorting: false,
            header: ({ column }) => (
                <CustomHeader
                    column={column}
                    title="Account"
                    className='justify-center'
                />
            ),
            cell: ({ row }) => {
                const campaignUser = userList?.filter(v => v.id === row.original.userId)
                return <div className='text-start'>{campaignUser[0]?.name}</div>
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
                const campName = campaignList.filter(v => v.id !== row.original.campaignId)[0]
                return <div className='text-start min-w-40'>{campName?.name}</div>
            }
        },
        {
            accessorKey: "exchangeBids",
            header: ({ column }) => (
                <CustomHeader
                    column={column}
                    title="Exchange Bids"
                    className='justify-center text-nowrap'
                />
            ),
            enableSorting: false,
            cell: ({ row }) => {
                const exchangeJson = row.original.exchangeBids ? JSON.parse(row.original.exchangeBids) : []
                const exchangeArray = Object.keys(exchangeJson)
                return <div className='text-start'>{
                    exchangeArray?.map((v, k) => {
                        return <div key={k}>
                            <div className='flex'>{v} : {exchangeJson[v]}</div>
                        </div>
                    })
                }</div>
            }
        },
        {
            accessorKey: "bundleBids",
            header: ({ column }) => (
                <CustomHeader
                    column={column}
                    title="Bundle Bids"
                    className='justify-center text-nowrap'
                />
            ),
            enableSorting: false,
            cell: ({ row }) => {
                const bundleJson = row.original.bundleBids ? JSON.parse(row.original.bundleBids) : []
                const bundleArray = Object.keys(bundleJson)
                return <div className='text-start'>{
                    bundleArray?.map((v, k) => {
                        return <div key={k}>
                            <div className='flex'>{v} : {bundleJson[v]}</div>
                        </div>
                    })
                }</div>
            }
        },
        {
            accessorKey: "regionBids",
            header: ({ column }) => (
                <CustomHeader
                    column={column}
                    title="Region Bids"
                    className='justify-center text-nowrap'
                />
            ),
            enableSorting: false,
            cell: ({ row }) => {
                const regionJson = row.original.regionBids ? JSON.parse(row.original.regionBids) : []
                const regionArray = Object.keys(regionJson)
                return <div className='text-start'>{
                    regionArray?.map((v, k) => {
                        return <div key={k}>
                            <div className='flex'>{v} : {regionJson[v]}</div>
                        </div>
                    })
                }</div>
            }
        },
        {
            accessorKey: "cityBids",
            header: ({ column }) => (
                <CustomHeader
                    column={column}
                    title="City Bids"
                    className='justify-center text-nowrap'
                />
            ),
            enableSorting: false,
            cell: ({ row }) => {
                const cityJson = row.original.cityBids ? JSON.parse(row.original.cityBids) : []
                const cityArray = Object.keys(cityJson)
                return <div className='text-start'>{
                    cityArray?.map((v, k) => {
                        return <div key={k}>
                            <div className='flex'>{v} : {cityJson[v]}</div>
                        </div>
                    })
                }</div>
            }
        },
        {
            accessorKey: "osBids",
            header: ({ column }) => (
                <CustomHeader
                    column={column}
                    title="OS Bids"
                    className='justify-center text-nowrap'
                />
            ),
            enableSorting: false,
            cell: ({ row }) => {
                const osJson = row.original.osBids ? JSON.parse(row.original.osBids) : []
                const osArray = Object.keys(osJson)
                return <div className='text-start'>{
                    osArray?.map((v, k) => {
                        return <div key={k}>
                            <div className='flex'>{v} : {osJson[v]}</div>
                        </div>
                    })
                }</div>
            }
        },
        {
            accessorKey: "maxBidPrice",
            header: ({ column }) => (
                <CustomHeader
                    column={column}
                    title="Max Bid Price"
                    className='justify-center text-nowrap'
                    onSortAsc={() => column.toggleSorting(false)}
                    onSortDesc={() => column.toggleSorting(true)}
                    onHide={() => column.toggleVisibility(false)}
                />
            ),
            cell: ({ row }) => {
                return <div className='text-center'>{row.getValue('maxBidPrice')}</div>
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

    return isAdmin ? data : data.filter(v => v.id !== 'accountName')
}

export default function BidMultidatatable({
    pageNo,
    pageSize,
    isAdmin,
    data
}: {
    pageNo: number,
    isAdmin: boolean,
    pageSize: number
    data: BidMultiTabularData
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
    const [userList, setUserList] = useState<{ id: number, name: string }[]>([])

    useEffect(() => {
        const fetchCampaignList = async () => {
            const campaignList = await fetchAllCampaigns({ pageNo: '0', pageSize: "50" })
            setCampaignList(campaignList.content.map((v: CampaignType) => ({ id: v.id, name: v.campaignName })))
        }
        fetchCampaignList()
        const fetchUserList = async () => {
            const userList = await fetchAllUsers({ pageNo: '0', pageSize: "512" })
            setUserList(userList.content.map((v: { id: number, email: string }) => ({ id: v.id, name: v.email })))
        }
        if (isAdmin) fetchUserList()
    }, [isAdmin])

    const table = useReactTable({
        data: data.content,
        columns: columns(isAdmin, campaignList, userList),
        getSortedRowModel: getSortedRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        rowCount: data.totalElements,
        state: { pagination }
    })

    return (
        <Card className='p-3'>
            <DataTable table={table} columns={columns(isAdmin, campaignList, userList)} />
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
