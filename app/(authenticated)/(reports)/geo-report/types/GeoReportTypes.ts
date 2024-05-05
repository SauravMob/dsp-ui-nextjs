type GeoReportType = {
    bids: number,
    campaignId: number,
    campaignName: string,
    clicks: number,
    ctr?: number,
    ecpm?: number,
    geo?: string,
    impressions: number,
    installs: number,
    spends: number,
    supplyType: string
}

type GeoReportTabularData = {
    content: GeoReportType[],
    totalElements: number,
    totalPages: number,
    last: boolean,
    pageNo: number,
    pageSize: number
}

type GeoReportFilter = {
    interval: string,
    from: string,
    to: string,
    advertiserId: string,
    campaignId: string,
    country: string,
    ssp: string,
    pageNo?: string,
    pageSize: string,
    tabularData?: GeoReportTabularData
}