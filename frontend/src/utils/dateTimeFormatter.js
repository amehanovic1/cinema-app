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