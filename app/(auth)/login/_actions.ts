'use server'

import { HttpRequestApi } from "@/components/services/HttpRequestApi"
import { cookies } from "next/headers"

type LoginFormData = {
    username: string,
    password: string
}

export async function loginUser(data: LoginFormData) {
    const result = await HttpRequestApi('POST', '/user/login', data)
    const finalResult = await result.json()

    if (finalResult.status === "UNAUTHORIZED") {
        return { status: 401, message: finalResult.message }
    }

    cookies().set({ name: 'userId', value: finalResult.userId, httpOnly: true })
    cookies().set({ name: 'userName', value: finalResult.userName, httpOnly: true })
    cookies().set({ name: 'emailId', value: finalResult.emailId, httpOnly: true })
    cookies().set({ name: 'accessToken', value: finalResult.accessToken, httpOnly: true })
    cookies().set({ name: 'refreshToken', value: finalResult.refreshToken, httpOnly: true })
    cookies().set({ name: 'roleId', value: finalResult.roleId, httpOnly: true })
    cookies().set({ name: 'status', value: finalResult.status, httpOnly: true })
    cookies().set({ name: 'accountBalance', value: finalResult.accountBalance, httpOnly: true })
    cookies().set({ name: 'customFeatures', value: finalResult.customFeatures, httpOnly: true })

    return {status: 200, message: 'Succesfully Logged In'}
}