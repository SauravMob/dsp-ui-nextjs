import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'
import AdvertiserHeaders from './helpers/AdvertiserHeaders'
import { fetchAllUsers } from './actions'
import AdvertiserDatatable from './helpers/AdvertiserDatatable'

export const metadata: Metadata = {
    title: "Mobavenue | Advertisers List",
    description: "Mobavenue DSP adertisers"
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

    const pageNo = searchParams?.pageNo ? searchParams.pageNo : "0"
    const pageSize = searchParams?.pageSize ? searchParams.pageSize : "50"
    const status = searchParams?.status || ''
    const email = searchParams?.email || ''

    const tabularData = await fetchAllUsers({ pageNo, pageSize, status, email })

    return (
        <div>
            <AdvertiserHeaders
                pageSize={pageSize}
                status={status}
                email={email}
            />
            <div className='mt-5'>
                <AdvertiserDatatable pageNo={parseInt(pageNo)} pageSize={parseInt(pageSize)} data={tabularData} />
            </div>
        </div>
    )
}
