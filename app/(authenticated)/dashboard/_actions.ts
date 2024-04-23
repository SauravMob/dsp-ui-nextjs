'use server'

import { HttpRequestApi } from "@/components/services/HttpRequestApi"
import { cookies } from "next/headers"

const userId = cookies().get('userId')?.value

export async function getImpressionReport() {
    const url = `/reports/impressions/${userId}/?interval=LAST_SEVEN_DAYS`
    const result = await HttpRequestApi('GET', url)
    if (!result.ok) return {status: 400, message: "Error in fetching data"}
    return await result.json()
}

export async function getClickReport() {
    const url = `/reports/clicks/${userId}/?interval=LAST_SEVEN_DAYS`
    const result = await HttpRequestApi('GET', url)
    if (!result.ok) return {status: 400, message: "Error in fetching data"}
    return await result.json()
}

export async function getWinRateReport() {
    const url = `/reports/winRate/${userId}/?interval=LAST_SEVEN_DAYS`
    const result = await HttpRequestApi('GET', url)
    if (!result.ok) return {status: 400, message: "Error in fetching data"}
    return await result.json()
}

export async function getEstimateReport() {
    const url = `/reports/estimate/?userId=${userId}&interval=LAST_SEVEN_DAYS`
    const result = await HttpRequestApi('GET', url)
    if (!result.ok) return {status: 400, message: "Error in fetching data"}
    return await result.json()
}