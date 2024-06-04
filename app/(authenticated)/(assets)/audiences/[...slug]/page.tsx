import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Users } from 'lucide-react'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import React from 'react'
import AudienceForm from './helpers/AudienceForm'
import { fetchAudience } from '../actions'

export const metadata: Metadata = {
    title: "Mobavenue | Audiences",
    description: "Mobavenue DSP audiences"
}

export default async function page({
    params,
    searchParams
}: {
    params: { slug: string }
    searchParams?: { [key: string]: string | undefined }
}) {

    const isEdit = params.slug.includes("edit")
    const editData = isEdit ? await fetchAudience(params.slug[1]) : null
    const userId = !isEdit && params.slug[2] ? params.slug[2] : cookies().get('userId')?.value
    const isAdmin = !isEdit && params.slug[2] ? false : cookies().get('roleId')?.value === "2"

    return (
        <>
            <Card className='mt-4'>
                <CardHeader>
                    <div className='flex text-lg font-bold'>
                        <Users size={24} className='mr-2' />{isEdit ? "Edit" : "Create"} Audience Retargeting
                    </div>
                </CardHeader>
                <CardContent>
                    <AudienceForm isEdit={isEdit} editData={editData} userId={userId ? parseInt(userId) : 0} isAdmin={isAdmin} />
                </CardContent>
            </Card>
        </>
    )
}
