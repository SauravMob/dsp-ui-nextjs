"use server"

import { HttpRequestApi } from "@/components/services/HttpRequestApi"
import { cookies } from "next/headers"

export async function getSiteAppReport({
    pageNo,
    pageSize,
    sortBy,
    sortDirection,
    advertiserId,
    campaignName,
    creativeName,
    exchangeId,
    from,
    to,
    interval,
    reportType
}: {
    pageNo?: string,
    pageSize?: string,
    sortBy: string,
    sortDirection: string,
    advertiserId: string,
    campaignName: string,
    creativeName: string,
    exchangeId: string,
    from: string,
    to: string,
    interval: string,
    reportType: string
}) {
    const customUserId = cookies().get('roleId')?.value === '2' ? '' : `&userId=${cookies().get('userId')?.value}`
    const customInterval = interval === "CUSTOM" ? `&interval=CUSTOM&from=${from}&to=${to}` : `&interval=${interval}`
    const url = `/reports/siteapps?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&sortDirection=${sortDirection}${customUserId}${customInterval}${advertiserId ? `&advertiserId=${advertiserId}` : ''}${exchangeId ? `&exchangeId=${exchangeId}` : ''}${campaignName ? `&campaignName=${campaignName}` : ''}${creativeName ? `&creativeName=${creativeName}` : ''}${reportType ? `&reportType=${reportType}` : ''}`
    const result = await HttpRequestApi('GET', url)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    return await result.json()
}

export async function exportSiteAppReport({
    advertiserId,
    campaignName,
    creativeName,
    exchangeId,
    from,
    to,
    interval,
    reportType
}: {
    advertiserId: string,
    campaignName: string,
    creativeName: string,
    exchangeId: string,
    from: string,
    to: string,
    interval: string,
    reportType: string
}) {
    const customUserId = cookies().get('roleId')?.value === '2' ? '' : `&userId=${cookies().get('userId')?.value}`
    const customInterval = interval === "CUSTOM" ? `interval=CUSTOM&from=${from}&to=${to}` : `interval=${interval}`
    const url = `/reports/siteapps/export?${customInterval}${customUserId}${advertiserId ? `&advertiserId=${advertiserId}` : ''}${exchangeId ? `&exchangeId=${exchangeId}` : ''}${campaignName ? `&campaignName=${campaignName}` : ''}${creativeName ? `&creativeName=${creativeName}` : ''}${reportType ? `&reportType=${reportType}` : ''}`
    const result = await HttpRequestApi('GET', url)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    return { status: 200, message: await result.text() }
}

export async function fetchAllBidMultiplier({
    pageNo, pageSize
}: {
    pageNo: string, pageSize: string
}) {
    const userId = cookies().get('roleId')?.value === '2' ? '' : `&userId=${cookies().get('userId')?.value}`
    const url = `/bid-multiplier?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=id&sortDir=desc${userId}`
    const result = await HttpRequestApi('GET', url)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    return await result.json()
}