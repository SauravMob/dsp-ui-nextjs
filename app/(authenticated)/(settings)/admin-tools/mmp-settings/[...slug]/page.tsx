import { getAllMMPNames } from '@/app/(authenticated)/(assets)/audiences/actions'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import CustomBreadCrumb from '@/components/utility/customComponents/CustomBreadCrumb'
import { Package } from 'lucide-react'
import { Metadata } from 'next'
import React from 'react'
import { fetchMMPSetting } from '../actions'
import MMPSettingForm from './helpers/MMPSettingForm'

export const metadata: Metadata = {
    title: "Mobavenue | MMP Settings",
    description: "Mobavenue DSP mmp settings"
}

export default async function page({
    params,
    searchParams
}: {
    params: { slug: string }
    searchParams?: { [key: string]: string | undefined }
}) {
    const isEdit = params.slug.length === 2
    const editData = isEdit ? await fetchMMPSetting(params.slug[1]) : null
    const mmpList = await getAllMMPNames()

    return (
        <>
            <CustomBreadCrumb
                secondItem='Settings'
                secondLink='#'
                thirdItem='Admin Tools'
                thirdLink='/admin-tools'
                fourthItem='MMP Settings'
                fourthLink='/admin-tools/mmp-settings'
                fifthItem={isEdit ? "Edit" : "Create"}
                fifthLink='#'
            />
            <Card className='mt-4'>
                <CardHeader>
                    <div className='flex text-lg font-bold'>
                        <Package size={24} className='mr-2' />{isEdit ? "Edit" : "Create"} MMP Settings
                    </div>
                </CardHeader>
                <CardContent>
                    <MMPSettingForm editData={editData} isEdit={isEdit} id={params.slug[1]?.toString()} mmpList={mmpList} />
                </CardContent>
            </Card>
        </>
    )
}
