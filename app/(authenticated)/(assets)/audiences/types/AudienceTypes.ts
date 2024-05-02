type AudienceFilter = {
    pageSize?: string
    audName?: string
    status?: string
}

type AudienceType = {
    audienceCount?: number,
    bundle?: string,
    clickUrl?: string,
    clkInterval?: string,
    createdOn?: string,
    days?: number,
    description?: string,
    dmpPartner?: string,
    filename?: string,
    id: number,
    initialJobRunStatus?: string,
    isClkProcessing?: string,
    lastUpdated?: string,
    mmp: string,
    name: string,
    reengageInterval?: number,
    rules?: string,
    status: string,
    uploadType?: string,
    userId: number
}

type AudienceTabularData = {
    content: AudienceType[],
    totalElements: number,
    totalPages: number,
    last: boolean,
    pageNo: number,
    pageSize: number
}