type BidMultiFilter = {
    pageSize?: string
    campaignId?: string
    status?: string
    isAdmin?: boolean
}

type BidMultiType = {
    bundleBids: string,
    campaignId: number,
    cityBids: string,
    createdOn: string,
    exchangeBids: string,
    id: number,
    maxBidPrice: number,
    osBids: string,
    regionBids: string,
    status: string,
    updatedOn: string,
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