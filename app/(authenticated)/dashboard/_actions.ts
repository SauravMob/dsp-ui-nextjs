'use server'

import { HttpRequestApi } from "@/components/services/HttpRequestApi"
import { cookies } from "next/headers"

const userId = cookies().get('userId')?.value

export async function getImpressionReport(interval: string) {
    const url = `/reports/impressions/${userId}/?interval=${interval}`
    const result = await HttpRequestApi('GET', url)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    return await result.json()
}

export async function getClickReport(interval: string) {
    const url = `/reports/clicks/${userId}/?interval=${interval}`
    const result = await HttpRequestApi('GET', url)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    return await result.json()
}

export async function getWinRateReport(interval: string) {
    const url = `/reports/winRate/${userId}/?interval=${interval}`
    const result = await HttpRequestApi('GET', url)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    return await result.json()
}

export async function getEstimateReport(interval: string) {
    const url = `/reports/estimate/?userId=${userId}&interval=${interval}`
    const result = await HttpRequestApi('GET', url)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    return await result.json()
}