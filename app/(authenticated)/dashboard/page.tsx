import React from 'react'

import { getClickReport, getEstimateReport, getImpressionReport, getWinRateReport } from './_actions'
import dynamic from 'next/dynamic'
import EstimationCard from '@/components/utility/customComponents/EstimationCard'
import DashboardHeaders from './helpers/DashboardHeaders'
const AreaChart = dynamic(() => import('@/components/utility/customComponents/AreaChart'), {
    ssr: false,
})

export default async function pages({
    params,
    searchParams,
}: {
    params: { slug: string };
    searchParams?: { [key: string]: string | undefined };
}) {

    const interval = searchParams?.interval || "LAST_SEVEN_DAYS"

    const impressionData = await getImpressionReport(interval)
    const clickData = await getClickReport(interval)
    const winRateData = await getWinRateReport(interval)
    const estimateData = await getEstimateReport(interval)

    return (
        <div>
            <DashboardHeaders interval={interval}/>

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
                    <EstimationCard data={estimateData} />
                </div>
            </div>
        </div>
    )
}
