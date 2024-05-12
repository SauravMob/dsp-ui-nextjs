"use server"

import { HttpRequestApi } from "@/components/services/HttpRequestApi"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

export async function getAllApplists({
    pageNo,
    pageSize,
    status
}: {
    pageNo?: string,
    pageSize?: string,
    status?: string
}) {
    const userId = cookies().get('roleId')?.value === '2' ? '' : `&userId=${cookies().get('userId')?.value}`
    const url = `/campaigns/applists?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=id&sortDir=desc${userId}${status ? `&status=${status}` : ""}`
    const result = await HttpRequestApi('GET', url)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    return await result.json()
}

export async function searchApplist({
    pageNo,
    pageSize,
    searchParam
}: {
    pageNo?: string,
    pageSize?: string,
    searchParam: string
}) {
    const userId = cookies().get('roleId')?.value === '2' ? '' : `&userId=${cookies().get('userId')?.value}`
    const url = `/campaigns/applist/search?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=id&sortDir=desc${userId}${searchParam ? `&searchParam=${searchParam}` : ""}`
    const result = await HttpRequestApi('GET', url)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    return await result.json()
}

export async function updateApp(id: number, app: ApplistType) {
    const userId = cookies().get('roleId')?.value === '2' ? '' : `&userId=${cookies().get('userId')?.value}`
    const url = `/campaigns/applist/update/?id=${id}`
    const result = await HttpRequestApi('PUT', url, app)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    revalidatePath('/applists')
    return { status: 200, message: await result.text() }
}

export async function fetchApp(id: string) {
    const userId = cookies().get('roleId')?.value === '2' ? '' : `&userId=${cookies().get('userId')?.value}`
    const url = `/campaigns/applist/fetch?id=${id}${userId}`
    const result = await HttpRequestApi('GET', url)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    return await result.json()
}

export async function createApplist(apps: ApplistType) {
    const url = `/campaigns/applist`
    const result = await HttpRequestApi('POST', url, apps)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    revalidatePath('/applists')
    return { status: 200, message: `Success` }
}