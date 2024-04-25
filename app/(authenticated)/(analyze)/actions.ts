'use server'

import { HttpRequestApi } from "@/components/services/HttpRequestApi"
import { cookies } from "next/headers"

export async function getImpressionReport(
    interval: string,
    from?: string,
    to?: string
) {
    const userId = cookies().get('userId')?.value
    const customInterval = interval === "CUSTOM" ? `interval=CUSTOM&from=${from}&to=${to}` : `interval=${interval}`
    const url = `/reports/impressions/${userId}?${customInterval}`
    const result = await HttpRequestApi('GET', url)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    return await result.json()
}

export async function getClickReport(
    interval: string,
    from?: string,
    to?: string
) {
    const userId = cookies().get('userId')?.value
    const customInterval = interval === "CUSTOM" ? `interval=CUSTOM&from=${from}&to=${to}` : `interval=${interval}`
    const url = `/reports/clicks/${userId}?${customInterval}`
    const result = await HttpRequestApi('GET', url)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    return await result.json()
}

export async function getWinRateReport(
    interval: string,
    from?: string,
    to?: string
) {
    const userId = cookies().get('userId')?.value
    const customInterval = interval === "CUSTOM" ? `interval=CUSTOM&from=${from}&to=${to}` : `interval=${interval}`
    const url = `/reports/winRate/${userId}?${customInterval}`
    const result = await HttpRequestApi('GET', url)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    return await result.json()
}

export async function getEstimateReport(
    interval: string,
    from?: string,
    to?: string
) {
    const roleId = cookies().get('roleId')?.value
    const userId = roleId === '2' ? '' : cookies().get('userId')?.value
    const customInterval = interval === "CUSTOM" ? `interval=CUSTOM&from=${from}&to=${to}` : `interval=${interval}`
    const url = `/reports/estimate?${customInterval}${userId ? `&userId=${userId}` : ''}`
    const result = await HttpRequestApi('GET', url)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    return await result.json()
}

export async function getTabularReport(
    interval: string,
    from?: string,
    to?: string
) {
    const userId = cookies().get('userId')?.value
    const customInterval = interval === "CUSTOM" ? `interval=CUSTOM&from=${from}&to=${to}` : `interval=${interval}`
    const url = `/reports/${userId}?${customInterval}`
    const result = await HttpRequestApi('GET', url)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    return await result.json()
}

export async function getBarChartData(
    interval: string,
    from?: string,
    to?: string,
    reportType?: string,
    campaignId?: string,
    creativeId?: string
) {
    const userId = cookies().get('userId')?.value
    const customInterval = interval === "CUSTOM" ? `interval=CUSTOM&from=${from}&to=${to}` : `interval=${interval}`
    const url = `/barChart?${customInterval}&reportType=${reportType?.toUpperCase()}&userId=${userId}${campaignId ? `&campaignId=${campaignId}` : ''}${creativeId ? `&creativeId=${creativeId}` : ''}`
    const result = await HttpRequestApi('GET', url)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    return await result.json()
}

export async function fetchCampaignIdNameList(
    name?: string
) {
    const userId = cookies().get('userId')?.value
    const url = `/campaigns/idName?row=5${name ? `&name=${name}` : ''}&userId=${userId}`
    const result = await HttpRequestApi('GET', url)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    return await result.json()
}

export async function fetchCreativeIdNameList(
    name?: string
) {
    const userId = cookies().get('userId')?.value
    const url = `/creatives/idName?row=5${name ? `&name=${name}` : ''}&userId=${userId}`
    const result = await HttpRequestApi('GET', url)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    return await result.json()
}


// Admin Dashboard APIS
export async function getImpressionChartData(
    interval?: string,
    from?: string,
    to?: string,
    advertiserId?: string,
    sspUserId?: string
) {
    const customInterval = interval === "CUSTOM" ? `interval=CUSTOM&from=${from}&to=${to}` : `interval=${interval}`
    const url = `/admin/reports/impressions?${customInterval}${advertiserId ? `&advertiserId=${advertiserId}` : ''}${sspUserId ? `&spUserId=${sspUserId}` : ''}`
    const result = await HttpRequestApi('GET', url)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    return await result.json()
}

export async function getClicksChartData(
    interval?: string,
    from?: string,
    to?: string,
    advertiserId?: string,
    sspUserId?: string
) {
    const customInterval = interval === "CUSTOM" ? `interval=CUSTOM&from=${from}&to=${to}` : `interval=${interval}`
    const url = `/admin/reports/clicks?${customInterval}${advertiserId ? `&advertiserId=${advertiserId}` : ''}${sspUserId ? `&spUserId=${sspUserId}` : ''}`
    const result = await HttpRequestApi('GET', url)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    return await result.json()
}

export async function getBidsChartData(
    interval?: string,
    from?: string,
    to?: string,
    advertiserId?: string,
    sspUserId?: string
) {
    const customInterval = interval === "CUSTOM" ? `interval=CUSTOM&from=${from}&to=${to}` : `interval=${interval}`
    const url = `/admin/reports/bids?${customInterval}${advertiserId ? `&advertiserId=${advertiserId}` : ''}${sspUserId ? `&spUserId=${sspUserId}` : ''}`
    const result = await HttpRequestApi('GET', url)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    return await result.json()
}

export async function getAdminTabularReport(
    interval?: string,
    from?: string,
    to?: string,
    advertiserId?: string,
    sspUserId?: string,
    pageNo?: string,
    pageSize?: string
) {
    const customInterval = interval === "CUSTOM" ? `interval=CUSTOM&from=${from}&to=${to}` : `interval=${interval}`
    const url = `/admin/reports/tabular?${customInterval}${advertiserId ? `&advertiserId=${advertiserId}` : ''}${sspUserId ? `&spUserId=${sspUserId}` : ''}&pageNo=${pageNo}&pageSize=${pageSize}`
    const result = await HttpRequestApi('GET', url)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    return await result.json()
}