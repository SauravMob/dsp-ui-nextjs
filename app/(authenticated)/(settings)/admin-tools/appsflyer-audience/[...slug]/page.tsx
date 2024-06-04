import React from 'react'
import AppsAudForm from './helpers/AppsAudForm'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Users } from 'lucide-react'
import { getAppsflyerAudById } from '../actions'
import { Metadata } from 'next'

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
            <Card className='mt-4'>
                <CardHeader>
                    <div className='flex text-lg font-bold'>
                        <Users size={24} className='mr-2' />{isEdit ? "Edit" : "Create"} - AppsFlyer Advertiser &apos;s API Key
                    </div>
                </CardHeader>
                <CardContent>
                    <AppsAudForm isEdit={isEdit} id={params.slug[1]} editData={editData} />
                </CardContent>
            </Card>
        </>
    )
}
