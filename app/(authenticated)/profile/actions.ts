'use server'

import { HttpRequestApi } from "@/components/services/HttpRequestApi"
import { cookies } from "next/headers"

export async function fetchUserAccDetail() {
    const userId = cookies().get('userId')?.value
    const url = `/users/${userId}`
    const result = await HttpRequestApi('GET', url)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    return await result.json()
}

export async function fetchTxnSummary() {
    const userId = cookies().get('userId')?.value
    const url = `/users/billing/txn?userId=${userId}`
    const result = await HttpRequestApi('GET', url)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    return await result.json()
}

export async function fetchPaymentHistory() {
    const userId = cookies().get('userId')?.value
    const url = `/users/billing/history?userId=${userId}`
    const result = await HttpRequestApi('GET', url)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    return await result.json()
}