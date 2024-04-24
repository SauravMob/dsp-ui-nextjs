import React from 'react'

import { getClickReport, getEstimateReport, getImpressionReport, getTabularReport, getWinRateReport } from './actions'
import dynamic from 'next/dynamic'
import EstimationCard from '@/components/utility/customComponents/EstimationCard'
import DashboardHeaders from './helpers/DashboardHeaders'
import DashboardDatatable from './helpers/DashboardDatatable'
const AreaChart = dynamic(() => import('@/components/utility/customComponents/AreaChart'), {
    ssr: false
})

export default async function pages({
    params,
    searchParams
}: {
    params: { slug: string }
    searchParams?: { [key: string]: string | undefined }
}) {

    const interval = searchParams?.interval || "LAST_SEVEN_DAYS"
    const from = interval === 'CUSTOM' ? searchParams?.from : ''
    const to = interval === 'CUSTOM' ? searchParams?.to : ''

    const impressionData = await getImpressionReport(interval, from, to)
    const clickData = await getClickReport(interval, from, to)
    const winRateData = await getWinRateReport(interval, from, to)
    const estimateData = await getEstimateReport(interval, from, to)
    const tabularData = await getTabularReport(interval, from, to)

    return (
        <div>
            <DashboardHeaders interval={interval} />
            <div className='grid grid-cols-4 gap-6'>
                <div className='col-span-1 flex justify-center'>
                    <AreaChart data={impressionData} chartName='Impressions' color='#126352' interval={interval} />
                </div>
                <div className='col-span-1 flex justify-center'>
                    <AreaChart data={clickData} chartName='Clicks' color='#983232' interval={interval} />
                </div>
                <div className='col-span-1 flex justify-center'>
                    <AreaChart data={winRateData} chartName='WinRate' color='#AA2498' interval={interval} />
                </div>
                <div className='col-span-1 flex justify-center'>
                    <EstimationCard data={estimateData} />
                </div>
            </div>
            <div className='mt-5'>
                <DashboardDatatable data={tabularData} />
            </div>
        </div>
    )
}
