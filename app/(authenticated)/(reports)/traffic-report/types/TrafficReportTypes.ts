type TrafficReportFilter = {
    pageNo?: string
    pageSize: string
    interval: string
    from: string
    to: string
    advertiserId: string
    sspUserId: string
    exchangeFilterNotAllowed: boolean | undefined
}

type TrafficReportType = {
    advertiser?: string
    advertiserId?: number
    bids: number
    clicks: number
    cost: number
    ctr?: number
    deliveryDate?: string
    ecpm?: number
    gmDollar?: number
    gmPercentage?: number
    hour?: number
    impressions: number
    installs: number
    spends: number
    sspUser?: string
    sspUserId?: number
    winRate: number
}

type TrafficReportTabularData = {
    content: TrafficReportType[]
    totalElements: number
    totalPages: number
    last: boolean
    pageNo: number
    pageSize: number
}