import { Metadata } from 'next'
import { cookies } from 'next/headers'
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

  const pageNo = searchParams?.pageNo ? searchParams.pageNo : "0"
  const pageSize = searchParams?.pageSize ? searchParams.pageSize : "50"
  const status = searchParams?.status || ''
  const audName = searchParams?.audName || ''
  const uploadType = searchParams?.uploadType || ''

  const tabularData = JSON.stringify(searchParams).length === 2 ? await fetchAllAudience({ pageNo, pageSize }) : await searchAudience({ pageNo, pageSize, filter: { status, audName, uploadType } })

  const isAdmin = cookies().get('roleId')?.value === '2'

  return (
    <div>
      <AudienceHeader
        pageSize={pageSize}
        status={status}
        audName={audName}
        uploadType={uploadType}
        isAdmin={isAdmin}
      />
      <div className='mt-5'>
        <AudienceDatatable pageNo={parseInt(pageNo)} pageSize={parseInt(pageSize)} data={tabularData} isAdmin={isAdmin}/>
      </div>
    </div>
  )
}
