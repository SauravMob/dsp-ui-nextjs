import { Metadata } from 'next'
import { cookies } from 'next/headers'
import React from 'react'
import { fetchAllBidMultiplier, searchBidMultiplier } from './actions'
import BidMultiHeader from './helpers/BidMultiHeader'
import BidMultidatatable from './helpers/BidMultidatatable'

export const metadata: Metadata = {
    title: "Mobavenue | Bid Multiplier List",
    description: "Mobavenue DSP bid multiplier list"
}

export default async function page({
    params,
    searchParams
}: {
    params: { slug: string }
    searchParams?: { [key: string]: string | undefined }
}) {

    const pageNo = searchParams?.pageNo ? searchParams.pageNo : "0"
    const pageSize = searchParams?.pageSize ? searchParams.pageSize : "50"
    const status = searchParams?.status || ''
    const campaignId = searchParams?.audName || ''

    const tabularData = !status && !campaignId ? await fetchAllBidMultiplier({ pageNo, pageSize }) : await searchBidMultiplier({ pageNo, pageSize, campaignId, status })

    const isAdmin = cookies().get('roleId')?.value === '2'

    return (
        <div>
            <BidMultiHeader
                pageSize={pageSize}
                status={status}
                campaignId={campaignId}
                isAdmin={isAdmin}
            />
            <div className='mt-5'>
                <BidMultidatatable pageNo={parseInt(pageNo)} pageSize={parseInt(pageSize)} data={tabularData} isAdmin={isAdmin} />
            </div>
        </div>
    )
}
