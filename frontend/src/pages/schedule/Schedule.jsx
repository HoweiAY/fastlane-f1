import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import EventCard from "../../components/event/EventCard";

import { getSchedule } from "../../api/season_schedule";

const Schedule = () => {
    const navigate = useNavigate();

    const currentYear = new Date().getUTCFullYear();
    const seasons = Array.from({ length: currentYear - 2018 + 1 }, (_, index) => 2018 + index).reverse();

    const [season, setSeason] = useState(currentYear);
    const [fullSchedule, setFullSchedule] = useState(null);

    useEffect(() => {
        const loadSchedule = async (year) => {
            const schedule = await getSchedule(year);
            if (!schedule.error) {
                setFullSchedule(schedule.events);
            }
        };
        loadSchedule(season);
    }, [season]);

    const handleChangeSeason = (year) => {
        setSeason(year);
    };

    const handleSelectEvent = (event) => {
        const round = event.round;
        const location = event.location.replace(/ /g, '_');
        navigate(`/event/${season}/${round}/${location}`);
    }

    return (
        <main className="mb-10">
            <header className="flex flex-col justify-center items-center mt-7 mx-7">
                <h1 className="md:rounded-bl-3xl border-b-8 max-md:border-b-2 max-lg:border-b-4 md:border-s-4 lg:border-s-8 border-solid border-red-600 max-md:border-gray-800 px-6 py-4 font-f1-bl text-5xl max-md:text-3xl max-lg:text-4xl text-center">
                    Full FORMULA 1 Schedule {season}
                </h1>
                <p className="py-4 text-xs text-gray-500">* All event dates are in UTC standard time (UTC+00:00).</p>
            </header>
            
            <div className="flex flex-row max-md:flex-col justify-around max-md:justify-center md:mt-4">
                <aside className="flex-auto justify-end w-auto max-md:min-w-72 ps-[5%] max-md:px-[25%] text-right">
                    <h3 className="md:self-end border-b-2 border-e-2 rounded-br-md border-red-600 px-3 py-1 my-3 max-md:mt-1 font-f1-bl text-red-600 text-2xl max-lg:text-xl">Year</h3>
                    <ul className="h-80 max-md:h-40 border-e-2 ps-1 me-1 max-md:mb-3 border-gray-800 font-f1-r text-lg max-lg:text-base text-gray-800 overflow-scroll">
                        {seasons.map((year) => (
                            <li 
                                key={year} 
                                className={`${season === year ? "px-2 bg-slate-200 font-f1-b text-xl max-lg:text-lg" : "px-3 hover:bg-slate-100"} py-2 max-md:py-1 hover:cursor-pointer`}
                                onClick={() => handleChangeSeason(year)}
                            >{year}
                            </li>
                        ))}
                    </ul>
                </aside>

                <div className=" max-md:self-center grid grid-cols-3 max-md:grid-cols-1 max-lg:grid-cols-2 items-stretch gap-5 w-[70%] max-md:w-[65%] min-w-80 ms-4 me-[10%] max-md:mx-20 max-lg:me-24">
                    {fullSchedule && fullSchedule.map((event) => 
                        <EventCard 
                            key={event.dateFormatted}
                            event={event} 
                            onClick={(event) => handleSelectEvent(event)} 
                        />
                    )}
                </div>
            </div>
        </main>
    );
};

export default Schedule;