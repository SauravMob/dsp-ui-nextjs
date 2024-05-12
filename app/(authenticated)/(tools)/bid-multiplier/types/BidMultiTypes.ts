type BidMultiFilter = {
    pageSize?: string
    campaignId?: string
    status?: string
    isAdmin?: boolean
}

type BidMultiType = {
    bundleBids: string | null,
    campaignId: number,
    cityBids: string | null,
    createdOn?: string,
    exchangeBids: string | null,
    id: number,
    maxBidPrice: number,
    osBids: string | null,
    regionBids: string | null,
    status: string,
    updatedOn?: string,
    userId: number
}

type BidMultiTabularData = {
    content: BidMultiType[],
    totalElements: number,
    totalPages: number,
    last: boolean,
    pageNo: number,
    pageSize: number
}