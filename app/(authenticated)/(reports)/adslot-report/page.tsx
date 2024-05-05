import { formatQryDate } from '@/components/utility/utils/Utils'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'
import { getExchangePlacementDataList, searchtExchangePlacementData } from './actions'
import AdslotReportHeader from './helpers/AdslotReportHeader'
import AdslotReportDatatable from './helpers/AdslotReportDatatable'

export const metadata: Metadata = {
    title: "Mobavenue | AdSlot Report",
    description: "Mobavenue DSP adslot reports"
}

export default async function page({
    params,
    searchParams
}: {
    params: { slug: string }
    searchParams?: { [key: string]: string | undefined }
}) {

    const roleId = cookies().get('roleId')?.value
    if (roleId !== "2") redirect('/not-found')

    const interval = searchParams?.interval || 'TODAY'
    const from = searchParams?.from || `${formatQryDate(new Date())}`
    const to = searchParams?.to || `${formatQryDate(new Date())}`
    const bundleId = searchParams?.bundleId ? searchParams.bundleId : ""
    const exchangeId = searchParams?.exchangeId ? searchParams?.exchangeId : ""
    const pageNo = searchParams?.pageNo ? searchParams.pageNo : "0"
    const pageSize = searchParams?.pageSize ? searchParams.pageSize : "50"

    let tabularData = []

    if (!bundleId && !exchangeId) tabularData = await getExchangePlacementDataList({ pageNo, pageSize })
    else tabularData = await searchtExchangePlacementData({ pageNo, pageSize, interval, from, to, bundleId, exchangeId })

    return (
        <div>
            <AdslotReportHeader
                pageSize={pageSize}
                interval={interval}
                from={from}
                to={to}
                exchangeId={exchangeId}
                bundleId={bundleId}
                tabularData={tabularData}
            />
            <div className='mt-5'>
                <AdslotReportDatatable pageNo={parseInt(pageNo)} pageSize={parseInt(pageSize)} data={tabularData} />
            </div>
        </div>
    )
}
