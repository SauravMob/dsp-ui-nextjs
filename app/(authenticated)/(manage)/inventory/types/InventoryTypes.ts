type InventoryType = {
    appName: string,
    bundleId: string,
    cid?: string,
    clientType?: string,
    contentType?: string,
    createdOn: string,
    defaultAdclient?: number,
    domain: string,
    id: number,
    publisherId: number,
    status: string,
    supplyType: string,
    userId: number
}

type InventoryTabularData = {
    content: InventoryType[],
    totalElements: number,
    totalPages: number,
    last: boolean,
    pageNo: number,
    pageSize: number
}