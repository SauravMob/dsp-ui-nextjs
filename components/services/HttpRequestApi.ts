'use server'

import { cookies } from "next/headers"
import { SERVER_URL } from "../constants/ApiConfigConstants"

export const HttpRequestApi = async (
    method: string,
    url: string,
    data?: object
) => {
    const ACCESS_TOKEN = cookies().get('accessToken')?.value
    try {
        const res = await fetch(`${SERVER_URL}${url}`, {
            method,
            // body: data ? JSON.stringify(data) : "",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${ACCESS_TOKEN}`
            }
        })
        return res
    } catch (error) {
        throw new Error("Error in accessing api")
    }
}