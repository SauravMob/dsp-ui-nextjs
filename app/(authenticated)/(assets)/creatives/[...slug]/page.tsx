import React from 'react'
import { fetchCreative } from '../actions'
import { cookies } from 'next/headers'
import CustomBreadCrumb from '@/components/utility/customComponents/CustomBreadCrumb'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Camera } from 'lucide-react'

export default async function page({
    params,
    searchParams
}: {
    params: { slug: string }
    searchParams?: { [key: string]: string | undefined }
}) {

    const isEdit = params.slug.includes("edit")
    const editData = isEdit ? await fetchCreative(params.slug[1]) : null
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
            <Card className='mt-4'>
                <CardHeader>
                    <div className='flex text-lg font-bold'>
                        <Camera size={24} className='mr-2' />{isEdit ? "Edit" : "Create"} Creatives
                    </div>
                </CardHeader>
                <CardContent>
                    {/* <AudienceForm isEdit={isEdit} editData={editData} userId={userId ? parseInt(userId) : 0} isAdmin={isAdmin} /> */}
                </CardContent>
            </Card>
        </>
    )
}
