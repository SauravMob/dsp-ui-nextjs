import { format } from 'date-fns'

export const kFormatter = (num: number) => (num > 10 ? `${(num / 1000).toFixed(1)}k` : num)
export const numFormatter = (num: number) => (new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(num))
export const formatQryDate = (value: Date | undefined) => {
    if (value) return format(value, 'yyyy-MM-dd')
    else return value
}
export const todayDate = new Date()
export const todayMinus2Date = new Date(new Date().setDate(new Date().getDate() - 2))
export const todayMinus3MonthsDate = new Date(new Date().setMonth(new Date().getMonth() - 3))
