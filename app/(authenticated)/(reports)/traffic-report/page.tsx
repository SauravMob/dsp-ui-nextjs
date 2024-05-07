import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'
import TrafficReportHeader from './helpers/TrafficReportHeader'
import { getAdminTabularReport } from '../../(analyze)/actions'
import TrafficReportDatatable from './helpers/TrafficReportDatatable'

export const metadata: Metadata = {
  title: "Mobavenue | Traffic Report",
  description: "Mobavenue DSP traffic reports"
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
  const exchangeFilterNotAllowed = !process.env.NEXT_APP_EXCHANGE_FILTER_NOT_ALLOWED?.split(',').includes(cookies().get('emailId')?.value || '')

  const interval = searchParams?.interval || "THIS_MONTH"
  const from = searchParams?.from || ''
  const to = searchParams?.to || ''
  const advertiserId = searchParams?.advertiserId ? searchParams.advertiserId : ""
  const sspUserId = searchParams?.sspUserId ? searchParams.sspUserId : ""
  const pageNo = searchParams?.pageNo ? searchParams.pageNo : "0"
  const pageSize = searchParams?.pageSize ? searchParams.pageSize : "50"

  const tabularData = await getAdminTabularReport(interval, from, to, advertiserId, sspUserId, pageNo, pageSize)

  return (
    <div>
      <TrafficReportHeader
        pageSize={pageSize}
        interval={interval}
        from={from}
        to={to}
        advertiserId={advertiserId}
        sspUserId={sspUserId}
        exchangeFilterNotAllowed={exchangeFilterNotAllowed}
      />
      <div className='mt-5'>
        <TrafficReportDatatable interval={interval} pageNo={parseInt(pageNo)} pageSize={parseInt(pageSize)} data={tabularData} />
      </div>
    </div>
  )
}
