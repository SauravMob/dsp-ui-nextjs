import { formatQryDate } from '@/components/utility/utils/Utils'
import { Metadata } from 'next'
import React from 'react'
import { getCreativeReport } from './actions'
import CreativeReportHeader from './helpers/CreativeReportHeader'
import { cookies } from 'next/headers'
import CreativeReportDatatable from './helpers/CreativeReportDatatable'

export const metadata: Metadata = {
    title: "Mobavenue | Creative Report",
    description: "Mobavenue DSP creative reports"
}

export default async function page({
    params,
    searchParams
}: {
    params: { slug: string }
    searchParams?: { [key: string]: string | undefined }
}) {

    const interval = searchParams?.interval || 'TODAY'
    const from = searchParams?.from || `${formatQryDate(new Date())}`
    const to = searchParams?.to || `${formatQryDate(new Date())}`
    const advertiserId = searchParams?.advertiserId ? searchParams.advertiserId : ""
    const campaignId = searchParams?.campaignId ? searchParams.campaignId : ""
    const creativeId = searchParams?.creativeId ? searchParams?.creativeId : ""
    const creativeName = searchParams?.creativeName ? searchParams?.creativeName : ""
    const reportType = searchParams?.reportType ? searchParams.reportType : "DATEWISE"
    const pageNo = searchParams?.pageNo ? searchParams.pageNo : "0"
    const pageSize = searchParams?.pageSize ? searchParams.pageSize : "50"
    const sortBy = searchParams?.sortBy ? searchParams.sortBy : "date"
    const sortDirection = searchParams?.sortDirection ? searchParams.sortDirection : "DESC"

    const customFeatures = cookies().get('userCustomFeatures')?.value || ''
    const isAdmin = cookies().get('roleId')?.value === '2'

    const tabularData = await getCreativeReport({ pageNo, pageSize, sortBy, sortDirection, userId: advertiserId, filter: { startDate: from, endDate: to, creativeName, creativeId: parseInt(creativeId), campaignId: parseInt(campaignId), interval, reportType } })


    return (
        <div>
            <CreativeReportHeader
                pageSize={pageSize}
                interval={interval}
                from={from}
                to={to}
                advertiserId={advertiserId}
                reportType={reportType}
                campaignId={campaignId}
                creativeId={creativeId}
                creativeName={creativeName}
                isAdmin={isAdmin}
                tabularData={tabularData}
            />
            <div className='mt-5'>
                <CreativeReportDatatable customFeatures={customFeatures} pageNo={parseInt(pageNo)} pageSize={parseInt(pageSize)} data={tabularData} reportType={reportType} />
            </div>
        </div>
    )
}
