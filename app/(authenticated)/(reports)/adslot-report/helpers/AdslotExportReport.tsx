"use client"

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Download } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { CSVLink } from 'react-csv'

export default function AdslotExportReport({
    tabularData
}: {
    tabularData: AdslotReportType[]
}) {
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 3000)
    }, [isLoading])

    const header = ['deliveryDate', 'exchangeId', 'placementId', 'status', 'bundleId', 'counts']
    const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, '')
    const fileName = `georeport_${currentDate}`

    return (
        <CSVLink data={tabularData} headers={header} target='_blank' filename={fileName}>
            <Button size="sm" className={'mr-2'} disabled={isLoading || tabularData?.length === 0} onClick={() => setIsLoading(true)}>
                <Download size={20} className={cn('mr-1', isLoading && 'animate-bounce')} /> Export
            </Button>
        </CSVLink>
    )
}
