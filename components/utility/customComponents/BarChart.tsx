"use client"

import { Card, CardContent } from '@/components/ui/card'
import React from 'react'
import Chart from 'react-apexcharts'
import { SelectInput } from '@/components/utility/customComponents/SelectInput'
import { useRouter, useSearchParams } from 'next/navigation'

type ReportData = {
    bids: null
    impressions: null
    clicks: number | null
    installs: null
    spends: null
    date: string
}

const reportTypeOptions = [
    { value: "impressions", label: "Impressions" },
    { value: "clicks", label: "Clicks" },
    { value: "bids", label: "Bids" },
    { value: "spends", label: "Spends" }
]

export default function BarChart({
    data,
    reportType
}: {
    data: ReportData[],
    reportType: string
}) {

    const router = useRouter()
    const searchParams = useSearchParams()

    const uri = searchParams.has("interval") ? searchParams.get("interval") === "CUSTOM" ? `/dashboard?interval=CUSTOM&from=${searchParams.get('from')}&to=${searchParams.get('to')}&reportType=` : `/dashboard?interval=${searchParams.get("interval")}&reportType=` : `/dashboard?reportType=`

    const yAxis = data?.map(item => {
        if (reportType === "impressions" || reportType === "clicks" || reportType === "bids" || reportType === "installs" || reportType === "spends") return item[reportType]
        else return null
    }).filter(val => val !== null)
    const xAxis = data?.map(item => item.date).filter(date => date !== null)

    const options = {
        chart: {
            id: 'dashboard-barchart',
            toolbar: {
                show: false,
                tools: {
                    download: true,
                    selection: false,
                    zoom: false,
                    zoomin: false,
                    zoomout: false,
                    pan: false,
                    reset: true
                }
            }
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '25%'
            }
        },
        grid: {
            show: false
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 1,
            colors: ['transparent']
        },
        fill: {
            colors: ['#3498ff'],
            opacity: 1
        },
        xaxis: {
            labels: {
                show: true,
                style: {
                    colors: xAxis.map(v => localStorage.getItem('theme') === 'dark' ? "white" : "black")
                }
            },
            axisBorder: {
                show: true
            }
        },
        labels: xAxis,
        yaxis: {
            labels: {
                show: true,
                style: {
                    colors: [localStorage.getItem('theme') === 'dark' ? "white" : "black"]
                }
            }
        },
        tooltip: {
            custom({
                series,
                seriesIndex,
                dataPointIndex
            }: {
                series: number[][],
                seriesIndex: number,
                dataPointIndex: number
            }) {
                return `<div class="font-small-1 dark:bg-slate-950 p-2">          
                                <span> 
                                ${`${xAxis[dataPointIndex]}`} : ${series[seriesIndex][dataPointIndex]}
                                </span>
                            </div>`
            }
        }
    }

    const series = [
        {
            name: '',
            data: yAxis
        }
    ]

    return (
        <Card className='hover:bg-slate-100 dark:hover:bg-slate-800'>
            <CardContent className='p-4 m-0'>
                <div className='grid grid-cols-3 gap-8'>
                    <div className=' col-span-1'>
                        <SelectInput
                            placeholder="Report Type"
                            isClearable={true}
                            isSearchable={true}
                            name="reportType"
                            value={reportTypeOptions.filter(v => v.value === reportType)[0]}
                            options={reportTypeOptions}
                            onChange={(e) => router.push(`${uri}${e?.value}`)}
                        />
                    </div>
                    <div className=' col-span-1'>
                        <SelectInput
                            placeholder="Report Type"
                            isClearable={true}
                            isSearchable={true}
                            name="reportType"
                            value={reportTypeOptions.filter(v => v.value === reportType)[0]}
                            options={reportTypeOptions}
                            onChange={(e) => router.push(`${uri}${e?.value}`)}
                        />
                    </div>
                    <div className=' col-span-1'>
                        <SelectInput
                            placeholder="Report Type"
                            isClearable={true}
                            isSearchable={true}
                            name="reportType"
                            value={reportTypeOptions.filter(v => v.value === reportType)[0]}
                            options={reportTypeOptions}
                            onChange={(e) => router.push(`${uri}${e?.value}`)}
                        />
                    </div>
                </div>
                <Chart
                    options={options}
                    series={series}
                    height={250}
                    type='bar'
                />
            </CardContent>
        </Card>
    )
}
