import { endOfMonth, endOfWeek, format, startOfMonth, startOfWeek, subDays, subMonths } from 'date-fns'

export const kFormatter = (num: number) => (num > 10 ? `${(num / 1000).toFixed(1)}k` : num)
export const numFormatter = (num: number) => (new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(num))
export const formatQryDate = (value: Date | undefined) => {
    if (value) return format(value, 'yyyy-MM-dd')
    else return value
}
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