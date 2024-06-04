type BidMultiFilter = {
    pageSize?: string
    campaignId?: string
    status?: string
    isAdmin?: boolean
}

type BidMultiType = {
    bundleBids: string | null,
    adslotBids: string | null,
    campaignId: number,
    createdOn?: string,
    exchangeBids: string | null,
    id: number,
    maxBidPrice: number,
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