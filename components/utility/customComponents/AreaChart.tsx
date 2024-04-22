"use client"

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import React from 'react'
import Chart from 'react-apexcharts'

export default function AreaChart({
    data
}: {
    data: Record<string, number>
}) {

    const options = {
        chart: {
            id: "basic-bar"
        },
        xaxis: {
            categories: Object.keys(data)
        }
    }

    const series = [
        {
            name: "series-1",
            data: Object.values(data)
        }
    ]

    return (
        <Card>
            <CardHeader>Impression</CardHeader>
            <CardContent className='p-4 m-0'>
                <Chart
                    options={options}
                    series={series}
                    type='area'
                // height={150}
                />
            </CardContent>
        </Card>
    )
}
