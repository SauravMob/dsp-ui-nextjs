"use server"

import { HttpRequestApi } from "@/components/services/HttpRequestApi"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { SettingsFormData } from "../campaign-manager/helpers/SettingsModal"

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

export async function searchCampaign({
    pageNo,
    pageSize,
    filter
}: {
    pageNo?: string,
    pageSize?: string,
    filter: {
        campaignId?: string,
        country?: string,
        name?: string,
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

