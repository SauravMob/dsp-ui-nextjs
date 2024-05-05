import CustomBreadCrumb from '@/components/utility/customComponents/CustomBreadCrumb'
import { MapPin } from 'lucide-react'
import React from 'react'
import GeoReportSheet from './GeoReportSheet'
import GeoExportReport from './GeoExportReport'

export default function GeoReportHeader({
    interval,
    from,
    to,
    campaignId,
    country,
    ssp,
    advertiserId,
    pageSize,
    tabularData
}: GeoReportFilter) {
    return (
        <>
            <CustomBreadCrumb secondItem='Geo Reports' secondLink='/geo-report' />
            <div className='mb-4 flex justify-between mt-3'>
                <div className='font-bold flex items-center text-xl'>
                    <MapPin size={26} className='mr-1' /> Geo Reports
                </div>

                <div>
                    <GeoExportReport tabularData={tabularData?.content || []}/>
                    <GeoReportSheet
                        pageSize={pageSize}
                        interval={interval}
                        from={from}
                        to={to}
                        advertiserId={advertiserId}
                        campaignId={campaignId}
                        ssp={ssp}
                        country={country}
                    />
                </div>
            </div>
        </>
    )
}
