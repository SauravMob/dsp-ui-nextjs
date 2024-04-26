import React from 'react'
import { getAdminTabularReport, getBidsChartData, getClicksChartData, getEstimateReport, getImpressionChartData } from '../actions'
import AdminDashboardHeader from './helpers/AdminDashboardHeader'
import dynamic from 'next/dynamic'
import EstimationCard from '../customCharts/EstimationCard'
import AdminDashboardDatatable from './helpers/AdminDashboardDatatable'
const AreaChart = dynamic(() => import('../customCharts/AreaChart'), {
  ssr: false
})

export default async function page({
  params,
  searchParams
}: {
  params: { slug: string }
  searchParams?: { [key: string]: string | undefined }
}) {
  const interval = searchParams?.interval || "TODAY"
  const from = interval === 'CUSTOM' ? searchParams?.from : ''
  const to = interval === 'CUSTOM' ? searchParams?.to : ''
  const reportType = searchParams?.reportType ? searchParams?.reportType : "impressions"
  const advertiserId = searchParams?.advertiserId ? searchParams.advertiserId : ""
  const sspUserId = searchParams?.sspUserId ? searchParams.sspUserId : ""
  const pageNo = searchParams?.pageNo ? searchParams.pageNo : "0"
  const pageSize = searchParams?.pageSize ? searchParams.pageSize : "2"

  const impressionData = await getImpressionChartData(interval, from, to, advertiserId, sspUserId)
  const clicksData = await getClicksChartData(interval, from, to, advertiserId, sspUserId)
  const bidsData = await getBidsChartData(interval, from, to, advertiserId, sspUserId)
  const estimateData = await getEstimateReport(interval, from, to)
  const tabularData = await getAdminTabularReport(interval, from, to, advertiserId, sspUserId, pageNo, pageSize)

  return (
    <div>
      <AdminDashboardHeader interval={interval} reportType={reportType} advertiserId={advertiserId} sspUserId={sspUserId} />
      <div className='grid grid-cols-4 gap-6'>
        <div className='col-span-3 flex justify-center'>
          <AreaChart
            data={reportType === "impressions" ? impressionData : reportType === "clicks" ? clicksData : bidsData}
            chartName={reportType === "impressions" ? "Impressions" : reportType === "clicks" ? "Clicks" : "Bids"}
            isDouble={interval === "TODAY_YESTERDAY"}
            color='#126352'
            height={200}
            interval={interval}
          />
        </div>
        <div className='col-span-1 flex justify-center'>
          <EstimationCard data={estimateData} />
        </div>
      </div>
      <div className='mt-5'>
        <AdminDashboardDatatable interval={interval} data={tabularData} pageNo={parseInt(pageNo)} pageSize={parseInt(pageSize)} />
      </div>
    </div>
  )
}
