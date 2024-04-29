import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'
import CreativeHeader from './helpers/CreativeHeader'
import { fetchAllCreatives, searchCreative } from './actions'
import CreativeDatatable from './helpers/CreativeDatatable'

export const metadata: Metadata = {
    title: "Mobavenue | Creatives List",
    description: "Mobavenue DSP creatives list"
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
    const campaignId = searchParams?.campaignId || ''
    const creativeId = searchParams?.creativeId || ''
    const status = searchParams?.status || 'ACTIVE'
    const creativeSize = searchParams?.creativeSize || ''
    const creativeType = searchParams?.creativeType || ''

    const tabularData = JSON.stringify(searchParams).length === 2 ? await fetchAllCreatives({ pageNo, pageSize }) : await searchCreative({ pageNo, pageSize, filter: { campaignId, status, creativeId, creativeSize, creativeType } })

    return (
        <div>
            <CreativeHeader
                pageNo={pageNo}
                pageSize={pageSize}
                campaignId={campaignId}
                creativeId={creativeId}
                status={status}
                creativeSize={creativeSize}
                creativeType={creativeType}
            />
            <div className='mt-5'>
                <CreativeDatatable pageNo={parseInt(pageNo)} pageSize={parseInt(pageSize)} data={tabularData} />
            </div>
        </div>
    )
}
