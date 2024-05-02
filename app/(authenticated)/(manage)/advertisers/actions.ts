"use server"

import { HttpRequestApi } from "@/components/services/HttpRequestApi"
import { revalidatePath } from "next/cache"

export async function fetchAllUsers({
    pageNo,
    pageSize,
    status,
    email,
    role
}: {
    pageNo?: string,
    pageSize?: string,
    status?: string,
    email?: string,
    role?: string
}) {
    const url = `/users?pageNo=${pageNo}&pageSize=${pageSize}${email ? `&email=${email}` : ''}${role ? `&role=${role}` : ''}&sortBy=id&sortDir=desc${status ? `&status=${status}` : ""}`
    const result = await HttpRequestApi('GET', url)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    return await result.json()
}

export async function addFund({
    amount,
    userId
}: {
    amount: string,
    userId: number
}) {
    const url = `/advertiser/add_fund?amount=${amount}&userId=${userId}`
    const result = await HttpRequestApi('PUT', url)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    revalidatePath("/advertisers")
    return await result.text()
}