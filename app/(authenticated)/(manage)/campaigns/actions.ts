"use server"

import { HttpRequestApi } from "@/components/services/HttpRequestApi"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { SettingsFormData } from "../campaign-manager/helpers/SettingsModal"
import { SERVER_URL } from "@/components/constants/ApiConfigConstants"

export async function fetchAllCampaigns({
    pageNo,
    pageSize
}: {
    pageNo?: string,
    pageSize?: string
}) {
    const userId = cookies().get('roleId')?.value === '2' ? '' : `&userId=${cookies().get('userId')?.value}`
    const url = `/campaigns?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=id&sortDir=desc${userId}`
    const result = await HttpRequestApi('GET', url)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    return await result.json()
}

export async function createCampaign(campaign: CampaignType) {
    const url = `/campaigns`
    const result = await HttpRequestApi('POST', url, campaign)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    revalidatePath('/campaigns')
    return { status: 200, message: `Success` }
}

export async function fetchCampaign(id: string) {
    const userId = cookies().get("roleId")?.value === "2" ? `` : `userId=${cookies().get('userId')?.value}`
    const url = `/campaigns/${id}?${userId}`
    const result = await HttpRequestApi('GET', url)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    return await result.json()
}

export async function searchCampaign({
    pageNo,
    pageSize,
    filter
}: {
    pageNo?: string,
    pageSize?: string,
    filter: {
        name?: string,
        campaignId?: string,
        country?: string,
        os?: string,
        status?: string
        advertiserId?: string,
        accountManagerId?: string
    }
}) {
    const userId = cookies().get('roleId')?.value === '2' ? '' : `&userId=${cookies().get('userId')?.value}`
    const url = `/campaigns/search?pageNo=${pageNo}&pageSize=${pageSize}&sortDir=desc${userId}`
    const result = await HttpRequestApi('POST', url, filter)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    return await result.json()
}

export async function updateCampaign(
    id: number,
    campaign: CampaignType
) {
    const url = `/campaigns/${id}`
    const result = await HttpRequestApi('PUT', url, campaign)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    revalidatePath("/campaigns")
    return { status: 200, message: await result.text() }
}

export async function fetchCampaignIdNameList(
    name?: string
) {
    const userId = cookies().get('roleId')?.value === '2' ? '' : `&userId=${cookies().get('userId')?.value}`
    const url = `/campaigns/idName?row=5${name ? `&name=${name}` : ''}${userId}`
    const result = await HttpRequestApi('GET', url)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    return await result.json()
}

export async function cloneCampaign(
    id: number
) {
    const userId = cookies().get('roleId')?.value === '2' ? '' : `&userId=${cookies().get('userId')?.value}`
    const url = `/campaigns/clone?id=${id}${userId}`
    const result = await HttpRequestApi('GET', url)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    revalidatePath("/campaigns")
    return await result.json()
}

export async function fetchAccountManagerAndAdmins() {
    const url = `/users/acc_managers`
    const result = await HttpRequestApi('GET', url)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    revalidatePath("/campaigns")
    return await result.json()
}

export async function updateCampaignSetting(id: number, setting: SettingsFormData) {
    const url = `/campaigns/setting?id=${id}`
    const result = await HttpRequestApi('PUT', url, setting)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    revalidatePath("/campaign-manager")
    return { status: 200, message: "Successfully updated the campaign setting" }
}

export async function getAllBrands({
    userid
}: {
    userid: number
}) {
    const userId = cookies().get('roleId')?.value === '2' ? `userId=${userid}` : `userId=${cookies().get('userId')?.value}`
    const url = `/brands?${userId}&status=ACTIVE`
    const result = await HttpRequestApi('GET', url)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    return await result.json()
}

export async function getBrand({
    id,
    userId
}: {
    id: string
    userId: string
}) {
    const url = `/brands/${id}?userId=${userId}`
    const result = await HttpRequestApi('GET', url)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    return await result.json()
}

export async function createBrand(brand: {
    description: string,
    name: string,
    status: string,
    userId: number
}) {
    const url = `/brands`
    const result = await HttpRequestApi('POST', url, brand)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    return { status: 200, message: `Success` }
}

export async function deleteBrand(
    id: string,
    userId: string
) {
    const url = `/brands/${userId}/${id}`
    const result = await HttpRequestApi('DELETE', url)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    return { status: 200, message: `Success` }
}

export async function uploadFiles(formData: FormData) {
    const uri = `/campaigns/upload/${formData.get("fileName")}`
    const result = await fetch(`${SERVER_URL}${uri}`, {
        method: "POST",
        body: formData,
        headers: {
            Authorization: `Bearer ${cookies().get("accessToken")?.value}`
        }
    })
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    return await result.json()
}

export async function deleteAttachedCampaigns(id: number, attachedCreatives: string) {
    const url = `/campaigns/attachedCreative?id=${id}&attachedCreatives=${attachedCreatives}`
    const result = await HttpRequestApi('DELETE', url)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    return { status: 200, message: "Successfully removed creative" }
}