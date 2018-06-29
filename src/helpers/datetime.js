export const getTimeTextFromTimeSpam = (unix_timestamp) => {
    var date = new Date(unix_timestamp * 1000);
    return date.toDateString();
}

export const getUnixUtcTimeStamp = (date) => {
    return Math.floor(date.getTime() / 1000);
}