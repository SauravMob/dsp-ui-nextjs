import { Card, CardContent, CardHeader } from '@/components/ui/card'
import CustomBreadCrumb from '@/components/utility/customComponents/CustomBreadCrumb'
import { Navigation } from 'lucide-react'
import { Metadata } from 'next'
import React from 'react'
import { getById } from '../actions'
import OptimizationForm from './helpers/OptimizationForm'
import { cookies } from 'next/headers'

export const metadata: Metadata = {
    title: "Mobavenue | Optimization",
    description: "Mobavenue DSP optimization"
}

export default async function page({
    params,
    searchParams
}: {
    params: { slug: string }
    searchParams?: { [key: string]: string | undefined }
}) {

    const isEdit = params.slug.length === 2
    const editData = isEdit ? await getById(params.slug[1]) : null
    const userId = cookies().get('userId')?.value

    return (
        <>
            <CustomBreadCrumb
                secondItem='Tools'
                secondLink='#'
                thirdItem='Optimization'
                thirdLink='/optimization'
                fourthItem={isEdit ? "Edit" : "Create"}
                fourthLink='#'
            />
            <Card className='mt-4'>
                <CardHeader>
                    <div className='flex text-lg font-bold'>
                        <Navigation size={24} className='mr-2' />{isEdit ? "Edit" : "Create"} Optimization
                    </div>
                </CardHeader>
                <CardContent>
                    <OptimizationForm isEdit={isEdit} editData={editData} userId={userId ? parseInt(userId) : 0} />
                </CardContent>
            </Card>
        </>
    )
}
