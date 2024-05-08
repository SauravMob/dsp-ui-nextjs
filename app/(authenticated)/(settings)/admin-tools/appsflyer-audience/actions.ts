"use server"

import { HttpRequestApi } from "@/components/services/HttpRequestApi"
import { revalidatePath } from "next/cache"

export async function getAllAppsFlyerAud() {
    const url = `/appsflyer/audience`
    const result = await HttpRequestApi('GET', url)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    return await result.json()
}

export async function getAppsflyerAudById(
    id: string
) {
    const url = `/appsflyer/audience/${id}`
    const result = await HttpRequestApi('GET', url)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    return await result.json()
}

export async function createAud(
    appsAud: AppsflyerAudienceType
) {
    const url = `/appsflyer/audience`
    const result = await HttpRequestApi('POST', url, appsAud)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    revalidatePath('/admin-tools/appsflyer-audience')
    return { status: 200, message: `Success` }
}

export async function updateAud(
    id: string,
    appsAud: AppsflyerAudienceType
) {
    const url = `/appsflyer/audience?id=${id}`
    const result = await HttpRequestApi('PUT', url, appsAud)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    revalidatePath('/admin-tools/appsflyer-audience')
    return { status: 200, message: "Success" }
}