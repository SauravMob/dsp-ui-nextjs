'use server'

export const HttpRequestApi = async (
    method: string,
    url: string,
    data?: object
) => {
    try {
        const res = await fetch(`http://localhost:8080/api${url}`, {
            method: method,
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