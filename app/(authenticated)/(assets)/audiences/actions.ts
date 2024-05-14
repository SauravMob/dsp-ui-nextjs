"use server"

import { SERVER_URL } from "@/components/constants/ApiConfigConstants"
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

export async function createAudience(audience: AudienceType) {
    const url = `/audiences`
    const result = await HttpRequestApi('POST', url, audience)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    revalidatePath('/audiences')
    return { status: 200, message: `Success` }
}

export async function fetchAudience(id: string) {
    const userId = cookies().get('roleId')?.value === '2' ? '' : `&userId=${cookies().get('userId')?.value}`
    const url = `/audiences/${id}?${userId}`
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

export async function getAllMMPNames() {
    const url = `/audience/mmp-names`
    const result = await HttpRequestApi('GET', url)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    return await result.json()
}

export async function getAllBundleIDsByMMP({
    mmpName,
    searchParam
}: {
    mmpName: string
    searchParam?: string
}) {
    const url = `/audience/bundles?mmpName=${mmpName}${searchParam ? `&searchParam=${searchParam}` : ''}`
    const result = await HttpRequestApi('GET', url)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    return await result.json()
}

export async function getAllEventsByBundleIDAndMMP({
    mmpName,
    bundleId
}: {
    mmpName: string
    bundleId: string
}) {
    const url = `/audience/events?mmpName=${mmpName}&bundleId=${bundleId}`
    const result = await HttpRequestApi('GET', url)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    return await result.json()
}

export async function generateUploadUrl(audienceId: string, userId: string) {
    const uri = `/audience/upload/share-url?audienceId=${audienceId}&userId=${userId}`
    const result = await HttpRequestApi('GET', uri)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    return await result.json()
}

export async function getAudienceEventCount(id: string, bundleId: string, dataWindow: string, mmpName: string, rules: string) {
    const uri = `/audiences/event/count?id=${id}&bundleId=${bundleId}&dataWindow=${dataWindow}&mmpName=${mmpName}&rules=${rules}`
    const result = await HttpRequestApi('GET', uri)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    return await result.json()
}

export async function uploadFiles(formData: FormData) {
    const uri = `/audiences/upload/${cookies().get('userId')?.value}`
    const result = await fetch(`${SERVER_URL}${uri}`, {
        method: "POST",
        body: formData,
        headers: {
            Authorization: `Bearer ${cookies().get("accessToken")?.value}`
        }
    })
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    return await result.json()
}