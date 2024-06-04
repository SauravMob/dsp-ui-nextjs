import { Metadata } from 'next'
import React from 'react'
import { fetchDeal } from '../actions'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Pocket } from 'lucide-react'
import DealsFormData from './helpers/DealsFormData'
import { cookies } from 'next/headers'

export const metadata: Metadata = {
    title: "Mobavenue | PMP Deals",
    description: "Mobavenue DSP pmp deals"
}

export default async function page({
    params,
    searchParams
}: {
    params: { slug: string }
    searchParams?: { [key: string]: string | undefined }
}) {

    const userId = cookies().get('userId')?.value || ''
    const isEdit = params.slug.length === 2
    const editData = isEdit ? await fetchDeal(params.slug[1]) : null

    return (
        <>
            <Card className='mt-4'>
                <CardHeader>
                    <div className='flex text-lg font-bold'>
                        <Pocket size={24} className='mr-2' />{isEdit ? "Edit" : "Create"} Deal
                    </div>
                </CardHeader>
                <CardContent>
                    <DealsFormData userId={userId} isEdit={isEdit} id={params.slug[1]} editData={editData} />
                </CardContent>
            </Card>
        </>
    )
}
