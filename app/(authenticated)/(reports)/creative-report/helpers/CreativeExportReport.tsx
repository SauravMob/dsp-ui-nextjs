"use client"

import React, { useState } from 'react'
import { exportCreativeReport } from '../actions'
import FileSaver from 'file-saver'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'

export default function CreativeExportReport({
    reportType,
    campaignId,
    creativeId,
    creativeName,
    interval,
    from,
    to,
    advertiserId,
    tabularData
}: {
    reportType: string,
    campaignId: string,
    creativeId: string,
    creativeName: string,
    from: string,
    to: string,
    interval: string,
    advertiserId: string,
    tabularData: CreativeReportTabularData | undefined
}) {

    const [isLoading, setIsLoading] = useState(false)

    const exportData = async () => {
        setIsLoading(true)
        const res = await exportCreativeReport({ userId: advertiserId, filter: { startDate: from, endDate: to, creativeId: parseInt(creativeId), campaignId: parseInt(campaignId), creativeName, interval, reportType } })
        if (res.status === 200) {
            const blob = new Blob([res.message], { type: 'application/octet-stream' })
            const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, '')
            FileSaver.saveAs(blob, `creative_${currentDate}.csv`)
        } else toast({ title: "Error while export", description: "Couldn't export successfully" })
        setIsLoading(false)
    }

    return (
        <Button size="sm" className='mr-2' onClick={exportData} disabled={isLoading || tabularData?.content.length === 0}>
            <Download size={20} className='mr-1' /> Export
        </Button>
    )
}
