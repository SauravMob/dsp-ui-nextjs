import { Settings } from 'lucide-react'
import React from 'react'
import CampaignManagerSheet from './CampaignManagerSheet'

export default function CampaignManagerHeader({
    pageSize, advertiserId, accountManagerId, country, os, status, campaignId
}: CampaignFilterTypes) {
    return (
        <>
            <div className='mb-4 flex justify-between mt-3'>
                <div className='font-bold flex items-center text-xl'>
                    <Settings size={26} className='mr-1' /> Campaign Manager
                </div>

                <div>
                    <CampaignManagerSheet
                        pageSize={pageSize}
                        campaignId={campaignId}
                        status={status}
                        country={country}
                        os={os}
                        advertiserId={advertiserId}
                        accountManagerId={accountManagerId}
                    />
                </div>
            </div>
        </>
    )
}
