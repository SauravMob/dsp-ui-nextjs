"use server"

import { HttpRequestApi } from "@/components/services/HttpRequestApi"

export async function fetchAllUsers({
    pageNo,
    pageSize,
    email,
    role,
    status
}: {
    pageNo?: string
    pageSize?: string
    email?: string
    role?: string
    status?: string
}) {
    const url = `/users?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=id&sortDir=desc${email ? `&email=${email}` : ''}${role ? `&role=${role}` : ''}${status ? `&status=${status}` : ''}`
    const result = await HttpRequestApi('GET', url)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    return await result.json()
}
