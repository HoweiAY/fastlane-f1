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
    return (currTimeUTC >= startTimeUTC && currTimeUTC <= endTimeUTC);
};

export const getNextEventRound = (fullSchedule) => {
    if (!fullSchedule || fullSchedule.length === 0) return -1;

    const currTimeUTC = new Date();
    let eventEndTimeUTC;
    let round = 0;
    for (const event of fullSchedule) {
        round = event.round;
        if (round === 0 && new Date(event.startDate.timeFormatted) >= currTimeUTC)
            break;

        eventEndTimeUTC = new Date(`${event.endDate.timeFormatted}Z`);
        eventEndTimeUTC = getSessionEndTimeUTC("race", eventEndTimeUTC);

        if (currTimeUTC <= eventEndTimeUTC) return round;
    }

    return 0;
};

export const isSessionActive = (session, sessionType) => {
    const currTimeUTC = new Date();
    let startTimeUTC = new Date(`${session.timeFormatted}Z`);
    const endTimeUTC = getSessionEndTimeUTC(sessionType, startTimeUTC);

    startTimeUTC.setMinutes(startTimeUTC.getMinutes() - 5);
    return (currTimeUTC >= startTimeUTC && currTimeUTC <= endTimeUTC);
};

export const isSessionFinished = (session, sessionType) => {
    const currTimeUTC = new Date();
    const endTimeUTC = getSessionEndTimeUTC(sessionType, new Date(session.timeFormatted));

    return currTimeUTC > endTimeUTC;
};