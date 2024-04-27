import { Bell } from 'lucide-react'
import React from 'react'
import CampaignSheet from './CampaignSheet'
import CustomBreadCrumb from '@/components/utility/customComponents/CustomBreadCrumb'

export default function CampaignHeader({ pageNo, pageSize, campaignId, status, country, os }: CampaignFilterTypes) {
    return (
        <>
            <CustomBreadCrumb secondItem='Campaign' secondLink='/campaigns' />
            <div className='mb-4 flex justify-between mt-3'>
                <div className='font-bold flex items-center text-xl'>
                    <Bell size={26} className='mr-1' /> Campaign
                </div>

                <div>
                    <CampaignSheet
                        pageNo={pageNo}
                        pageSize={pageSize}
                        campaignId={campaignId}
                        status={status}
                        country={country}
                        os={os}
                    />
                </div>
            </div>
        </>
    )
}
