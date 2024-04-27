'use server'

import { cookies } from "next/headers"
import { SERVER_URL } from "../constants/ApiConfigConstants"

export const HttpRequestApi = async (
    method: "GET" | "POST" | "PUT" | "DELETE",
    url: string,
    data?: object
) => {
    const ACCESS_TOKEN = cookies().get('accessToken')?.value
    const init: RequestInit = {
        method,
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${ACCESS_TOKEN}`
        }
    }

    if (method === "POST" || method === "PUT") init['body'] = JSON.stringify(data)

    try {
        const res = await fetch(`${SERVER_URL}${url}`, init)
        return res
    } catch (error) {
        throw new Error("Error in accessing api")
    }
}