import { Metadata } from 'next'
import React from 'react'
import { getAllDeals } from './actions'
import PmpHeader from './helpers/PmpHeader'
import PmpDatatable from './helpers/PmpDatatable'

export const metadata: Metadata = {
    title: "Mobavenue | PMP Deals List",
    description: "Mobavenue DSP pmp deals list"
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

    const tabularData = await getAllDeals({ pageNo, pageSize })

    return (
        <div>
            <PmpHeader />
            <div className='mt-5'>
                <PmpDatatable pageNo={parseInt(pageNo)} pageSize={parseInt(pageSize)} data={tabularData} />
            </div>
        </div>
    )
}
