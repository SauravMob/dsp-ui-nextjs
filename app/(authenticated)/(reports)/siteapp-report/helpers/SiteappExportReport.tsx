"use client"

import React, { useState } from 'react'
import { exportSiteAppReport } from '../actions'
import FileSaver from 'file-saver'
import { toast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function SiteappExportReport({
    interval,
    from,
    to,
    reportType,
    advertiserId,
    exchangeId,
    campaignName,
    creativeName,
    tabularData
}: {
    interval: string
    from: string
    to: string
    reportType: string
    advertiserId: string
    exchangeId: string
    campaignName: string
    creativeName: string
    tabularData: SiteAppReportTabularData | undefined
}) {
    const [isLoading, setIsLoading] = useState(false)

    const exportData = async () => {
        setIsLoading(true)
        const res = await exportSiteAppReport({ reportType, interval, from, to, campaignName, creativeName, advertiserId, exchangeId })
        if (res.status === 200) {
            const blob = new Blob([res.message], { type: 'application/octet-stream' })
            const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, '')
            FileSaver.saveAs(blob, `siteapp_${currentDate}.csv`)
        } else toast({ title: "Error while export", description: "Couldn't export successfully" })
        setIsLoading(false)
    }

    return (
        <Button size="sm" className={'mr-2'} onClick={exportData} disabled={isLoading || tabularData?.content.length === 0}>
            <Download size={20} className={cn('mr-1', isLoading && 'animate-bounce')} /> Export
        </Button>
    )
}
