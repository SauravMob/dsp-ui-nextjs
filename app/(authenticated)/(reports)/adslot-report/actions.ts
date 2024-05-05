"use server"

import { HttpRequestApi } from "@/components/services/HttpRequestApi"

export async function getExchangePlacementDataList({
    pageNo,
    pageSize
}: {
    pageNo?: string,
    pageSize?: string
}) {
    const url = `/exchange-placement-data/list?pageNo=${pageNo}&pageSize=${pageSize}`
    const result = await HttpRequestApi('GET', url)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    return await result.json()
}

export async function searchtExchangePlacementData({
    pageNo,
    pageSize,
    bundleId,
    exchangeId,
    from,
    to,
    interval
}: {
    pageNo?: string,
    pageSize?: string,
    bundleId: string,
    exchangeId: string,
    from: string,
    to: string,
    interval: string
}) {
    const customInterval = interval === "CUSTOM" ? `&interval=CUSTOM&from=${from}&to=${to}` : `&interval=${interval}`
    const url = `/exchange-placement-data/search?pageNo=${pageNo}&pageSize=${pageSize}${customInterval}${bundleId ? `&bundleId=${bundleId}` : ''}${exchangeId ? `&exchangeId=${exchangeId}` : ''}`
    const result = await HttpRequestApi('GET', url)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    return await result.json()
}

export async function getExchangesIdName(sspName?: string) {
    const url = `/exchange-placement-data/exchangesIdName?${sspName ? `&sspName=${sspName}` : ''}`
    const result = await HttpRequestApi('GET', url)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    return await result.json()
}

export async function getBundlesDropdown(exchangeId?: string) {
    const url = `/exchange-placement-data/dropdown/bundles?${exchangeId ? `&exchangeId=${exchangeId}` : ''}`
    const result = await HttpRequestApi('GET', url)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    return await result.json()
}