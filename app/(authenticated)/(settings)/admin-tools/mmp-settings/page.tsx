import { Metadata } from 'next'
import React from 'react'
import { fetchALLMMPSettings } from './actions'
import MmpSettingHeader from './helpers/MmpSettingHeader'
import MmpSettingsDatatable from './helpers/MmpSettingsDatatable'

export const metadata: Metadata = {
    title: "Mobavenue | MMP Settings List",
    description: "Mobavenue DSP mmp settings list"
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
    const bundle = searchParams?.bundle || ''
    const events = searchParams?.events || ''
    const mmp = searchParams?.mmp || ''
    const status = searchParams?.status || ''

    const tabularData = await fetchALLMMPSettings({ pageNo, pageSize, bundle, events, status, mmp })

    return (
        <div>
            <MmpSettingHeader
                pageSize={pageSize}
                bundle={bundle}
                events={events}
                mmp={mmp}
                status={status}
            />
            <div className='mt-5'>
                <MmpSettingsDatatable pageNo={parseInt(pageNo)} pageSize={parseInt(pageSize)} data={tabularData} />
            </div>
        </div>
    )
}
