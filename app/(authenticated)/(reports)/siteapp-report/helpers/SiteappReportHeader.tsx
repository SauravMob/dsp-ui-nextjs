import CustomBreadCrumb from '@/components/utility/customComponents/CustomBreadCrumb'
import { Package } from 'lucide-react'
import React from 'react'
import SiteappReportSheet from './SiteappReportSheet'
import SiteappExportReport from './SiteappExportReport'

export default function SiteappReportHeader({
    pageSize,
    interval,
    from,
    to,
    advertiserId,
    creativeName,
    campaignName,
    exchangeId,
    reportType,
    isAdmin,
    tabularData,
    exchangeFilterNotAllowed
}: SiteAppReportFilter) {
    return (
        <>
            <CustomBreadCrumb secondItem='SiteApp Reports' secondLink='/siteapp-report' />
            <div className='mb-4 flex justify-between mt-3'>
                <div className='font-bold flex items-center text-xl'>
                    <Package size={26} className='mr-1' /> SiteApp Reports
                </div>

                <div>
                    <SiteappExportReport
                        interval={interval}
                        from={from}
                        to={to}
                        advertiserId={advertiserId}
                        reportType={reportType}
                        campaignName={campaignName}
                        exchangeId={exchangeId}
                        creativeName={creativeName}
                        tabularData={tabularData}
                    />
                    <SiteappReportSheet
                        pageSize={pageSize}
                        interval={interval}
                        from={from}
                        to={to}
                        advertiserId={advertiserId}
                        reportType={reportType}
                        campaignName={campaignName}
                        exchangeId={exchangeId}
                        creativeName={creativeName}
                        isAdmin={isAdmin}
                        exchangeFilterNotAllowed={exchangeFilterNotAllowed}
                    />
                </div>
            </div>
        </>
    )
}
