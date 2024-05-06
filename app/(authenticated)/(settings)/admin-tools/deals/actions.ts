"use server"

import { HttpRequestApi } from "@/components/services/HttpRequestApi"
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
