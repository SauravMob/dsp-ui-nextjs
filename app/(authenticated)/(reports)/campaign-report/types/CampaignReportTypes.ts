type CampaignReportFilter = {
    interval: string,
    from: string,
    to: string,
    advertiserId: string,
    exchange: string,
    country: string,
    os: string,
    reportType: string,
    campaignName: string,
    pageNo?: string,
    pageSize: string
}

type CampaignReportType = {
    bids: number,
    campaignId: number,
    campaignName: string,
    clicks: number,
    converions: number,
    ctr?: number,
    dailyBudget?: number,
    date: string,
    ecpm?: number,
    impressions: number,
    purchaseConversions?: number,
    registrationConversions?: number,
    repeatEventConversions?: number,
    spends: number,
    winRate?: number
}

type CampaignReportTabularData = {
    content: CampaignReportType[],
    totalElements: number,
    totalPages: number,
    last: boolean,
    pageNo: number,
    pageSize: number
}