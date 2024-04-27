import React from 'react'
import CampaignHeader from './helpers/CampaignHeader'
import CampaignDatatable from './helpers/CampaignDatatable'
import { fetchAllCampaigns, searchCampaign } from './actions'

export default async function page({
  params,
  searchParams
}: {
  params: { slug: string }
  searchParams?: { [key: string]: string | undefined }
}) {

  const pageNo = searchParams?.pageNo ? searchParams.pageNo : "0"
  const pageSize = searchParams?.pageSize ? searchParams.pageSize : "50"
  const campaignId = searchParams?.campaignId || ''
  const status = searchParams?.status || ''
  const country = searchParams?.country || ''
  const os = searchParams?.os || ''

  const tabularData = JSON.stringify(searchParams).length === 2 ? await fetchAllCampaigns({ pageNo, pageSize }) : await searchCampaign({ pageNo, pageSize, filter: { campaignId, status, os, country } })

  return (
    <div>
      <CampaignHeader
        pageNo={pageNo}
        pageSize={pageSize}
        campaignId={campaignId}
        status={status}
        country={country}
        os={os}
      />
      <div className='mt-5'>
        <CampaignDatatable pageNo={parseInt(pageNo)} pageSize={parseInt(pageSize)} data={tabularData} />
      </div>
    </div>
  )
}
