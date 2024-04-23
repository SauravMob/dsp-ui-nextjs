import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import React from 'react'

export default function EstimationCard({
    data
}: {
    data: { ecpm: string, ecpc: string }
}) {
    return (
        <Card className='w-full flex justify-center items-center hover:bg-slate-100 dark:hover:bg-slate-800'>
            <CardContent className='flex flex-col gap-4 justify-center items-center'>
                <div className='font-bold text-4xl'>{data.ecpm}</div>
                <div className='font-medium'>ECPM</div>
                <div className='font-bold text-4xl'>{data.ecpc}</div>
                <div className='font-medium'>ECPC</div>
            </CardContent>
        </Card>
    )
}
