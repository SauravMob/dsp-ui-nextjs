import { Bell, Plus } from 'lucide-react'
import React from 'react'
import CampaignSheet from './CampaignSheet'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function CampaignHeader({ pageSize, campaignId, status, country, os }: CampaignFilterTypes) {
    return (
        <>
            <div className='mb-4 flex justify-between mt-3'>
                <div className='font-bold flex items-center text-xl'>
                    <Bell size={26} className='mr-1' /> Campaign
                </div>

                <div>
                    <Link href="/campaigns/create">
                        <Button size="sm" className='mr-2'>
                            <Plus size={20} className='mr-1' />Create
                        </Button>
                    </Link>
                    <CampaignSheet
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
