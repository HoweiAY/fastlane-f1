import { useState, useEffect } from "react";

import { getSchedule } from "../../api/season_schedule";

const Schedule = () => {
    const [season, setSeason] = useState(new Date().getUTCFullYear());
    const [fullSchedule, setFullSchedule] = useState(null);

    const loadSchedule = async (year) => {
        const schedule = await getSchedule(year);
        if (!schedule.error) {
            setFullSchedule(schedule.events);
        }
    };

    useEffect(() => {
        loadSchedule(season);
    }, [season]);

    return (
        <>
        <div className="px-10">
            <h1 className="font-f1-b text-4xl text-center py-14 px-8">This is the heading of the Schedule page.</h1>
            {fullSchedule && fullSchedule.map((event) => <p key={event.round}>{event.eventName}</p>)}
        </div>
        </>
    );
};

export default Schedule;