"use server"

import { HttpRequestApi } from "@/components/services/HttpRequestApi"
import { revalidatePath } from "next/cache"

export async function fetchAllSiteApps({
    pageNo,
    pageSize
}: {
    pageNo?: string,
    pageSize?: string
}) {
    const url = `/appsites?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=id&sortDir=desc`
    const result = await HttpRequestApi('GET', url)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    return await result.json()
}

export async function searchSiteApp({
    pageNo,
    pageSize,
    exchangeId,
    bundleOrDomain,
    status
}: {
    pageNo?: string,
    pageSize?: string,
    exchangeId: string,
    bundleOrDomain?: string
    status?: string
}) {
    const url = `/appsites/search?pageNo=${pageNo}&pageSize=${pageSize}&exchangeId=${exchangeId}${bundleOrDomain ? `&bundleOrDomain=${bundleOrDomain}` : ""}${status ? `&status=${status}` : ""}&sortBy=id&sortDir=desc`
    const result = await HttpRequestApi('GET', url)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    return await result.json()
}

export async function updateSiteApp(id: number, inventory: InventoryType) {
    const url = `/appsites/${id}`
    const result = await HttpRequestApi('PUT', url, inventory)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    revalidatePath('/inventory')
    return { status: 200, message: await result.text() }
}