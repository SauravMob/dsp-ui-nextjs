"use server"

import { HttpRequestApi } from "@/components/services/HttpRequestApi"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

export async function getAllOptimization({
    pageNo,
    pageSize
}: {
    pageNo?: string
    pageSize?: string
}) {
    const userId = cookies().get('roleId')?.value === '2' ? '' : `&userId=${cookies().get('userId')?.value}`
    const url = `/optimization?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=id&sortDir=desc${userId}`
    const result = await HttpRequestApi('GET', url)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    return await result.json()
}

export async function searchOptimization({
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
    const url = `/optimization/search?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=id&sortDir=desc${campaignId ? `&campaignId=${parseInt(campaignId)}` : ''}${status ? `&status=${status}` : ''}${userId}`
    const result = await HttpRequestApi('GET', url)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    return await result.json()
}

export async function updateOptimization(id: number, optimization: OptimizationType) {
    const url = `/optimization/${id}?userId=${cookies().get('userId')?.value}`
    const result = await HttpRequestApi('PUT', url, optimization)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    revalidatePath('/optimization')
    return { status: 200, message: await result.text() }
}