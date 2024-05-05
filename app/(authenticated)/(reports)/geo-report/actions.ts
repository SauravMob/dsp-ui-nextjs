"use server"

import { HttpRequestApi } from "@/components/services/HttpRequestApi"

export async function getCampaignGeoReport({
    pageNo,
    pageSize,
    advertiserId,
    campaignId,
    country,
    ssp,
    from,
    to,
    interval
}: {
    pageNo?: string,
    pageSize?: string,
    advertiserId: string,
    campaignId: string,
    country: string,
    ssp: string,
    from: string,
    to: string,
    interval: string
}) {
    const customInterval = interval === "CUSTOM" ? `&interval=CUSTOM&from=${from}&to=${to}` : `&interval=${interval}`
    const url = `/admin/reports/geo?pageNo=${pageNo}&pageSize=${pageSize}${customInterval}${advertiserId ? `&advertiserId=${advertiserId}` : ''}${ssp ? `&ssp=${ssp}` : ''}${campaignId ? `&campaignId=${campaignId}` : ''}${country ? `&country=${country}` : ''}`
    const result = await HttpRequestApi('GET', url)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    return await result.json()
}