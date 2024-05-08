"use server"

import { HttpRequestApi } from "@/components/services/HttpRequestApi"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

export async function getAllDeals({
    pageNo,
    pageSize
}: {
    pageNo?: string
    pageSize?: string
}) {
    const userId = cookies().get('roleId')?.value === '2' ? cookies().get('userId')?.value : '1'
    const url = `/pmp_deals??pageNo=${pageNo}&pageSize=${pageSize}&sortBy=id&sortDir=desc&userId=${userId}`
    const result = await HttpRequestApi('GET', url)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    return await result.json()
}

export async function fetchDeal(
    id: string
) {
    const userId = cookies().get('userId')?.value
    const url = `/pmp_deals/${id}?userId=${userId}`
    const result = await HttpRequestApi('GET', url)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    return await result.json()
}

export async function createDeal(
    deal: PmpDealsType
) {
    const url = `/pmp_deals`
    const result = await HttpRequestApi('POST', url, deal)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    revalidatePath('/admin-tools/deals')
    return { status: 200, message: `Success` }
}

export async function updateDeal(
    id: string,
    deal: PmpDealsType
) {
    const userId = cookies().get('userId')?.value
    const url = `/pmp_deals/${id}?userId=${userId}`
    const result = await HttpRequestApi('PUT', url, deal)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    revalidatePath('/admin-tools/deals')
    return { status: 200, message: "Success" }
}