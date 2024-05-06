import { endOfMonth, endOfWeek, format, startOfMonth, startOfWeek, subDays, subMonths } from 'date-fns'

export const kFormatter = (num: number) => (num > 10 ? `${(num / 1000).toFixed(1)}k` : num)
export const numFormatter = (num: number) => (new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(num))
export const todayDate = new Date()
export const yesterdayDate = subDays(new Date(), 1)
export const todayMinus2Date = subDays(new Date(), 2)
export const todayMinus7Date = subDays(new Date(), 7)
export const startOfLastWeekDate = startOfWeek(subDays(new Date(), 7))
export const endOfLastWeekDate = endOfWeek(subDays(new Date(), 7))
export const startOfThisMonth = startOfMonth(new Date())
export const endOfThisMonth = endOfMonth(new Date())
export const startOfLastMonth = startOfMonth(subMonths(new Date(), 1))
export const endOfLastMonth = endOfMonth(subMonths(new Date(), 1))
export const todayMinus3MonthsDate = subMonths(new Date(), 3)
export const formatQryDate = (value: Date | undefined) => {
    if (value) return format(value, 'yyyy-MM-dd')
    else return value
}

export const getDateForPosix = (d: number, unit: string) => {
    const u = unit === 'SECONDS' ? 1000 : 1
    try {
        const date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(d * u)
        return date
    } catch (e) {
        return d
    }
}

export function formatNumbers(number: number) {
    const formatter = Intl.NumberFormat("en", {
        notation: "compact",
        maximumFractionDigits: 3
    })
    return formatter.format(number)
}

export function getUpdateStatus(status: string) {
    switch (status) {
        case 'ACTIVE':
            return 'PAUSE'
        case 'PAUSE':
            return 'ACTIVE'
        case 'INACTIVE':
            return 'ACTIVE'
        default:
            return 'DELETED'
    }
}

export const getRole = (role: string) => {
    switch (role) {
        case '1':
            return 'ADVERTISER'
        case '2':
            return 'ADMIN'
        case '3':
            return 'ACCOUNT MANAGER'
        case '4':
            return 'SSP'
        default:
            return 'DELETED'
    }
}

export function getContentWithLimit(str: string, limit: number) {
    if (str !== undefined && str !== null) return str.length > limit ? `${str.substring(0, limit)}...` : str
    else return str
}

export const statusOptions = [
    { label: 'ACTIVE', value: 'ACTIVE' },
    { label: 'INACTIVE', value: 'INACTIVE' },
    { label: 'DELETED', value: 'DELETE' },
    { label: 'PAUSED', value: 'PAUSE' }
]

export const statusWithoutInactiveOptions = [
    { label: 'ACTIVE', value: 'ACTIVE' },
    { label: 'PAUSED', value: 'PAUSE' },
    { label: 'DELETED', value: 'DELETE' }
]

export const statusWithoutPauseOptions = [
    { label: 'ACTIVE', value: 'ACTIVE' },
    { label: 'INACTIVE', value: 'INACTIVE' },
    { label: 'DELETED', value: 'DELETE' }
]

export const osOptions = [
    { label: 'Android', value: 'ANDROID' },
    { label: 'iOS', value: 'IOS' },
    { label: 'Unknown', value: 'UNKNOWN' }
]

export const uploadTypeOptions = [
    { value: "manual", label: "MANUAL" },
    { value: "mmp", label: "MMP" }
]

export const creativeSizeOptions = [
    { value: '320x480', label: '320x480' },
    { value: '320x50', label: '320x50' },
    { value: '160x600', label: '160x600' },
    { value: '600x600', label: '600x600' },
    { value: '300x600', label: '300x600' },
    { value: '768x1024', label: '768x1024' },
    { value: '300x250', label: '300x250' },
    { value: '300x50', label: '300x50' },
    { value: '320x100', label: '320x100' },
    { value: '468x60', label: '468x60' },
    { value: '728x90', label: '728x90' },
    { value: '300x1050', label: '300x1050' },
    { value: '1080x1080', label: '1080x1080' },
    { value: '480x320', label: '480x320' },
    { value: '1024x768', label: '1024x768' },
    { value: '640x360', label: '640x360' },
    { value: '1200x627', label: '1200x627' },
    { value: '336x280', label: '336x280' }
]

export const creativeTypeOptions = [
    { value: 'BANNER', label: 'BANNER' },
    { value: 'JS', label: 'RICHMEDIA' },
    { value: 'VIDEO', label: 'VIDEO' }
]

export const roleOptions = [
    { value: '1', label: 'Advertiser' },
    { value: '2', label: 'Admin' },
    { value: '4', label: 'SSP' },
    { value: '3', label: 'Account Manager' }
]