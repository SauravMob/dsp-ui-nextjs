type AdvertiserType = {
    accountManager?: string,
    availableBudget?: number,
    campaignCount?: number,
    company?: string,
    country?: string,
    creativeCount?: number,
    customFeatures?: string,
    domainUrl?: string,
    email: string,
    id: number,
    role: number,
    sspName?: string,
    status: string,
    userId: number,
    username?: string,
    videoCompletionPercent?: string
}

type AdvertiserTabularData = {
    content: AdvertiserType[],
    totalElements: number,
    totalPages: number,
    last: boolean,
    pageNo: number,
    pageSize: number
}