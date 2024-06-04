import { FolderKanban } from 'lucide-react'
import React from 'react'
import CreativeReportSheet from './CreativeReportSheet'
import CreativeExportReport from './CreativeExportReport'

export default function CreativeReportHeader({
    pageSize,
    interval,
    from,
    to,
    advertiserId,
    creativeId,
    creativeName,
    campaignId,
    reportType,
    isAdmin,
    tabularData
}: CreativeReportFilter) {
    return (
        <>
            <div className='mb-4 flex justify-between mt-3'>
                <div className='font-bold flex items-center text-xl'>
                    <FolderKanban size={26} className='mr-1' /> Creative Reports
                </div>

                <div>
                    <CreativeExportReport
                        interval={interval}
                        from={from}
                        to={to}
                        advertiserId={advertiserId}
                        reportType={reportType}
                        campaignId={campaignId}
                        creativeId={creativeId}
                        creativeName={creativeName}
                        tabularData={tabularData}
                    />
                    <CreativeReportSheet
                        pageSize={pageSize}
                        interval={interval}
                        from={from}
                        to={to}
                        advertiserId={advertiserId}
                        reportType={reportType}
                        campaignId={campaignId}
                        creativeId={creativeId}
                        creativeName={creativeName}
                        isAdmin={isAdmin}
                    />
                </div>
            </div>
        </>
    )
}
