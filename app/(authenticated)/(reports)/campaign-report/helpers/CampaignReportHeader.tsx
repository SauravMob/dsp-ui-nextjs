import CustomBreadCrumb from '@/components/utility/customComponents/CustomBreadCrumb'
import { PieChart } from 'lucide-react'
import React from 'react'
import CampaignReportSheet from './CampaignReportSheet'
import CampaignExportReport from './CampaignExportReport'

export default function CampaignReportHeader({
    pageSize, interval, from, to, advertiserId, campaignName, exchange, country, os, reportType, isAdmin, tabularData
}: CampaignReportFilter) {

    return (
        <>
            <CustomBreadCrumb secondItem='Campaign Reports' secondLink='/campaign-report' />
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
                    />
                </div>
            </div>
        </>
    )
}