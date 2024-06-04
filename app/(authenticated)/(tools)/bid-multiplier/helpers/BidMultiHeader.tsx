import { Button } from '@/components/ui/button'
import { DollarSign, Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import BidMultiSheet from './BidMultiSheet'

export default function BidMultiHeader({
    pageSize,
    campaignId,
    status,
    isAdmin
}: BidMultiFilter) {
    return (
        <>
            <div className='mb-4 flex justify-between mt-3'>
                <div className='font-bold flex items-center text-xl'>
                    <DollarSign size={26} className='mr-1' /> Bid Multiplier
                </div>

                <div>
                    {!isAdmin && <Link href="/bid-multiplier/create">
                        <Button size="sm" className='mr-2'>
                            <Plus size={20} className='mr-1' />Create
                        </Button>
                    </Link>}
                    <BidMultiSheet
                        pageSize={pageSize}
                        status={status}
                        campaignId={campaignId}
                        isAdmin={isAdmin}
                    />
                </div>
            </div>
        </>
    )
}
