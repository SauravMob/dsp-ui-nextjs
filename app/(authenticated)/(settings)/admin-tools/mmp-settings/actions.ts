"use server"

import { HttpRequestApi } from "@/components/services/HttpRequestApi"

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