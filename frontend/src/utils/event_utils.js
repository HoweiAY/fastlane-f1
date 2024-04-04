const getTimeUTC = (timeUTC) => {
    return Date.UTC(
        timeUTC.getUTCFullYear(),
        timeUTC.getUTCMonth(),
        timeUTC.getUTCDate(),
        timeUTC.getUTCHours(),
        timeUTC.getUTCMinutes(),
        timeUTC.getUTCSeconds(),
        timeUTC.getUTCMilliseconds()
    );
}

const getSessionEndTimeUTC = (sessionType, startTimeUTC) => {
    let endTimeUTC = new Date(startTimeUTC);
    switch (sessionType) {
        case "practice":
            endTimeUTC.setHours(startTimeUTC.getHours() + 2);
            break;
        case "qualifying":
            endTimeUTC.setHours(startTimeUTC.getHours() + 3);
            break;
        case "sprintShootout":
            endTimeUTC.setHours(startTimeUTC.getHours() + 2);
            break;
        case "sprint":
            endTimeUTC.setHours(startTimeUTC.getHours() + 3);
            break;
        case "race":
            endTimeUTC.setHours(startTimeUTC.getHours() + 4);
            break;
        default:
            endTimeUTC.setHours(startTimeUTC.getHours() + 2);
            break;
    }

    return endTimeUTC;
};

export const isEventActive = (event) => {
    const currTimeUTC = new Date();
    let startTimeUTC = new Date(`${event.startDate.timeFormatted}Z`);
    const endTimeUTC = getSessionEndTimeUTC("race", new Date(`${event.endDate.timeFormatted}Z`));

    startTimeUTC.setHours(startTimeUTC.getHours() - 1);
    return (
        currTimeUTC.getUTCMilliseconds() >= startTimeUTC.getUTCMilliseconds() 
        && currTimeUTC.getUTCMilliseconds() <= endTimeUTC.getUTCMilliseconds()
    );
};

export const isEventFinished = (event) => {

};

export const getNextEvent = (fullSchedule) => {

};

export const isSessionActive = (session, sessionType) => {
    const currTimeUTC = new Date();
    let startTimeUTC = new Date(`${session.timeFormatted}Z`);
    const endTimeUTC = getSessionEndTimeUTC(sessionType, startTimeUTC);

    startTimeUTC.setMinutes(startTimeUTC.getMinutes() - 5);
    return (currTimeUTC.getUTCMilliseconds() >= startTimeUTC.getUTCMilliseconds() && currTimeUTC.getUTCMilliseconds() <= endTimeUTC.getUTCMilliseconds());
};

export const isSessionFinished = (session, sessionType) => {
    const currTimeUTC = new Date();
    const endTimeUTC = getSessionEndTimeUTC(sessionType, new Date(session.timeFormatted));

    return currTimeUTC > endTimeUTC;
};

export const getNextSession = (event) => {

};