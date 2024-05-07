import { Metadata } from 'next'
import React from 'react'
import { fetchAllCalcFilter } from './actions'
import ManageReportHeader from './helpers/ManageReportHeader'
import ManageReportDatatable from './helpers/ManageReportDatatable'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
    title: "Mobavenue | Manage Reports List",
    description: "Mobavenue DSP manage reports list"
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

    const status = searchParams?.status || ''
    const tabularData = await fetchAllCalcFilter({ status })

    return (
        <div>
            <ManageReportHeader status={status} />
            <div className='mt-5'>
                <ManageReportDatatable tabularData={tabularData} />
            </div>
        </div>
    )
}
