import { Metadata } from 'next'
import React from 'react'
import { fetchAllUsers } from './actions'
import ManageUserHeader from './helpers/ManageUserHeader'
import ManageUserDatatable from './helpers/ManageUserDatatable'

export const metadata: Metadata = {
    title: "Mobavenue | Manager User List",
    description: "Mobavenue DSP manage user list"
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
    const role = searchParams?.role || ''
    const email = searchParams?.email || ''

    const tabularData = await fetchAllUsers({ pageNo, pageSize, email, role, status })

    return (
        <div>
            <ManageUserHeader
                pageSize={pageSize}
                status={status}
                email={email}
                role={role}
            />
            <div className='mt-5'>
                <ManageUserDatatable pageNo={parseInt(pageNo)} pageSize={parseInt(pageSize)} data={tabularData} />
            </div>
        </div>
    )
}
