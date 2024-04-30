import CustomBreadCrumb from '@/components/utility/customComponents/CustomBreadCrumb'
import { Camera } from 'lucide-react'
import React from 'react'
import CreativeManagerSheet from './CreativeManagerSheet'

export default function CreativeManagerHeader({
  pageSize, campaignId, advertiserId, creativeId, creativeSize, creativeType
}: CreativeFilterTypes) {
  return (
    <>
      <CustomBreadCrumb secondItem='Creative Manager' secondLink='/creative-manager' />
      <div className='mb-4 flex justify-between mt-3'>
        <div className='font-bold flex items-center text-xl'>
          <Camera size={26} className='mr-1' /> Creative Manager
        </div>

        <div>
          <CreativeManagerSheet
            pageSize={pageSize}
            campaignId={campaignId}
            creativeId={creativeId}
            creativeSize={creativeSize}
            creativeType={creativeType}
            advertiserId={advertiserId}
          />
        </div>
      </div>
    </>
  )
}
