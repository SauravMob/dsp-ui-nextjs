"use server"

import { HttpRequestApi } from "@/components/services/HttpRequestApi"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

export async function fetchAllAudience({
    pageNo,
    pageSize
}: {
    pageNo?: string,
    pageSize?: string
}) {
    const userId = cookies().get('roleId')?.value === '2' ? '' : `&userId=${cookies().get('userId')?.value}`
    const url = `/audiences?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=id&sortDir=desc${userId}`
    const result = await HttpRequestApi('GET', url)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    return await result.json()
}

export async function searchAudience({
    pageNo,
    pageSize,
    filter
}: {
    pageNo?: string,
    pageSize?: string,
    filter: AudienceFilter
}) {
    const userId = cookies().get('roleId')?.value === '2' ? '' : `&userId=${cookies().get('userId')?.value}`
    const url = `/audiences/search?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=id&sortDir=desc${userId}`
    const result = await HttpRequestApi('POST', url, filter)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    return await result.json()
}

export async function updateAudience(id: number, audience: AudienceType) {
    const url = `/audiences/${id}`
    const result = await HttpRequestApi('PUT', url, audience)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    revalidatePath('/audiences')
    return { status: 200, message: await result.text() }
}

export async function getAudEvents() {
    const url = `/audience/event`
    const result = await HttpRequestApi('GET', url)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    return await result.json()
}