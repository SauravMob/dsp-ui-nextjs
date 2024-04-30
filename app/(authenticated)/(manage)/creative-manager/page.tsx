import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'
import { fetchAllCreatives, searchCreative } from '../../(assets)/creatives/actions'
import CreativeManagerHeader from './helpers/CreativeManagerHeader'
import CreativeManagerDatatable from './helpers/CreativeManagerDatatable'

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
    const creativeId = searchParams?.creativeId || ''
    const creativeSize = searchParams?.creativeSize || ''
    const creativeType = searchParams?.creativeType || ''
    const advertiserId = searchParams?.advertiserId || ''

    const tabularData = JSON.stringify(searchParams).length === 2 ? await fetchAllCreatives({ pageNo, pageSize }) : await searchCreative({ pageNo, pageSize, filter: { campaignId, creativeId, creativeSize, creativeType, advertiserId } })

    return (
        <div>
            <CreativeManagerHeader
                pageSize={pageSize}
                campaignId={campaignId}
                creativeId={creativeId}
                creativeSize={creativeSize}
                creativeType={creativeType}
                advertiserId={advertiserId}
            />
            <div className='mt-5'>
                <CreativeManagerDatatable pageNo={parseInt(pageNo)} pageSize={parseInt(pageSize)} data={tabularData} />
            </div>
        </div>
    )
}
