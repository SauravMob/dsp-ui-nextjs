"use server"

import { HttpRequestApi } from "@/components/services/HttpRequestApi"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

export async function fetchAllCreatives({
    pageNo,
    pageSize
}: {
    pageNo?: string,
    pageSize?: string
}) {
    const userId = cookies().get('roleId')?.value === '2' ? '' : `&userId=${cookies().get('userId')?.value}`
    const url = `/creatives?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=id&sortDir=desc${userId}`
    const result = await HttpRequestApi('GET', url)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    return await result.json()
}

export async function createCreative(creative: CreativeType) {
    const url = `/creatives`
    const result = await HttpRequestApi('POST', url, creative)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    revalidatePath('/creatives')
    return { status: 200, message: `Success` }
}

export async function fetchCreative(id: string) {
    const userId = cookies().get('roleId')?.value === '2' ? '' : `&userId=${cookies().get('userId')?.value}`
    const url = `/creatives/${id}?${userId}`
    const result = await HttpRequestApi('GET', url)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    return await result.json()
}

export async function searchCreative({
    pageNo,
    pageSize,
    filter
}: {
    pageNo?: string,
    pageSize?: string,
    filter: {
        campaignId: string,
        creativeId: string,
        creativeSize: string,
        creativeType: string,
        status?: string,
        accountManagerId?: string,
        advertiserId?: string
    }
}) {
    const userId = cookies().get('roleId')?.value === '2' ? '' : `&userId=${cookies().get('userId')?.value}`
    const url = `/creatives/search?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=id&sortDir=desc${userId}`
    const result = await HttpRequestApi('POST', url, filter)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    return await result.json()
}

export async function updateCreative(
    id: number,
    creative: CreativeType
) {
    const url = `/creatives/${id}`
    const result = await HttpRequestApi('PUT', url, creative)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    revalidatePath("/creatives")
    return { status: 200, message: await result.text() }
}

export async function deleteAttachedCampaigns(
    id: number,
    userId: number,
    campaignIdsToRemove: string
) {
    const url = `/creative/detachCampaigns?creativeId=${id}&userId=${userId}&campaignIdsToRemove=${campaignIdsToRemove}`
    const result = await HttpRequestApi('DELETE', url)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    revalidatePath("/creatives")
    return { status: 200, message: await result.text() }
}

export async function fetchCreativeIdNameList(
    name?: string,
    id?: string
) {
    const userId = cookies().get('roleId')?.value === '2' ? '' : `&userId=${cookies().get('userId')?.value}`
    const url = `/creatives/idName?row=5${name ? `&name=${name}` : ''}${id ? `&id=${id}` : ''}${userId}`
    const result = await HttpRequestApi('GET', url)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    return await result.json()
}

export async function fetchCreativeTargetedCampaigns(
    creative: CreativeType
) {
    const url = `/creatives/campaigns/${creative.id}?userId=${creative.userId}`
    const result = await HttpRequestApi('GET', url)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    return await result.json()
}

