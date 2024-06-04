import React from 'react'
import { fetchCreative } from '../actions'
import { cookies } from 'next/headers'
import { Card, CardContent } from '@/components/ui/card'
import CreativeForm from './helpers/CreativeForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Mobavenue | Creative",
    description: "Mobavenue DSP creative"
}

export default async function page({
    params,
    searchParams
}: {
    params: { slug: string }
    searchParams?: { [key: string]: string | undefined }
}) {

    const isEdit = params.slug.includes("edit")
    const creativeType = params.slug[1]
    const userId = params.slug[3] ? params.slug[3] : !isEdit && params.slug[2] ? params.slug[2] : cookies().get('userId')?.value
    const editData = isEdit ? await fetchCreative(params.slug[2], userId as string) : null
    const isAdmin = cookies().get('roleId')?.value === "2"

    return (
        <>
            <Card className='mt-4 pt-4'>
                <CardContent>
                    <CreativeForm
                        isEdit={isEdit}
                        creativeType={creativeType.toUpperCase()}
                        editData={editData}
                        userId={userId ? parseInt(userId) : 0}
                        isAdmin={isAdmin}
                    />
                </CardContent>
            </Card>
        </>
    )
}
