import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { DollarSign } from 'lucide-react'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import React from 'react'
import BidMultForm from './helpers/BidMultForm'
import { fetchAllBidMultiplier, fetchBidMultiplier } from '../actions'

export const metadata: Metadata = {
    title: "Mobavenue | Bid Multiplier",
    description: "Mobavenue DSP bid multiplier"
}

export default async function page({
    params,
    searchParams
}: {
    params: { slug: string }
    searchParams?: { [key: string]: string | undefined }
}) {

    const isEdit = params.slug.includes("edit")
    const editData = isEdit ? await fetchBidMultiplier(params.slug[1]) : null
    const userId = cookies().get('userId')?.value
    const existingBidMultiplier = await fetchAllBidMultiplier({ pageNo: '0', pageSize: '1000' })

    return (
        <>
            <Card className='mt-4'>
                <CardHeader>
                    <div className='flex text-lg font-bold'>
                        <DollarSign size={24} className='mr-2' />{isEdit ? "Edit" : "Create"} Bid Multiplier
                    </div>
                </CardHeader>
                <CardContent>
                    <BidMultForm editData={editData} isEdit={isEdit} userId={userId ? parseInt(userId) : 0} existingBidMultiplier={existingBidMultiplier} />
                </CardContent>
            </Card>
        </>
    )
}
