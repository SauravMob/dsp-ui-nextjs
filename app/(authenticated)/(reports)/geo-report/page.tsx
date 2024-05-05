import { formatQryDate } from '@/components/utility/utils/Utils'
import { Metadata } from 'next'
import React from 'react'
import { getCampaignGeoReport } from './actions'
import GeoReportHeader from './helpers/GeoReportHeader'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import GeoReportDatatable from './helpers/GeoReportDatatable'

export const metadata: Metadata = {
  title: "Mobavenue | Geo Report",
  description: "Mobavenue DSP geo reports"
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
  const advertiserId = searchParams?.advertiserId ? searchParams.advertiserId : ""
  const campaignId = searchParams?.campaignId ? searchParams?.campaignId : ""
  const country = searchParams?.country ? searchParams?.country : ""
  const ssp = searchParams?.ssp ? searchParams?.ssp : ""
  const pageNo = searchParams?.pageNo ? searchParams.pageNo : "0"
  const pageSize = searchParams?.pageSize ? searchParams.pageSize : "50"

  const tabularData = await getCampaignGeoReport({ pageNo, pageSize, interval, from, to, campaignId, country, advertiserId, ssp })

  return (
    <div>
      <GeoReportHeader
        pageSize={pageSize}
        interval={interval}
        from={from}
        to={to}
        advertiserId={advertiserId}
        campaignId={campaignId}
        ssp={ssp}
        country={country}
        tabularData={tabularData}
      />
      <div className='mt-5'>
        <GeoReportDatatable pageNo={parseInt(pageNo)} pageSize={parseInt(pageSize)} data={tabularData} />
      </div>
    </div>
  )
}
