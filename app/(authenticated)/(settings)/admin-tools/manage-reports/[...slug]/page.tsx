import { Card, CardContent, CardHeader } from '@/components/ui/card'
import CustomBreadCrumb from '@/components/utility/customComponents/CustomBreadCrumb'
import { Coffee } from 'lucide-react'
import { Metadata } from 'next'
import React from 'react'
import { fetchCalcFilter } from '../actions'
import ManageReportForm from './helpers/ManageReportForm'
import { fetchUserByRole } from '@/app/(authenticated)/(analyze)/actions'

export const metadata: Metadata = {
    title: "Mobavenue | Manage Reports",
    description: "Mobavenue DSP manage reports"
}

export default async function page({
    params,
    searchParams
}: {
    params: { slug: string }
    searchParams?: { [key: string]: string | undefined }
}) {

    const isEdit = params.slug.length === 2
    const editData = isEdit ? await fetchCalcFilter(params.slug[1]) : null
    const advertiserList = await fetchUserByRole('ADVERTISER')

    return (
        <>
            <CustomBreadCrumb
                secondItem='Settings'
                secondLink='#'
                thirdItem='Admin Tools'
                thirdLink='/admin-tools'
                fourthItem='Manage Reports'
                fourthLink='/admin-tools/manage-reports'
                fifthItem={isEdit ? "Edit" : "Create"}
                fifthLink='#'
            />
            <Card className='mt-4'>
                <CardHeader>
                    <div className='flex text-lg font-bold'>
                        <Coffee size={24} className='mr-2' />{isEdit ? "Edit" : "Create"} Report Settings
                    </div>
                </CardHeader>
                <CardContent>
                    <ManageReportForm editData={editData} isEdit={isEdit} id={params.slug[1]?.toString()} advertiserList={advertiserList} />
                </CardContent>
            </Card>
        </>
    )
}
