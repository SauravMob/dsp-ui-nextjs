"use client"

import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import React, { useState } from 'react'
import { exportCampaignReport } from '../actions'
import FileSaver from 'file-saver'
import { toast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'

export default function CampaignExportReport({
    reportType,
    campaignName,
    from,
    to,
    advertiserId,
    country,
    exchange,
    os,
    tabularData
}: {
    reportType: string,
    campaignName: string,
    from: string,
    to: string,
    advertiserId: string,
    country: string,
    exchange: string,
    os: string,
    tabularData: CampaignReportTabularData | undefined
}) {

    const [isLoading, setIsLoading] = useState(false)

    const exportData = async () => {
        setIsLoading(true)
        const res = await exportCampaignReport({ reportType, reportingSearchFilter: { startDate: from, endDate: to, advertiserId: parseInt(advertiserId), campaignName, country, exchange, os } })
        if (res.status === 200) {
            const blob = new Blob([res.message], { type: 'application/octet-stream' })
            const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, '')
            FileSaver.saveAs(blob, `campaign_${currentDate}.csv`)
            toast({ title: "Export Complete", description: "Exported campaign report" })
        } else toast({ title: "Error while export", description: "Couldn't export successfully" })
        setIsLoading(false)
    }

    return (
        <Button size="sm" className='mr-2' onClick={exportData} disabled={isLoading || tabularData?.content.length === 0}>
            <Download size={20} className={cn('mr-1', isLoading && 'animate-bounce')} /> Export
        </Button>
    )
}
