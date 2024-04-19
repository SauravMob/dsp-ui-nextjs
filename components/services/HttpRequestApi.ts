'use server'

import { SERVER_URL } from "../constants/ApiConfigConstants"

export const HttpRequestApi = async (
    method: string,
    url: string,
    data?: object
) => {
    try {
        const res = await fetch(`${SERVER_URL}${url}`, {
            method,
            body: data ? JSON.stringify(data) : "",
            headers: {
                "Content-type": "application/json"
            }
        })
        return res
    } catch (error) {
        throw new Error("Error in accessing api")
    }
}