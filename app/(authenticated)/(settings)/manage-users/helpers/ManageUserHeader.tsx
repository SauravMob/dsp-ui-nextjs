import CustomBreadCrumb from '@/components/utility/customComponents/CustomBreadCrumb'
import { User } from 'lucide-react'
import React from 'react'
import ManageUserSheet from './ManageUserSheet'

export default function ManageUserHeader({
    pageSize,
    email,
    role,
    status
}: ManageUserFilter) {
    return (
        <>
            <CustomBreadCrumb secondItem='Manage User' secondLink='/manage-user' />
            <div className='mb-4 flex justify-between mt-3'>
                <div className='font-bold flex items-center text-xl'>
                    <User size={26} className='mr-1' /> Manage User
                </div>

                <div>
                    <ManageUserSheet
                        pageSize={pageSize}
                        status={status}
                        role={role}
                        email={email}
                    />
                </div>
            </div>
        </>
    )
}
