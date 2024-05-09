"use server"

import { HttpRequestApi } from "@/components/services/HttpRequestApi"
import { revalidatePath } from "next/cache"

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

export async function fetchCalcFilter(
    id: string
) {
    const url = `/calcFilter/${id}`
    const result = await HttpRequestApi('GET', url)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    return await result.json()
}

export async function createCalcFilter(
    settings: ManageReportType
) {
    const url = `/calcFilter`
    const result = await HttpRequestApi('POST', url, settings)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    revalidatePath('/admin-tools/manage-reports')
    return { status: 200, message: `Success` }
}

export async function updateCalcFilter(
    id: string,
    settings: ManageReportType
) {
    const url = `/calcFilter/${id}`
    const result = await HttpRequestApi('PUT', url, settings)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    revalidatePath('/admin-tools/manage-reports')
    return { status: 200, message: "Success" }
}