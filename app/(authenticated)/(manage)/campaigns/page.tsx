import React from 'react'
import CampaignHeader from './helpers/CampaignHeader'

export default function page({
  params,
  searchParams
}: {
  params: { slug: string }
  searchParams?: { [key: string]: string | undefined }
}) {

  const pageNo = searchParams?.pageNo ? searchParams.pageNo : "0"
  const pageSize = searchParams?.pageSize ? searchParams.pageSize : "10"
  const campaignId = searchParams?.campaignId || ''
  const status = searchParams?.status || ''
  const country = searchParams?.country || ''
  const os = searchParams?.os || ''

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
    </div>
  )
}
