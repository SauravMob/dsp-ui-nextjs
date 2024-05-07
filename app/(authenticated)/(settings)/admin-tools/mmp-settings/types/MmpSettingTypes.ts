type MmpSettingFilter = {
    pageSize?: string
    bundle?: string
    status?: string
    events?: string
    mmp?: string
}

type MmpSettingType = {
    blDeviceModels: string
    bundle: string
    createdAt: string
    id: number
    isDay: number
    isMin: number
    mmp: string
    mmpEvents: string
    status: string
    suppressedData: string
    updatedAt: string
}

type MmpSettingTabularData = {
    content: MmpSettingType[]
    totalElements: number
    totalPages: number
    last: boolean
    pageNo: number
    pageSize: number
}