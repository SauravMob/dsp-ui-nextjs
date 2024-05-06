type ManageUserFilter = {
    pageSize?: string
    status?: string
    email?: string
    role?: string
}

type ManageUserType = {
    accountManager: string,
    availableBudget: number,
    campaignCount: number,
    company: string,
    country: string,
    creativeCount: number,
    customFeatures: string,
    domainUrl: string,
    email: string,
    id: number,
    role: number,
    userId: number,
    status: string,
    sspName: string
    username: string
    videoCompletionPercent: string
}

type ManageUserTabularData = {
    content: ManageUserType[],
    totalElements: number,
    totalPages: number,
    last: boolean,
    pageNo: number,
    pageSize: number
}