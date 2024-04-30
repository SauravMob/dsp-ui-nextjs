"use client"

import { Card } from '@/components/ui/card'
import DataTable, { CustomHeader, CustomPagination } from '@/components/ui/datatable'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { getStatusAvatar } from '@/components/utility/utils/JSXUtils'
import { getDateForPosix } from '@/components/utility/utils/Utils'
import { ColumnDef, PaginationState, getCoreRowModel, getExpandedRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import { Edit, Ellipsis, PieChart, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useMemo } from 'react'
import SettingsModal from './SettingsModal'

const columns: ColumnDef<CampaignType, any>[] = [
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
              <SettingsModal campaign={row.original} />
              <Link href={`/campaign-report?campaignName=${row.original.campaignName}`} className='flex items-center justify-start px-3 py-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800'><PieChart size={18} className='mr-2' />View Report</Link>
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
      return <div className='text-start'>{<Link href={`/creative-manager?campaignId=${row.getValue("id")}`}>{row.getValue('campaignName')}</Link>}</div>
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
    accessorKey: "amountSpent",
    header: ({ column }) => (
      <CustomHeader
        column={column}
        title="Amount Spent"
        className='justify-center'
        onSortAsc={() => column.toggleSorting(false)}
        onSortDesc={() => column.toggleSorting(true)}
        onHide={() => column.toggleVisibility(false)}
      />
    ),
    cell: ({ row }) => {
      return <div className='text-center'>{`$ ${row.getValue("amountSpent") ? row.original.amountSpent.toFixed(2) : "0.00"}`}</div>
    }
  },
  {
    accessorKey: "dailyAmountSpent",
    header: ({ column }) => (
      <CustomHeader
        column={column}
        title="Daily Spent"
        className='justify-center'
        onSortAsc={() => column.toggleSorting(false)}
        onSortDesc={() => column.toggleSorting(true)}
        onHide={() => column.toggleVisibility(false)}
      />
    ),
    cell: ({ row }) => {
      return <div className='text-center'>{`$ ${row.getValue("dailyAmountSpent") ? row.original.dailyAmountSpent.toFixed(2) : "0.00"}`}</div>
    }
  },
  {
    accessorKey: "lastModifiedOn",
    header: ({ column }) => (
      <CustomHeader
        column={column}
        title="Last Modified"
        className='justify-center'
        onSortAsc={() => column.toggleSorting(false)}
        onSortDesc={() => column.toggleSorting(true)}
        onHide={() => column.toggleVisibility(false)}
      />
    ),
    cell: ({ row }) => {
      return <div className='text-center'>{getDateForPosix(parseInt(row.original.lastModifiedOn), 'SECONDS')}</div>
    }
  }
]

export default function CampaignManagerDatatable({
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

  const table = useReactTable({
    data: data.content,
    columns,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    manualPagination: true,
    rowCount: data.totalElements,
    state: {
      pagination
    }
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
