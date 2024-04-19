import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import EventCard from "../../components/event/EventCard";
import LoadingSpinner from "../../components/common/LoadingSpinner";

import { getSchedule } from "../../api/season_schedule";

const Schedule = () => {
    const navigate = useNavigate();

    const currentYear = new Date().getUTCFullYear();
    const seasons = Array.from({ length: currentYear - 2018 + 1 }, (_, index) => 2018 + index).reverse();

    const [season, setSeason] = useState(new Date().getUTCFullYear());
    const [fullSchedule, setFullSchedule] = useState(null);
    const [scheduleError, setScheduleError] = useState(false);
    const [reloadSchedule, setReloadSchedule] = useState(false);

    useEffect(() => {
        document.title = "Schedule - FastLane";
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const loadSchedule = async (year) => {
            setFullSchedule(null);
            const schedule = await getSchedule(year);
            if (!schedule.error) {
                setFullSchedule(schedule.events);
            }
            else setScheduleError(true);
        };
        loadSchedule(season);
    }, [season, reloadSchedule]);

    const handleChangeSeason = (year) => {
        setScheduleError(false);
        setSeason(year);
    };

    const handleReloadSchedule = () => {
        setReloadSchedule(reload => !reload);
        setScheduleError(false);
    };

    return (
        <main className="mb-10 min-h-[90vh]">
            <header className="flex flex-col justify-center items-center mt-7 mx-7">
                <h1 className="md:rounded-bl-3xl border-b-8 max-md:border-b-2 max-lg:border-b-4 md:border-s-4 lg:border-s-8 border-solid border-red-600 max-md:border-gray-800 px-6 py-4 font-f1-bl text-5xl max-md:text-3xl max-lg:text-4xl text-center">
                    Full FORMULA 1 Schedule {season}
                </h1>
                <p className="py-4 text-xs text-gray-500">* All event dates are in UTC standard time (UTC+00:00).</p>
            </header>
            
            <div className="flex flex-row max-md:flex-col justify-around max-md:justify-center md:mt-4">
                <aside className="flex-auto justify-end w-auto max-md:min-w-72 ps-[5%] max-md:px-[25%] text-right">
                    <h3 className="md:self-end border-b-2 border-e-2 rounded-br-md border-red-600 px-3 py-1 my-3 max-md:mt-1 font-f1-bl text-red-600 text-2xl max-lg:text-xl">Year</h3>
                    <ul className="h-80 max-md:h-40 border-e-2 ps-1 me-1 max-md:mb-3 border-gray-800 font-f1-r text-lg max-lg:text-base text-gray-800 overflow-y-scroll overflow-x-hidden">
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

                {fullSchedule ? (
                    <div className="max-md:self-center grid grid-cols-3 max-md:grid-cols-1 max-lg:grid-cols-2 items-stretch gap-5 w-[70%] max-md:w-[65%] min-w-80 ms-4 me-[10%] max-md:mx-20 max-lg:me-24">
                        {fullSchedule.map((event) => 
                            <EventCard 
                                key={event.eventName}
                                year={season}
                                event={event}
                                stylized={true}
                            />
                        )}
                    </div>
                ) : scheduleError ? (
                    <div className="max-md:self-center flex flex-col justify-center items-center md:mx-10 max-md:my-6 w-[75%] h-100 max-md:w-[85%] max-md:h-60 min-w-80 text-center">
                        <h2 className="font-f1-b text-5xl max-md:text-3xl max-lg:text-4xl">
                            Error loading schedule
                        </h2>
                        <p className="mt-3 max-md:mt-2 max-md:text-sm whitespace-break-spaces">
                            An error has occurred while loading the season schedule.
                        </p>
                        <button 
                            className="border border-red-600 rounded-md bg-red-600 my-4 max-md:my-3 px-3 py-1 text-white text-lg max-md:text-base"
                            onClick={() => handleReloadSchedule()}
                        >
                            Retry
                        </button>
                    </div>
                ) : (
                    <div className="max-md:self-center flex flex-row justify-center items-center w-[70%] h-100 max-md:h-300 max-md:w-[65%] min-w-80 ms-4 me-[10%] max-lg:mt-4">
                        <LoadingSpinner width={"100"} height={"100"} color={"#DC2626"} />
                    </div>
                )}
                    
            </div>
        </main>
    );
};

export default Schedule;