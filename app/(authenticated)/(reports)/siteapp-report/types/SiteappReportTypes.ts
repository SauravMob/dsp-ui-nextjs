type SiteAppReportType = {
    bids: number
    bundleId: string
    campaignId: number
    campaignName: string
    clicks: number
    conversions: number
    creativeId: number
    creativeName: string
    ctr?: number
    date: string
    ecpm?: number
    impressions: number
    installs: number
    purchaseConversions?: number
    registrationConversions?: number
    repeatEventConversions?: number
    spends: number
    videoCompletion?: number
    siteAppId: number
    siteAppName: string
    sspName: string
    winRate: number
}

type SiteAppReportTabularData = {
    content: SiteAppReportType[]
    totalElements: number
    totalPages: number
    last: boolean
    pageNo: number
    pageSize: number
}

type SiteAppReportFilter = {
    interval: string
    from: string
    to: string
    advertiserId: string
    campaignName: string
    creativeName: string
    exchangeId: string
    reportType: string
    pageNo?: string
    pageSize: string
    isAdmin: boolean
    tabularData?: SiteAppReportTabularData
    exchangeFilterNotAllowed: boolean | undefined
}