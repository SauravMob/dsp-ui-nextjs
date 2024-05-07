import { formatQryDate } from '@/components/utility/utils/Utils'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import React from 'react'
import SiteappReportHeader from './helpers/SiteappReportHeader'
import { fetchAllBidMultiplier, getSiteAppReport } from './actions'
import SiteappDatatable from './helpers/SiteappDatatable'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
    title: "Mobavenue | SiteApp Report",
    description: "Mobavenue DSP siteapp reports"
}

export default async function page({
    params,
    searchParams
}: {
    params: { slug: string }
    searchParams?: { [key: string]: string | undefined }
}) {

    const siteAppNotAllowed = process.env.NEXT_PUBLIC_SITEAPP_REPORT_NOT_ALLOWED?.split(',').includes(cookies().get("emailId")?.value || '')
    const sspIsAllowed = process.env.NEXT_APP_SITEAPP_SSP_ALLOWED?.split(',').includes(cookies().get('emailId')?.value || '')
    const exchangeFilterNotAllowed = !process.env.NEXT_APP_EXCHANGE_FILTER_NOT_ALLOWED?.split(',').includes(cookies().get('emailId')?.value || '')

    if (siteAppNotAllowed) redirect('/not-found')

    const interval = searchParams?.interval || 'TODAY'
    const from = searchParams?.from || `${formatQryDate(new Date())}`
    const to = searchParams?.to || `${formatQryDate(new Date())}`
    const advertiserId = searchParams?.advertiserId ? searchParams.advertiserId : ""
    const campaignName = searchParams?.campaignName ? searchParams?.campaignName : ""
    const creativeName = searchParams?.creativeName ? searchParams?.creativeName : ""
    const exchangeId = searchParams?.exchangeId ? searchParams?.exchangeId : ""
    const reportType = searchParams?.reportType ? searchParams.reportType : "DATEWISE"
    const pageNo = searchParams?.pageNo ? searchParams.pageNo : "0"
    const pageSize = searchParams?.pageSize ? searchParams.pageSize : "50"
    const sortBy = searchParams?.sortBy ? searchParams.sortBy : "date"
    const sortDirection = searchParams?.sortDirection ? searchParams.sortDirection : "DESC"

    const customFeatures = cookies().get('customFeatures')?.value || ''

    const isAdmin = cookies().get('roleId')?.value === '2'

    const bidData = await fetchAllBidMultiplier({ pageNo: '0', pageSize: '512' })
    const existingBids = bidData.content.map((v: any) => v.campaignId)
    const tabularData = await getSiteAppReport({ pageNo, pageSize, sortBy, sortDirection, reportType, interval, from, to, campaignName, creativeName, advertiserId, exchangeId })

    return (
        <div>
            <SiteappReportHeader
                pageSize={pageSize}
                interval={interval}
                from={from}
                to={to}
                advertiserId={advertiserId}
                reportType={reportType}
                campaignName={campaignName}
                exchangeId={exchangeId}
                creativeName={creativeName}
                isAdmin={isAdmin}
                tabularData={tabularData}
                exchangeFilterNotAllowed={exchangeFilterNotAllowed}
            />
            <div className='mt-5'>
                <SiteappDatatable
                    customFeatures={customFeatures}
                    existingBids={existingBids}
                    pageNo={parseInt(pageNo)}
                    pageSize={parseInt(pageSize)}
                    data={tabularData}
                    reportType={reportType}
                    sspIsAllowed={sspIsAllowed}
                />
            </div>
        </div>
    )
}
