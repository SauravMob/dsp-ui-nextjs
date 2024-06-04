import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import { LayoutDashboard } from 'lucide-react'

export default function Loading() {
  return (
    <div>
      <div className='flex justify-between'>
        <div className='font-bold flex items-center text-xl'>
          <LayoutDashboard size={20} className='mr-1' /> Dashboard
        </div>

        <div>
          <Skeleton className=' w-28 h-12 rounded-xl' />
        </div>
      </div>

      <div className='grid grid-cols-4 gap-6 mt-4'>
        <Skeleton className='w-100 h-[250px] rounded-xl' />
        <Skeleton className='w-100 h-[250px] rounded-xl' />
        <Skeleton className='w-100 h-[250px] rounded-xl' />
        <Skeleton className='w-100 h-[250px] rounded-xl' />
      </div>

      <div className='mt-5'>
        <Skeleton className='w-100 h-screen rounded-xl' />
      </div>
    </div>
  )
}
