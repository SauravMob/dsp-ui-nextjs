'use server'

import { HttpRequestApi } from "@/components/services/HttpRequestApi"
import { cookies } from "next/headers"

export async function getImpressionReport(
    interval: string,
    from?: string,
    to?: string
) {
    const userId = cookies().get('userId')?.value
    const url = interval === "CUSTOM" ? `/reports/impressions/${userId}?interval=CUSTOM&from=${from}&to=${to}` : `/reports/impressions/${userId}?interval=${interval}`
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
    const url = interval === "CUSTOM" ? `/reports/clicks/${userId}?interval=CUSTOM&from=${from}&to=${to}` : `/reports/clicks/${userId}?interval=${interval}`
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
    const url = interval === "CUSTOM" ? `/reports/winRate/${userId}?interval=CUSTOM&from=${from}&to=${to}` : `/reports/winRate/${userId}?interval=${interval}`
    const result = await HttpRequestApi('GET', url)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    return await result.json()
}

export async function getEstimateReport(
    interval: string,
    from?: string,
    to?: string
) {
    const userId = cookies().get('userId')?.value
    const url = interval === "CUSTOM" ? `/reports/estimate?userId=${userId}&interval=CUSTOM&from=${from}&to=${to}` : `/reports/estimate?userId=${userId}&interval=${interval}`
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
    const url = interval === "CUSTOM" ? `/reports/${userId}?interval=CUSTOM&from=${from}&to=${to}` : `/reports/${userId}?interval=${interval}`
    const result = await HttpRequestApi('GET', url)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    return await result.json()
}
