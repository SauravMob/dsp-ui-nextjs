import { ShoppingBag } from 'lucide-react'
import React from 'react'
import EventLogsSheet from './EventLogsSheet'

export default function EventLogsHeader({
    pageSize,
    interval,
    from,
    to,
    entity,
    entityId,
    eventType,
    userId
}: EventLogsFilter) {
    return (
        <>
            <div className='mb-4 flex justify-between mt-3'>
                <div className='font-bold flex items-center text-xl'>
                    <ShoppingBag size={26} className='mr-1' /> API Events Logs
                </div>

                <div>
                    <EventLogsSheet
                        pageSize={pageSize}
                        interval={interval}
                        from={from}
                        to={to}
                        entity={entity}
                        entityId={entityId}
                        userId={userId}
                        eventType={eventType}
                    />
                </div>
            </div>
        </>
    )
}
