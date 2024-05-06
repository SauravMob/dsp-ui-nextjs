"use server"

import { HttpRequestApi } from "@/components/services/HttpRequestApi"

export async function getAllAppsFlyerAud() {
    const url = `/appsflyer/audience`
    const result = await HttpRequestApi('GET', url)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    return await result.json()
}