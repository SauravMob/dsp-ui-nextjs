"use server"

import { HttpRequestApi } from "@/components/services/HttpRequestApi"
import { revalidatePath } from "next/cache"

export async function fetchALLMMPSettings({
    pageNo,
    pageSize,
    bundle,
    mmp,
    events,
    status
}: {
    pageNo: string
    pageSize: string
    bundle: string
    mmp: string
    events: string
    status: string
}) {
    const url = `/mmp_settings?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=id&sortDir=desc${bundle && `&bundle=${bundle}`}${events && `&events=${events}`}${mmp && `&mmp=${mmp}`}${status && `&status=${status}`}`
    const result = await HttpRequestApi('GET', url)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    return await result.json()
}

export async function fetchMMPSetting(
    id: string
) {
    const url = `/mmp_settings/${id}`
    const result = await HttpRequestApi('GET', url)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    return await result.json()
}

export async function createMMPSetting(
    settings: MmpSettingType
) {
    const url = `/mmp_settings`
    const result = await HttpRequestApi('POST', url, settings)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    revalidatePath('/admin-tools/mmp-settings')
    return { status: 200, message: `Success` }
}

export async function updateMMPSetting(
    id: string,
    settings: MmpSettingType
) {
    const url = `/mmp_settings/${id}`
    const result = await HttpRequestApi('PUT', url, settings)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    revalidatePath('/admin-tools/mmp-settings')
    return { status: 200, message: "Success" }
}