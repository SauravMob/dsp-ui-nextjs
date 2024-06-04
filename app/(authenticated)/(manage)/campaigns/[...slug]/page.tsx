import { Card, CardContent } from '@/components/ui/card'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import React from 'react'
import { fetchCampaign } from '../actions'
import CampaignForm from './helpers/CampaignForm'

export const metadata: Metadata = {
    title: "Mobavenue | Campaign",
    description: "Mobavenue DSP campaign"
}

export default async function page({
    params,
    searchParams
}: {
    params: { slug: string }
    searchParams?: { [key: string]: string | undefined }
}) {

    const isEdit = params.slug.includes("edit")
    const isAdmin = cookies().get('roleId')?.value === "2"
    const editData = isEdit ? await fetchCampaign(params.slug[1]) : null
    const userId = !isEdit && params.slug[1] ? params.slug[1] : cookies().get('userId')?.value
    const userCustomFeatures = cookies().get("customFeatures")?.value

    return (
        <>
            <Card className='mt-4 pt-4'>
                <CardContent className='min-h-[550px]'>
                    <CampaignForm
                        isEdit={isEdit}
                        editData={editData}
                        userId={userId ? parseInt(userId) : 0}
                        isAdmin={isAdmin}
                        userCustomFeatures={userCustomFeatures as string}
                    />
                </CardContent>
            </Card>
        </>
    )
}
