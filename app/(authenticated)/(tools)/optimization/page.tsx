import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'
import { getAllOptimization, searchOptimization } from './actions'
import OptimizationHeader from './helpers/OptimizationHeader'
import OptimizationDatatable from './helpers/OptimizationDatatable'

export const metadata: Metadata = {
    title: "Mobavenue | Optimization List",
    description: "Mobavenue DSP optimization list"
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
    const campaignId = searchParams?.campaignId || ''

    let tabularData = []

    if (!status && !campaignId) tabularData = await getAllOptimization({ pageNo, pageSize })
    else tabularData = await searchOptimization({ pageNo, pageSize, campaignId, status })

    return (
        <div>
            <OptimizationHeader
                pageSize={pageSize}
                status={status}
                campaignId={campaignId}
            />
            <div className='mt-5'>
                <OptimizationDatatable pageNo={parseInt(pageNo)} pageSize={parseInt(pageSize)} data={tabularData} />
            </div>
        </div>
    )
}
