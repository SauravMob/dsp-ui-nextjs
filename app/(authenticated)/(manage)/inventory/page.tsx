import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'
import { fetchAllSiteApps, searchSiteApp } from './actions'
import InventoryDatatable from './helpers/InventoryDatatable'
import InventoryHeader from './helpers/InventoryHeader'

export const metadata: Metadata = {
    title: "Mobavenue | Inventory List",
    description: "Mobavenue DSP inventory list"
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
    const exchangeId = searchParams?.exchangeId || ''
    const bundleOrDomain = searchParams?.bundleOrDomain || ''

    let tabularData = []
    if (status || exchangeId || bundleOrDomain) tabularData = await searchSiteApp({ pageNo, pageSize, exchangeId, bundleOrDomain, status })
    else tabularData = await fetchAllSiteApps({ pageNo, pageSize })

    return (
        <div>
            <InventoryHeader
                pageSize={pageSize}
                status={status}
                exchangeId={exchangeId}
                bundleOrDomain={bundleOrDomain}
            />
            <div className='mt-5'>
                <InventoryDatatable pageNo={parseInt(pageNo)} pageSize={parseInt(pageSize)} data={tabularData} />
            </div>
        </div>
    )
}
