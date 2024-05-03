import CustomBreadCrumb from '@/components/utility/customComponents/CustomBreadCrumb'
import { Navigation } from 'lucide-react'
import React from 'react'
import TrafficReportSheet from './TrafficReportSheet'

export default function TrafficReportHeader({
    pageSize,
    interval,
    from,
    to,
    advertiserId,
    sspUserId
}: TrafficReportFilter) {
    return (
        <>
            <CustomBreadCrumb secondItem='Traffic Reports' secondLink='/traffic-reports' />
            <div className='mb-4 flex justify-between mt-3'>
                <div className='font-bold flex items-center text-xl'>
                    <Navigation size={26} className='mr-1' /> Traffic Reports
                </div>

                <div>
                    <TrafficReportSheet
                        pageSize={pageSize}
                        interval={interval}
                        from={from}
                        to={to}
                        advertiserId={advertiserId}
                        sspUserId={sspUserId}
                    />
                </div>
            </div>
        </>
    )
}
