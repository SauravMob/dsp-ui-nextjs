"use client"

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import React from 'react'
import Chart from 'react-apexcharts'
import { kFormatter, numFormatter } from '../utils/Utils'

export default function AreaChart({
    data,
    chartName,
    color,
    isLabel,
    interval,
    isDouble
}: {
    data: Record<string, number>,
    chartName: string,
    color: string,
    isLabel?: boolean,
    interval: string,
    isDouble?: boolean
}) {

    const xaxis = isDouble ? Object.keys(data.today) : data?.report ? Object.keys(data.report) : []
    const yaxis = isDouble ? Object.values(data.today) : data?.report ? Object.values(data.report) : []
    const yyaxis = isDouble && data.yesterday ? Object.values(data.yesterday) : []
    const statsCount = chartName === 'WinRate' ? (yaxis.reduce((p, a) => p + a, 0) / (yaxis.length === 0 ? 1 : yaxis.length)) : yaxis.reduce((p, a) => p + a, 0)

    const options = {
        chart: {
            id: chartName,
            toolbar: {
                show: isLabel,
                tools: {
                    download: true,
                    selection: false,
                    zoom: false,
                    zoomin: false,
                    zoomout: false,
                    pan: false,
                    reset: false
                }
            },
            sparkline: {
                enabled: !isLabel
            }
        },
        grid: {
            show: false
        },
        colors: [color],
        dataLabels: {
            enabled: false
        },
        stroke: {
            width: 2.5
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 0.7,
                opacityFrom: 0.4,
                opacityTo: 0.1,
                stops: [0, 80, 100]
            }
        },
        xaxis: {
            labels: {
                show: isLabel
            },
            axisBorder: {
                show: isLabel
            }
        },
        labels: xaxis,
        yaxis: {
            labels: {
                show: isLabel
            }
        },
        yyaxis: {
            labels: {
                show: isLabel
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
                if (isDouble) {
                    if (seriesIndex === 0) {
                        return `<div class="border font-small-1 dark:bg-slate-950">
                        <span>Today ${xaxis[dataPointIndex]} : ${series[seriesIndex][dataPointIndex]}</span>
                    </div>`
                    } else if (seriesIndex === 1) {
                        return `<div class="border font-small-1 dark:bg-slate-950">
                                    <span>Yesterday ${xaxis[dataPointIndex]} : ${series[seriesIndex][dataPointIndex]}</span>
                                </div>`
                    }
                } else {
                    return `<div class="font-small-1 dark:bg-slate-950">          
                                <span> 
                                ${(interval === 'TODAY' || interval === 'YESTERDAY') ? `Hour ${xaxis[dataPointIndex]} : ` : `${xaxis[dataPointIndex]} : `}
                                ${series[seriesIndex][dataPointIndex]}
                                </span>
                            </div>`
                }
            }
        }
    }

    const series = isDouble ? [
        {
            name: 'Today',
            data: yaxis
        },
        {
            name: 'Yesterday',
            data: yyaxis
        }
    ] : [
        {
            name: "",
            data: yaxis
        }
    ]

    const getStatSum = () => {
        if (chartName === 'WinRate' || chartName === 'Clicks') return numFormatter(statsCount)
        else return kFormatter(statsCount)
    }

    return (
        <Card className='hover:bg-slate-100 dark:hover:bg-slate-800'>
            <CardHeader>{chartName}</CardHeader>
            <CardContent className='p-4 m-0'>
                <Chart
                    options={options}
                    series={series}
                    type='area'
                    height={100}
                />
            </CardContent>
            <CardFooter>{getStatSum()}</CardFooter>
        </Card>
    )
}
