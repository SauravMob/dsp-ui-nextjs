import { Metadata } from 'next'
import { cookies } from 'next/headers'
import React from 'react'
import { getAllApplists, searchApplist } from './actions'
import ApplistHeader from './helpers/ApplistHeader'
import ApplistDatatable from './helpers/ApplistDatatable'

export const metadata: Metadata = {
    title: "Mobavenue | Applists List",
    description: "Mobavenue DSP applists list"
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
    const searchParam = searchParams?.searchParam || ''
    const status = searchParams?.status || 'ACTIVE'

    const tabularData = !searchParam ? await getAllApplists({ pageNo, pageSize, status }) : await searchApplist({ pageNo, pageSize, searchParam })
    const isAdmin = cookies().get('roleId')?.value === '2'

    return (
        <div>
            <ApplistHeader
                pageSize={pageSize}
                searchParam={searchParam}
                status={status}
                isAdmin={isAdmin}
            />
            <div className='mt-5'>
                <ApplistDatatable pageNo={parseInt(pageNo)} pageSize={parseInt(pageSize)} data={tabularData} />
            </div>
        </div>
    )
}
