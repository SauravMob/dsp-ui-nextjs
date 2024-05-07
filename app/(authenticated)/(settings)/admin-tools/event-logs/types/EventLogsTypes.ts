type EventLogsType = {
    entityId: number
    entityType: string
    eventType: string
    logId: number
    modifiedFieldsJson: string
    timestamp: {
        date: number
        day: number
        hours: number
        minutes: number
        month: number
        nanos: number
        seconds: number
        time: number
        timezoneOffset: number
        year: number
    }
    userId: number
}

type EventLogsTabularData = {
    content: EventLogsType[]
    totalElements: number
    totalPages: number
    last: boolean
    pageNo: number
    pageSize: number
}

type EventLogsFilter = {
    interval: string
    from: string
    to: string
    userId: string
    pageNo?: string
    pageSize: string
    eventType: string
    entity: string
    entityId: string
}