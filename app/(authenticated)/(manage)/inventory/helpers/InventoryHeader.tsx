import { Archive } from 'lucide-react'
import React from 'react'
import InventorySheet from './InventorySheet'

export default function InventoryHeader({
    pageSize,
    status,
    exchangeId,
    bundleOrDomain
}: {
    pageSize: string,
    status: string,
    exchangeId: string,
    bundleOrDomain: string
}) {
    return (
        <>
            <div className='mb-4 flex justify-between mt-3'>
                <div className='font-bold flex items-center text-xl'>
                    <Archive size={26} className='mr-1' /> Inventory
                </div>

                <div>
                    <InventorySheet
                        pageSize={pageSize}
                        status={status}
                        exchangeId={exchangeId}
                        bundleOrDomain={bundleOrDomain}
                    />
                </div>
            </div>
        </>
    )
}
