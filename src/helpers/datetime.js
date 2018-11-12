export const getTimeTextFromTimeSpam = (unix_timestamp) => {
    var date = new Date(unix_timestamp * 1000);
    return date.toDateString();
}

export const getUnixUtcTimeStamp = (date) => {
    return Math.floor(date.getTime() / 1000);
}

 export const getDayText = (date) => {
    let dd = date.getDate();
    let mm = date.getMonth()+1; //January is 0!
    let yyyy = date.getFullYear();

    return `${yyyy}-${mm}-${dd}`;
 }