import { LayoutDashboard } from 'lucide-react'
import React from 'react'
import AdminDashboardSheet from './AdminDashboardSheet'

export default function AdminDashboardHeader({
    interval,
    reportType,
    advertiserId,
    sspUserId,
    pageSize
}: {
    interval: string
    reportType: string
    advertiserId: string
    sspUserId: string,
    pageSize: string
}) {
    return (
        <div className='mb-4 flex justify-between'>
            <div className='font-bold flex items-center text-2xl'>
                <LayoutDashboard size={20} className='mr-1' /> Admin Dashboard
            </div>

            <div>
                <AdminDashboardSheet interval={interval} reportType={reportType} advertiserId={advertiserId} sspUserId={sspUserId} pageSize={pageSize}/>
            </div>
        </div>
    )
}