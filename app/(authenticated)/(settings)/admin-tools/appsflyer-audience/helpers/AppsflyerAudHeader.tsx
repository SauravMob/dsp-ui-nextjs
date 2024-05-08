import { Button } from '@/components/ui/button'
import CustomBreadCrumb from '@/components/utility/customComponents/CustomBreadCrumb'
import { Plus, Users } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function AppsflyerAudHeader() {
    return (
        <>
            <CustomBreadCrumb
                secondItem='Settings'
                secondLink='#'
                thirdItem='Admin Tools'
                thirdLink='/admin-tools'
                fourthItem='AppsFlyer - Advertiser API Keys'
                fourthLink='/admin-tools/appsflyer-audience'
            />
            <div className='mb-4 flex justify-between mt-3'>
                <div className='font-bold flex items-center text-xl'>
                    <Users size={26} className='mr-1' /> Appsflyer Audience
                </div>
                <div>
                    <Link href="/admin-tools/appsflyer-audience/create">
                        <Button size="sm" className='mr-2'>
                            <Plus size={20} className='mr-1' />Create
                        </Button>
                    </Link>
                </div>
            </div>
        </>
    )
}
