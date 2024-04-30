import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'
import CampaignManagerHeader from './helpers/CampaignManagerHeader'
import { fetchAllCampaigns, searchCampaign } from '../campaigns/actions'
import CampaignManagerDatatable from './helpers/CampaignManagerDatatable'

export default async function page({
    params,
    searchParams
}: {
    params: { slug: string }
    searchParams?: { [key: string]: string | undefined }
}) {

    const roleId = cookies().get('roleId')?.value
    if (roleId !== "2") redirect('/not-found')

    const pageNo = searchParams?.pageNo ? searchParams.pageNo : "0"
    const pageSize = searchParams?.pageSize ? searchParams.pageSize : "50"
    const campaignId = searchParams?.campaignId || ''
    const status = searchParams?.status || ''
    const country = searchParams?.country || ''
    const os = searchParams?.os || ''
    const accountManagerId = searchParams?.accountManagerId || ''
    const advertiserId = searchParams?.advertiserId || ''

    const tabularData = JSON.stringify(searchParams).length === 2 ? await fetchAllCampaigns({ pageNo, pageSize }) : await searchCampaign({ pageNo, pageSize, filter: { campaignId, status, os, country, advertiserId, accountManagerId } })

    return (
        <div>
            <CampaignManagerHeader
                pageSize={pageSize}
                campaignId={campaignId}
                status={status}
                country={country}
                os={os}
                advertiserId={advertiserId}
                accountManagerId={accountManagerId}
            />
            <div className='mt-5'>
                <CampaignManagerDatatable pageNo={parseInt(pageNo)} pageSize={parseInt(pageSize)} data={tabularData} />
            </div>
        </div>
    )
}
