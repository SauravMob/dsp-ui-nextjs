import { Metadata } from 'next'
import React from 'react'
import CampaignReportHeader from './helpers/CampaignReportHeader'
import { getCampaignReport } from './actions'
import { formatQryDate } from '@/components/utility/utils/Utils'
import CampaignReportDatatable from './helpers/CampaignReportDatatable'
import { cookies } from 'next/headers'

export const metadata: Metadata = {
    title: "Mobavenue | Campaign Report",
    description: "Mobavenue DSP campaign reports"
}

export default async function page({
    params,
    searchParams
}: {
    params: { slug: string }
    searchParams?: { [key: string]: string | undefined }
}) {

    const cumulativeNotAllowed = process.env.NEXT_APP_CUMULATIVE_NOT_ALLOWED?.split(',').includes(cookies().get('emailId')?.value || '')
    const exchangeFilterNotAllowed = process.env.NEXT_APP_EXCHANGE_FILTER_NOT_ALLOWED?.split(',').includes(cookies().get('emailId')?.value || '')

    const interval = searchParams?.interval || 'TODAY'
    const from = searchParams?.from || `${formatQryDate(new Date())}`
    const to = searchParams?.to || `${formatQryDate(new Date())}`
    const advertiserId = searchParams?.advertiserId ? searchParams.advertiserId : ""
    const exchange = searchParams?.exchange ? searchParams.exchange : ""
    const country = searchParams?.country ? searchParams.country : ""
    const os = searchParams?.os ? searchParams.os : ""
    const reportType = searchParams?.reportType ? searchParams.reportType : "DATEWISE"
    const campaignName = searchParams?.campaignName ? searchParams.campaignName : ""
    const pageNo = searchParams?.pageNo ? searchParams.pageNo : "0"
    const pageSize = searchParams?.pageSize ? searchParams.pageSize : "50"
    const sortBy = searchParams?.sortBy ? searchParams.sortBy : "date"
    const sortDirection = searchParams?.sortDirection ? searchParams.sortDirection : "DESC"

    const isAdmin = cookies().get('roleId')?.value === '2'

    const tabularData = await getCampaignReport({ pageNo, pageSize, sortBy, sortDirection, reportType, reportingSearchFilter: { startDate: from, endDate: to, campaignName, advertiserId: parseInt(advertiserId), country, os, exchange } })

    return (
        <div>
            <CampaignReportHeader
                pageSize={pageSize}
                interval={interval}
                from={from}
                to={to}
                advertiserId={advertiserId}
                exchange={exchange}
                campaignName={campaignName}
                reportType={reportType}
                country={country}
                os={os}
                isAdmin={isAdmin}
                tabularData={tabularData}
                cumulativeNotAllowed={cumulativeNotAllowed}
                exchangeFilterNotAllowed={exchangeFilterNotAllowed}
            />
            <div className='mt-5'>
                <CampaignReportDatatable pageNo={parseInt(pageNo)} pageSize={parseInt(pageSize)} data={tabularData} reportType={reportType} />
            </div>
        </div>
    )
}
