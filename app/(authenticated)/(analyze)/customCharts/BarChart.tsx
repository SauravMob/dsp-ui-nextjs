"use client"

import { Card, CardContent } from '@/components/ui/card'
import React, { useCallback, useState } from 'react'
import Chart from 'react-apexcharts'
import { AutoComplete, SelectInput } from '@/components/utility/customComponents/SelectInput'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { fetchCampaignIdNameList } from '../../(manage)/campaigns/actions'
import { fetchCreativeIdNameList } from '../../(assets)/creatives/actions'

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
    reportType,
    campaignId,
    creativeId
}: {
    data: ReportData[],
    reportType: string,
    campaignId: string,
    creativeId: string
}) {

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            if (value) params.set(name, value)
            else params.delete(name)
            return params.toString()
        },
        [searchParams]
    )

    const [campaign, setCampaign] = useState<string | undefined>(campaignId)
    const [campaignOptions, setCampaignOptions] = useState<{ value: string, label: string }[]>([])
    const [creative, setCreative] = useState<string | undefined>(creativeId)
    const [creativeOptions, setCreativeOptions] = useState<{ value: string, label: string }[]>([])

    const campaignFilter = async (inputValue: string) => {
        const fetch = await fetchCampaignIdNameList(inputValue)
        const options = fetch.map((v: { id: string, name: string }) => ({ value: v.id, label: v.name }))
        setCampaignOptions(options)
        return options
    }

    const creativeFilter = async (inputValue: string) => {
        const fetch = await fetchCreativeIdNameList(inputValue)
        const options = fetch.map((v: { id: string, name: string }) => ({ value: v.id, label: v.name }))
        setCreativeOptions(options)
        return options
    }

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
                    colors: xAxis.map(v => { return localStorage.getItem('theme') === 'dark' ? "white" : "black" })
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
                            onChange={(e) => router.push(`${pathname}?${createQueryString('reportType', e?.value || '')}`, { scroll: false })}
                        />
                    </div>
                    <div className=' col-span-1'>
                        <AutoComplete
                            placeholder="Campaign..."
                            isClearable={true}
                            isSearchable={true}
                            name="campaign"
                            value={campaignOptions.filter(v => v.value === campaign)[0]}
                            loadOptions={campaignFilter}
                            onChange={(e) => {
                                setCampaign(e ? e.value : '')
                                router.push(`${pathname}?${createQueryString('campaignId', e?.value || '')}`, { scroll: false })
                            }}
                        />
                    </div>
                    <div className=' col-span-1'>
                        <AutoComplete
                            placeholder="Creatives..."
                            isClearable={true}
                            isSearchable={true}
                            name="creative"
                            value={creativeOptions.filter(v => v.value === creative)[0]}
                            loadOptions={creativeFilter}
                            onChange={(e) => {
                                setCreative(e ? e.value : '')
                                router.push(`${pathname}?${createQueryString('creativeId', e?.value || '')}`, { scroll: false })
                            }}
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
