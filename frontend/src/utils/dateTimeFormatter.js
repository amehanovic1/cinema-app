import { startOfWeek, endOfWeek, isWithinInterval } from "date-fns"

export function formatDate(dateString) {
    const [year, month, day] = dateString.split("-");
    let newDate = `${day}.${month}.${year}`;
    return newDate;
}

export function formatTime(time) {
    const [hour, minute] = time.split(":");
    let newTime = `${hour}:${minute}`;
    return newTime;
}

export function isDateThisWeek(date) {
    const today = new Date();
    const currentWeekStart = startOfWeek(today, { weekStartsOn: 1 })
    const currentWeekEnd = endOfWeek(today, { weekStartsOn: 1 })
    return isWithinInterval(date, { start: currentWeekStart, end: currentWeekEnd })
}