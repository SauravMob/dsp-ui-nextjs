"use server"

import { HttpRequestApi } from "@/components/services/HttpRequestApi"
import { cookies } from "next/headers"

export async function getCreativeReport({
    pageNo,
    pageSize,
    sortBy,
    sortDirection,
    userId,
    filter
}: {
    pageNo?: string,
    pageSize?: string,
    sortBy: string,
    sortDirection: string,
    userId: string,
    filter: {
        campaignId: number,
        creativeId: number,
        creativeName: string,
        endDate: string,
        interval: string,
        reportType: string,
        startDate: string
    }
}) {
    const customUserId = cookies().get('roleId')?.value === '2' ? userId ? `&userId=${userId}` : '' : `&userId=${cookies().get('userId')?.value}`
    const url = `/reports/creative?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&sortDirection=${sortDirection}${customUserId}`
    const result = await HttpRequestApi('POST', url, filter)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    return await result.json()
}

export async function exportCreativeReport({
    userId,
    filter
}: {
    userId: string,
    filter: {
        campaignId: number,
        creativeId: number,
        creativeName: string,
        endDate: string,
        interval: string,
        reportType: string,
        startDate: string
    }
}) {
    const customUserId = cookies().get('roleId')?.value === '2' ? userId ? `&userId=${userId}` : '' : `&userId=${cookies().get('userId')?.value}`
    const url = `/reports/creative/export?${userId}`
    const result = await HttpRequestApi('POST', url, filter)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    return { status: 200, message: await result.text() }
}