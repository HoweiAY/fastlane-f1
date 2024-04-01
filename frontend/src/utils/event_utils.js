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

};

export const isEventFinished = (event) => {

};

export const getNextEvent = (fullSchedule) => {

};

export const isSessionActive = (session, sessionType) => {
    const currTimeUTC = new Date();
    const startTimeUTC = new Date(session.timeFormatted);
    const endTimeUTC = getSessionEndTimeUTC(sessionType, startTimeUTC);

    return (currTimeUTC >= startTimeUTC && currTimeUTC <= endTimeUTC);
};

export const isSessionFinished = (session, sessionType) => {
    const currTimeUTC = new Date();
    const endTimeUTC = getSessionEndTimeUTC(sessionType, new Date(session.timeFormatted));

    return currTimeUTC > endTimeUTC;
};

export const getNextSession = (event) => {

};