type CreativeReportType = {
    bids: number,
    campaignId: number,
    campaignName: string,
    clicks: number,
    creativeId: number,
    creativeName: string,
    ctr?: number,
    date: string,
    ecpm?: number,
    impressions: number,
    installs: number,
    purchaseConversions?: number,
    registrationConversions?: number,
    repeatEventConversions?: number,
    spends: number,
    videoCompletion?: number
}

type CreativeReportTabularData = {
    content: CreativeReportType[],
    totalElements: number,
    totalPages: number,
    last: boolean,
    pageNo: number,
    pageSize: number
}

type CreativeReportFilter = {
    interval: string,
    from: string,
    to: string,
    advertiserId: string,
    campaignId: string,
    creativeId: string,
    creativeName: string,
    reportType: string,
    pageNo?: string,
    pageSize: string,
    isAdmin: boolean,
    tabularData?: CreativeReportTabularData
}