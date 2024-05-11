"use server"

import { HttpRequestApi } from "@/components/services/HttpRequestApi"
import { revalidatePath } from "next/cache"

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


export async function fetchAccountManagerAndAdmins() {
    const url = `/users/acc_managers`
    const result = await HttpRequestApi('GET', url)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    return await result.json()
}

export async function updateUser(
    settings: ManageUserType
) {
    const url = `/users?userId=${settings.userId}`
    const result = await HttpRequestApi('PUT', url, settings)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    revalidatePath('/manage-users')
    return { status: 200, message: "Success" }
}