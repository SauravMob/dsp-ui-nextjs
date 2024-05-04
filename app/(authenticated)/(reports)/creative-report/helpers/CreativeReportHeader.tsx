import CustomBreadCrumb from '@/components/utility/customComponents/CustomBreadCrumb'
import { FolderKanban } from 'lucide-react'
import React from 'react'
import CreativeReportSheet from './CreativeReportSheet'

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
    isAdmin
}: CreativeReportFilter) {
    return (
        <>
            <CustomBreadCrumb secondItem='Creative Reports' secondLink='/creative-report' />
            <div className='mb-4 flex justify-between mt-3'>
                <div className='font-bold flex items-center text-xl'>
                    <FolderKanban size={26} className='mr-1' /> Creative Reports
                </div>

                <div>
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
