type PmpDealsType = {
    dealDescription: string
    dealId: string
    id: number
    name: string
    status: string
    userId: number
}

type PmpDealsTabularData = {
    content: PmpDealsType[]
    last: boolean
    pageNo: number
    pageSize: number
    totalElements: number
    totalPages: number
}