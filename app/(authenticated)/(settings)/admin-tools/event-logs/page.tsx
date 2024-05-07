import { formatQryDate } from '@/components/utility/utils/Utils'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'
import { fetchAllEventLogs, searchEventLogs } from './actions'
import EventLogsHeader from './helpers/EventLogsHeader'
import EventLogsDatatable from './helpers/EventLogsDatatable'

export const metadata: Metadata = {
    title: "Mobavenue | Events Logs",
    description: "Mobavenue DSP events logs"
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
    const userId = searchParams?.userId || ''
    const eventType = searchParams?.eventType || ''
    const entity = searchParams?.entity || ''
    const entityId = searchParams?.entityId || ''
    const interval = searchParams?.interval || ''
    const from = searchParams?.from || ``
    const to = searchParams?.to || ``

    let tabularData = []

    if (!userId && !eventType && !entity && !entityId) tabularData = await fetchAllEventLogs({ pageNo, pageSize })
    else tabularData = await searchEventLogs({ pageNo, pageSize, userId, entity, entityId, eventType, startDate: from, endDate: to })

    return (
        <div>
            <EventLogsHeader
                pageSize={pageSize}
                interval={interval}
                from={from}
                to={to}
                entity={entity}
                entityId={entityId}
                userId={userId}
                eventType={eventType}
            />
            <div className='mt-5'>
                <EventLogsDatatable pageNo={parseInt(pageNo)} pageSize={parseInt(pageSize)} data={tabularData} />
            </div>
        </div>
    )
}
