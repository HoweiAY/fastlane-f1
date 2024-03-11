import { useState, useEffect } from "react";

import EventCard from "../../components/event/EventCard";

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
        <div>
            <h1 className="font-f1-bl text-5xl max-md:text-3xl max-lg:text-4xl text-center whitespace-break-spaces py-14 px-8">Full FORMULA 1 Schedule {season}</h1>
            <div className="flex flex-row justify-around">
                <div className="justify-end w-[30%] text-right">left</div>
                <div className="grid grid-cols-3 max-md:grid-cols-1 max-lg:grid-cols-2 items-stretch gap-5 w-[1fr] mx-10">
                    {fullSchedule && fullSchedule.map((event) => <EventCard key={event.round} event={event}/>)}
                </div>
                <div className="justify-start w-[30%]">right</div>
            </div>
            
        </div>
        </>
    );
};

export default Schedule;