import React from 'react'

import { LayoutDashboard } from 'lucide-react'
import { getClickReport, getImpressionReport, getWinRateReport } from './_actions'
import dynamic from 'next/dynamic'
const AreaChart = dynamic(() => import('@/components/utility/customComponents/AreaChart'), {
    ssr: false,
})

export default async function pages() {
    const impressionData = await getImpressionReport()
    const clickData = await getClickReport()
    const winRateData = await getWinRateReport()
    return (
        <div>
            <div className='font-bold mb-4 text-2xl flex items-center'>
                <LayoutDashboard size={20} className='mr-1' /> Dashboard
            </div>

            <div className='grid grid-cols-4 gap-6'>
                <div className='col-span-1 flex justify-center'>
                    <AreaChart data={impressionData} chartName='Impressions' color='#126352' interval='LAST_SEVEN_DAYS' />
                </div>
                <div className='col-span-1 flex justify-center'>
                    <AreaChart data={clickData} chartName='Clicks' color='#983232' interval='LAST_SEVEN_DAYS' />
                </div>
                <div className='col-span-1 flex justify-center'>
                    <AreaChart data={winRateData} chartName='WinRate' color='#AA2498' interval='LAST_SEVEN_DAYS' />
                </div>
                <div className='col-span-1 flex justify-center'>
                    {/* <AreaChart data={report} /> */}
                </div>
            </div>
        </div>
    )
}
