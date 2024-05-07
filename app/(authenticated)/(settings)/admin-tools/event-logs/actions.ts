"use server"

import { HttpRequestApi } from "@/components/services/HttpRequestApi"

export async function fetchAllEventLogs({
    pageNo,
    pageSize
}: {
    pageNo?: string
    pageSize?: string
}) {
    const url = `/event-logs?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=logId&sortDir=desc`
    const result = await HttpRequestApi('GET', url)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    return await result.json()
}

export async function searchEventLogs({
    pageNo,
    pageSize,
    userId,
    entity,
    entityId,
    eventType,
    startDate,
    endDate
}: {
    pageNo?: string
    pageSize?: string
    userId?: string
    entity?: string
    entityId?: string
    eventType?: string
    startDate?: string
    endDate?: string
}) {
    const url = `/event-logs/search?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=logId&sortDir=desc${entity && `&entity=${entity}`}${entityId && `&entityId=${entityId}`}${eventType && `&eventType=${eventType}`}${startDate && `&startDate=${startDate}`}${endDate && `&endDate=${endDate}`}${userId && `&userId=${userId}`}`
    const result = await HttpRequestApi('GET', url)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    return await result.json()
}