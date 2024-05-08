import React from 'react'
import AppsAudForm from './helpers/AppsAudForm'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Coffee } from 'lucide-react'
import { getAppsflyerAudById } from '../actions'
import { Metadata } from 'next'
import CustomBreadCrumb from '@/components/utility/customComponents/CustomBreadCrumb'

export const metadata: Metadata = {
    title: "Mobavenue | Appsflyer Audience",
    description: "Mobavenue DSP appsflyer audience"
}

export default async function page({
    params,
    searchParams
}: {
    params: { slug: string }
    searchParams?: { [key: string]: string | undefined }
}) {

    const isEdit = params.slug.length === 2
    const editData = isEdit ? await getAppsflyerAudById(params.slug[1]) : null

    return (
        <>
            <CustomBreadCrumb
                secondItem='Settings'
                secondLink='#'
                thirdItem='Admin Tools'
                thirdLink='/admin-tools'
                fourthItem='AppsFlyer - Advertiser API Keys'
                fourthLink='/admin-tools/appsflyer-audience'
                fifthItem={isEdit ? "Edit" : "Create"}
                fifthLink='#'
            />
            <Card className='mt-4'>
                <CardHeader>
                    <div className='flex text-lg font-bold'>
                        <Coffee size={24} className='mr-2' />{isEdit ? "Edit" : "Create"} - AppsFlyer Advertiser &apos;s API Key
                    </div>
                </CardHeader>
                <CardContent>
                    <AppsAudForm isEdit={isEdit} id={params.slug[1]} editData={editData} />
                </CardContent>
            </Card>
        </>
    )
}
