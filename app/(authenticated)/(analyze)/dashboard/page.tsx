import React from 'react'

import { getBarChartData, getClickReport, getEstimateReport, getImpressionReport, getTabularReport, getWinRateReport } from '../actions'
import dynamic from 'next/dynamic'
import EstimationCard from '../customCharts/EstimationCard'
import DashboardHeaders from './helpers/DashboardHeaders'
import DashboardDatatable from './helpers/DashboardDatatable'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
const AreaChart = dynamic(() => import('../customCharts/AreaChart'), {
    ssr: false
})
const BarChart = dynamic(() => import('../customCharts/BarChart'), {
    ssr: false
})

export const metadata: Metadata = {
    title: "Mobavenue | Dashboard",
    description: "Mobavenue DSP dashboard for users"
}

export default async function pages({
    params,
    searchParams
}: {
    params: { slug: string }
    searchParams?: { [key: string]: string | undefined }
}) {

    const roleId = cookies().get('roleId')?.value
    if (roleId === "2") redirect('/not-found')

    const interval = searchParams?.interval || "LAST_SEVEN_DAYS"
    const from = interval === 'CUSTOM' ? searchParams?.from : ''
    const to = interval === 'CUSTOM' ? searchParams?.to : ''
    const reportType = searchParams?.reportType ? searchParams.reportType : "impressions"
    const campaignId = searchParams?.campaignId ? searchParams.campaignId : ""
    const creativeId = searchParams?.creativeId ? searchParams.creativeId : ""

    const impressionData = await getImpressionReport(interval, from, to)
    const clickData = await getClickReport(interval, from, to)
    const winRateData = await getWinRateReport(interval, from, to)
    const estimateData = await getEstimateReport(interval, from, to)
    const tabularData = await getTabularReport(interval, from, to)

    const barData = await getBarChartData(interval, from, to, reportType, campaignId, creativeId)

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
            <div className='mt-5'>
                <BarChart data={barData} reportType={reportType} campaignId={campaignId} creativeId={creativeId} />
            </div>
        </div>
    )
}
