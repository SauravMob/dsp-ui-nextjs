import { Metadata } from 'next'
import { cookies } from 'next/headers'
import React from 'react'
import { fetchApp } from '../actions'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Layers } from 'lucide-react'
import ApplistForm from './helpers/ApplistForm'

export const metadata: Metadata = {
    title: "Mobavenue | Applists",
    description: "Mobavenue DSP applists"
}

export default async function page({
    params,
    searchParams
}: {
    params: { slug: string }
    searchParams?: { [key: string]: string | undefined }
}) {

    const isEdit = params.slug.includes("edit")
    const editData = isEdit ? await fetchApp(params.slug[1]) : null
    const userId = cookies().get('userId')?.value

    return (
        <>
            <Card className='mt-4'>
                <CardHeader>
                    <div className='flex text-lg font-bold'>
                        <Layers size={24} className='mr-2' />{isEdit ? "Edit" : "Create"} App list
                    </div>
                </CardHeader>
                <CardContent>
                    <ApplistForm isEdit={isEdit} editData={editData} userId={userId ? parseInt(userId) : 0} />
                </CardContent>
            </Card>
        </>
    )
}
