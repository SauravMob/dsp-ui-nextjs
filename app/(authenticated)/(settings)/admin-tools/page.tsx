import { Card, CardContent } from '@/components/ui/card'
import CustomBreadCrumb from '@/components/utility/customComponents/CustomBreadCrumb'
import { Coffee, Package, PenTool, Pocket, ShoppingBag, Users } from 'lucide-react'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

export const metadata: Metadata = {
    title: "Mobavenue | Admin tools List",
    description: "Mobavenue DSP admin tools list"
}

export default async function page() {

    const roleId = cookies().get('roleId')?.value
    if (roleId !== "2") redirect('/not-found')

    return (
        <>
            <CustomBreadCrumb secondItem='Admin Tools' secondLink='/admin-tools' />
            <div className='mb-4 flex justify-between mt-3'>
                <div className='font-bold flex items-center text-xl'>
                    <PenTool size={26} className='mr-1' /> Admin Tools
                </div>
            </div>
            <Card>
                <CardContent className='p-14'>
                    <Link href={`/admin-tools/manage-reports`} className='mb-2 flex items-center border-b-2 justify-start px-3 py-3 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800'>
                        <Coffee size={20} className='mr-2' /> Manage Reports (calc)
                    </Link>
                    <Link href={`/admin-tools/appsflyer-audience`} className='mb-2 flex items-center border-b-2 justify-start px-3 py-3 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800'>
                        <Users size={20} className='mr-2' /> AppsFlyer - Advertiser API Keys
                    </Link>
                    <Link href={`/admin-tools/mmp-settings`} className='mb-2 flex items-center border-b-2 justify-start px-3 py-3 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800'>
                        <Package size={20} className='mr-2' /> Postback - MMP Settings
                    </Link>
                    <Link href={`/admin-tools/event-logs`} className='mb-2 flex items-center border-b-2 justify-start px-3 py-3 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800'>
                        <ShoppingBag size={20} className='mr-2' /> API Event logs listing
                    </Link>
                    <Link href={`/admin-tools/deals`} className='mb-2 flex items-center border-b-2 justify-start px-3 py-3 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800'>
                        <Pocket size={20} className='mr-2' /> PMP Deals
                    </Link>
                </CardContent>
            </Card>
        </>
    )
}
