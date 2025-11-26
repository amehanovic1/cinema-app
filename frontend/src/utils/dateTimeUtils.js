import { startOfWeek, endOfWeek, isWithinInterval } from "date-fns"

export function isDateThisWeek(date) {
    const today = new Date();
    const currentWeekStart = startOfWeek(today, { weekStartsOn: 1 })
    const currentWeekEnd = endOfWeek(today, { weekStartsOn: 1 })
    return isWithinInterval(date, { start: currentWeekStart, end: currentWeekEnd })
}