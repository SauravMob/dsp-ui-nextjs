type OptimizationFilter = {
    pageSize?: string
    campaignId?: string
    status?: string
}

type OptimizationType = {
    campaignId: number,
    createdOn: string,
    id: number,
    maxBudgetPerSiteid: number | null,
    maxImpPerClick: number | null,
    status: string,
    updatedOn: string,
    userId: number
}

type OptimizationTabularData = {
    content: OptimizationType[],
    totalElements: number,
    totalPages: number,
    last: boolean,
    pageNo: number,
    pageSize: number
}