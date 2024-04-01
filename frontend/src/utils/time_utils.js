export const millisecondToTimeString = (timeMillisecond, includeHours = true) => {
    const hours = Math.floor(timeMillisecond / 3600000);
    const minutes = Math.floor((timeMillisecond % 3600000) / 60000);
    const seconds = Math.floor((timeMillisecond % 60000) / 1000);
    const milliseconds = timeMillisecond % 1000;

    const hoursFormatted = hours < 10 ? "0" + hours : hours;
    const minutesFormatted = minutes < 10 ? "0" + minutes : minutes;
    const secondsFormatted = seconds < 10 ? "0" + seconds : seconds;
    const millisecondsFormatted = 
        milliseconds < 10
        ? "00" + milliseconds
        : milliseconds < 100
        ? "0" + milliseconds
        : milliseconds;
    
    if (hours > 0 || includeHours)
        return `${hoursFormatted}:${minutesFormatted}:${secondsFormatted}.${millisecondsFormatted}`;
    else return `${minutesFormatted}:${secondsFormatted}.${millisecondsFormatted}`;
};