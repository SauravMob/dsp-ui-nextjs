import { HttpRequestApi } from "@/components/services/HttpRequestApi"
import { cookies } from "next/headers"

export async function getCampaignReport({
    pageNo,
    pageSize,
    sortBy,
    sortDirection,
    reportType,
    reportingSearchFilter
}: {
    pageNo?: string,
    pageSize?: string,
    sortBy: string,
    sortDirection: string,
    reportType: string,
    reportingSearchFilter: {
        startDate: string,
        endDate: string,
        advertiserId: number,
        campaignName: string,
        country: string,
        exchange: string,
        os: string
    }
}) {
    const userId = cookies().get('roleId')?.value === '2' ? '' : `&userId=${cookies().get('userId')?.value}`
    const url = `/reports/campaign?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDirection}&reportType=${reportType}${userId}`
    const result = await HttpRequestApi('POST', url, reportingSearchFilter)
    if (!result.ok) return { status: 400, message: "Error in fetching data" }
    return await result.json()
}