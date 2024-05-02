type ApplistType = {
    bundle_count?: number,
    bundles: string,
    createdAt?: string,
    created_by?: string,
    description?: string,
    id: number,
    name: string,
    status: string,
    updatedAt?: string,
    userId: number
}

type ApplistTabularData = {
    content: ApplistType[],
    totalElements: number,
    totalPages: number,
    last: boolean,
    pageNo: number,
    pageSize: number
}