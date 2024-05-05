type AdslotReportType = {
    bundleId: string,
    counts: number,
    deliveryDate: string,
    exchangeId: number,
    placementId: string,
    status: string
}

type AdslotReportTabularData = {
    content: AdslotReportType[],
    totalElements: number,
    totalPages: number,
    last: boolean,
    pageNo: number,
    pageSize: number
}

type AdslotReportFilter = {
    interval: string,
    from: string,
    to: string,
    bundleId: string,
    exchangeId: string,
    pageNo?: string,
    pageSize: string,
    tabularData?: AdslotReportTabularData
}