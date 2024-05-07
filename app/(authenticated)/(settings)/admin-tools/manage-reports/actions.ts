"use server"

import { HttpRequestApi } from "@/components/services/HttpRequestApi"

export async function fetchAllCalcFilter({
    status
}: {
    status?: string
}) {
    const url = `/calcFilter?${status ? `&status=${status}` : ''}`
    const result = await HttpRequestApi('GET', url)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    let res
    try {
        res = await result.json()
    } catch (error) {
        res = []
    }
    return res
}
