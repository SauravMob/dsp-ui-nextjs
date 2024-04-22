'use server'

import { cookies } from "next/headers"
import { LoginFormData } from "./login/types/LoginTypes"
import { SignupFormData } from "./signup/types/SignupTypes"
import { revalidatePath } from "next/cache"
import { SERVER_URL } from "@/components/constants/ApiConfigConstants"
import { redirect } from "next/navigation"

export async function loginUser(data: LoginFormData) {
    const result = await fetch(`${SERVER_URL}/user/login`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json"
        }
    })

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

    revalidatePath('/', 'layout')
    redirect('/')
}

export async function registerUser(data: SignupFormData) {
    const result = await fetch(`${SERVER_URL}/user/register`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json"
        }
    })

    const finalResult = await result.json()

    if (finalResult.code === 400 || finalResult.code === 401) {
        return { status: 400, message: finalResult.message }
    }

    revalidatePath('/', 'layout')
    redirect('/login')
}

export async function logout() {
    cookies().set({ name: 'userId', value: '', expires: new Date() })
    cookies().set({ name: 'userName', value: '', expires: new Date() })
    cookies().set({ name: 'emailId', value: '', expires: new Date() })
    cookies().set({ name: 'accessToken', value: '', expires: new Date() })
    cookies().set({ name: 'refreshToken', value: '', expires: new Date() })
    cookies().set({ name: 'roleId', value: '', expires: new Date() })
    cookies().set({ name: 'status', value: '', expires: new Date() })
    cookies().set({ name: 'accountBalance', value: '', expires: new Date() })
    cookies().set({ name: 'customFeatures', value: '', expires: new Date() })
    revalidatePath('/', 'layout')
    redirect('/login')
}