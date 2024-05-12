"use server"

import { HttpRequestApi } from "@/components/services/HttpRequestApi"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

export async function fetchAllBidMultiplier({
    pageNo,
    pageSize
}: {
    pageNo?: string
    pageSize?: string
}) {
    const userId = cookies().get('roleId')?.value === '2' ? '' : `&userId=${cookies().get('userId')?.value}`
    const url = `/bid-multiplier?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=id&sortDir=desc${userId}`
    const result = await HttpRequestApi('GET', url)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    return await result.json()
}

export async function searchBidMultiplier({
    pageNo,
    pageSize,
    campaignId,
    status
}: {
    pageNo?: string
    pageSize?: string
    campaignId?: string
    status?: string
}) {
    const userId = cookies().get('roleId')?.value === '2' ? '' : `&userId=${cookies().get('userId')?.value}`
    const url = `/bid-multiplier/search?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=id&sortDir=desc${campaignId ? `&campaignId=${parseInt(campaignId)}` : ''}${status ? `&status=${status}` : ''}${userId}`
    const result = await HttpRequestApi('POST', url)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    return await result.json()
}

export async function fetchBidMultiplier(id: string) {
    const url = `/bid-multiplier/${id}`
    const result = await HttpRequestApi('GET', url)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    return await result.json()
}

export async function updateBidMultiplier(id: number, bids: BidMultiType) {
    const url = `/bid-multiplier/${id}`
    const result = await HttpRequestApi('PUT', url, bids)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    revalidatePath('/bid-multiplier')
    return { status: 200, message: await result.text() }
}

export async function createBidMultiplier(bid: BidMultiType) {
    const url = `/bid-multiplier`
    const result = await HttpRequestApi('POST', url, bid)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    revalidatePath('/bid-multiplier')
    return { status: 200, message: `Success` }
}