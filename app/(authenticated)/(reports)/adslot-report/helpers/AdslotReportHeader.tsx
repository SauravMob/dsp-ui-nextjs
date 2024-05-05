import CustomBreadCrumb from '@/components/utility/customComponents/CustomBreadCrumb'
import { Eclipse } from 'lucide-react'
import React from 'react'
import AdslotReportSheet from './AdslotReportSheet'
import AdslotExportReport from './AdslotExportReport'

export default function AdslotReportHeader({
    pageSize,
    interval,
    from,
    to,
    bundleId,
    exchangeId,
    tabularData
}: AdslotReportFilter) {
    return (
        <>
            <CustomBreadCrumb secondItem='AdSlot Reports' secondLink='/adslot-report' />
            <div className='mb-4 flex justify-between mt-3'>
                <div className='font-bold flex items-center text-xl'>
                    <Eclipse size={26} className='mr-1' /> AdSlot Reports
                </div>

                <div>
                    <AdslotExportReport tabularData={tabularData?.content || []} />
                    <AdslotReportSheet
                        pageSize={pageSize}
                        interval={interval}
                        from={from}
                        to={to}
                        exchangeId={exchangeId}
                        bundleId={bundleId}
                    />
                </div>
            </div>
        </>
    )
}
