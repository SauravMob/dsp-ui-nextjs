import { PieChart } from 'lucide-react'
import React from 'react'
import CampaignReportSheet from './CampaignReportSheet'
import CampaignExportReport from './CampaignExportReport'

export default function CampaignReportHeader({
    pageSize, interval, from, to, advertiserId, campaignName, exchange, country, os, reportType, isAdmin, tabularData, cumulativeNotAllowed, exchangeFilterNotAllowed
}: CampaignReportFilter) {

    return (
        <>
            <div className='mb-4 flex justify-between mt-3'>
                <div className='font-bold flex items-center text-xl'>
                    <PieChart size={26} className='mr-1' /> Campaign Reports
                </div>

                <div>
                    <CampaignExportReport
                        from={from}
                        to={to}
                        advertiserId={advertiserId}
                        exchange={exchange}
                        campaignName={campaignName}
                        reportType={reportType}
                        country={country}
                        os={os}
                        tabularData={tabularData}
                    />
                    <CampaignReportSheet
                        pageSize={pageSize}
                        interval={interval}
                        from={from}
                        to={to}
                        advertiserId={advertiserId}
                        exchange={exchange}
                        campaignName={campaignName}
                        reportType={reportType}
                        country={country}
                        os={os}
                        isAdmin={isAdmin}
                        cumulativeNotAllowed={cumulativeNotAllowed}
                        exchangeFilterNotAllowed={exchangeFilterNotAllowed}
                    />
                </div>
            </div>
        </>
    )
}
