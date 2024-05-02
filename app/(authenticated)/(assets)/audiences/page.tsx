import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'
import AudienceHeader from './helpers/AudienceHeader'
import { fetchAllAudience, searchAudience } from './actions'
import AudienceDatatable from './helpers/AudienceDatatable'

export const metadata: Metadata = {
  title: "Mobavenue | Audiences List",
  description: "Mobavenue DSP audiences list"
}

export default async function page({
  params,
  searchParams
}: {
  params: { slug: string }
  searchParams?: { [key: string]: string | undefined }
}) {

  const roleId = cookies().get('roleId')?.value
  if (roleId === "2") redirect('/not-found')

  const pageNo = searchParams?.pageNo ? searchParams.pageNo : "0"
  const pageSize = searchParams?.pageSize ? searchParams.pageSize : "50"
  const status = searchParams?.status || ''
  const audName = searchParams?.audName || ''

  const tabularData = JSON.stringify(searchParams).length === 2 ? await fetchAllAudience({ pageNo, pageSize }) : await searchAudience({ pageNo, pageSize, filter: { status, audName } })

  return (
    <div>
      <AudienceHeader
        pageSize={pageSize}
        status={status}
        audName={audName}
      />
      <div className='mt-5'>
        <AudienceDatatable pageNo={parseInt(pageNo)} pageSize={parseInt(pageSize)} data={tabularData} />
      </div>
    </div>
  )
}
