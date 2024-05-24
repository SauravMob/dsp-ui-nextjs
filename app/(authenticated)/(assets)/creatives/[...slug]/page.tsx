import React from 'react'
import { fetchCreative } from '../actions'
import { cookies } from 'next/headers'
import CustomBreadCrumb from '@/components/utility/customComponents/CustomBreadCrumb'
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
    const editData = isEdit ? await fetchCreative(params.slug[2]) : null
    const userId = cookies().get('userId')?.value
    const isAdmin = cookies().get('roleId')?.value === "2"

    return (
        <>
            <CustomBreadCrumb
                secondItem='Assets'
                secondLink='#'
                thirdItem='Creatives'
                thirdLink='/creatives'
                fourthItem={isEdit ? "Edit" : "Create"}
                fourthLink='#'
            />
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