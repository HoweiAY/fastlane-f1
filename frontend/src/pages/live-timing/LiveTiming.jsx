import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import LoadingSpinner from "../../components/common/LoadingSpinner";
import LoadingDots from "../../components/common/LoadingDots";
import liveTimingBannerImage from "../../assets/images/common/live_timing_banner_1.png";

import { getLiveDriverData, getLiveFlag, getLiveSafetyCar } from "../../api/live_timing";
import { getSchedule } from "../../api/season_schedule";
import { getEventInfo } from "../../api/gp_event";
import { isEventActive, isSessionActive } from "../../utils/event_utils";

const LiveTiming = () => {
    const navigate = useNavigate();

    const currentYear = new Date().getUTCFullYear();
    const sessions = {
        "practice1": "Practice 1",
        "practice2": "Practice 2",
        "practice3": "Practice 3",
        "sprint": "Sprint",
        "sprintShootout": "Sprint Shootout",
        "qualifying": "Qualifying",
        "race": "Race",
        "testing": "Testing",
        "--": "--",
    }

    const [fullSchedule, setFullSchedule] = useState(null);
    const [round, setRound] = useState(0);
    const [event, setEvent] = useState(null);
    const [eventLoaded, setEventLoaded] = useState(false);
    const [sessionType, setSessionType] = useState("--");
    const [eventActive, setEventActive] = useState(true);
    const [sessionActive, setSessionActive] = useState(true);
    const [driverData, setDriverData] = useState(null);
    const [updateDriverData, setUpdateDriverData] = useState(null);

    useEffect(() => {
        const loadSchedule = async (year) => {
            const schedule = await getSchedule(year);
            if (!schedule.error) {
                setFullSchedule(schedule.events);
            }
        };
        loadSchedule(new Date().getUTCFullYear());
    }, []);

    useEffect(() => {
        const loadEvent = async (year, round) => {
            const event = await getEventInfo(year, round);
            if (!event.error) {
                setEvent(event);
                setRound(round);
                setSessionType("race");
                setEventActive(true);
                setEventLoaded(true);
            }
        };

        if (!fullSchedule) return;

        for (const event of fullSchedule) {
            if (event.round === 0) continue;
            if (isEventActive(event)) {
                loadEvent(currentYear, event.round);
                return;
            }
        }
        setEventActive(false);
        setEventLoaded(true);
    }, [fullSchedule]);

    useEffect(() => {
        if (!event) return;

        for (const [sessionName, sessionInfo] of Object.entries(event.sessions)) {
            if (sessionInfo && isSessionActive(sessionInfo, sessionName)) {
                setSessionActive(true);
                setSessionType(sessionName);
                return;
            }
        }
        setSessionActive(false);
    }, [event]);

    useEffect(() => {
        const loadLiveDriverData = async () => {
            const liveData = await getLiveDriverData();
            if (!liveData.error) {
                setDriverData(liveData.standings);
            }
        }
        loadLiveDriverData();
    }, []);

    const handleSelectSchedule = () => {
        navigate("/schedule");
    };

    return (
        <main className="pb-10 min-h-[90vh] max-md:min-h-[70vh] bg-gray-800 text-white">
            <header 
                className="w-full h-64 max-md:h-48 bg-cover bg-center bg-no-repeat"
                style={{
                    'backgroundImage': `url(${liveTimingBannerImage})`
                }}
            >
                <div className="flex flex-col justify-center items-center w-full h-full bg-gradient-to-t from-gray-800">
                    <h1 className="border-b-8 max-md:border-b-4 border-s-8 max-md:border-s-4 border-red-600 rounded-bl-3xl max-md:rounded-bl-2xl px-6 py-3 max-lg:px-3 max-lg:py-2 font-f1-bl text-5xl max-sm:text-2xl max-md:text-3xl max-lg:text-4xl">
                        Live Timing
                    </h1>
                </div>
            </header>

            {eventLoaded ? ( 
                eventActive ? (
                    <div className="mx-auto pt-14 max-md:pt-10 w-[95%]">
                        <h2 className="px-5 pb-2 max-md:pb-1 font-f1-w text-2xl max-md:text-lg max-lg:text-xl">
                            Round {round}
                        </h2>
                        <h2 className="border-t-8 border-s-8 border-red-600 rounded-tl-3xl ps-4 pe-2 py-3 max-md:ps-3 max-md:py-2 text-2xl max-sm:text-base max-md:text-lg max-lg:text-xl whitespace-break-spaces">
                            {event?.eventName}
                        </h2>
                        {sessionActive ? (
                            <h2 className="border-b-4 max-md:border-b-2 border-white mt-16 mb-8 pb-3 max-md:mt-10 max-md:pb-1 max-lg:pb-2 ps-2 max-md:ps-1 w-[90%] font-f1-b text-4xl max-md:text-2xl max-lg:text-3xl">
                                {sessions[sessionType]}
                            </h2>
                        ) : (
                            <div className="flex flex-col justify-center items-center mx-auto mt-14 p-4 w-fit">
                                <h2 className="mb-3 max-md:mb-1 font-f1-b text-4xl max-md:text-2xl text-center">
                                    Session not live
                                </h2>
                                <p className="px-2 text-base max-md:text-sm text-center">
                                    Please come back again when a session starts.
                                </p>
                                <button 
                                    className="border border-red-600 rounded-lg my-6 p-2 max-md:text-sm bg-red-600"
                                    onClick={() => handleSelectSchedule()}
                                >
                                    View Schedule {">>"}
                                </button>
                            </div>
                        )}
                    </div> 
                ) : ( 
                    <div className="flex flex-col justify-center items-center mx-auto mt-20 p-4 w-fit">
                        <h2 className="mb-3 max-md:mb-1 font-f1-b text-4xl max-md:text-2xl text-center">
                            No live events at the moment
                        </h2>
                        <p className="px-2 text-base max-md:text-sm text-center">
                            Please come back again when an event starts.
                        </p>
                        <button 
                            className="border border-red-600 rounded-lg my-6 p-2 max-md:text-sm bg-red-600"
                            onClick={() => handleSelectSchedule()}
                        >
                            View Schedule {">>"}
                        </button>
                    </div>
                )
            ) : (
                <div className="flex flex-row justify-center items-center w-full h-[400px] max-md:h-[300px]">
                    <LoadingSpinner width={"100"} height={"100"} color={"#FFFFFF"} />
                    {/*<LoadingDots width={"100"} height={"100"} color={"#DC2626"} radius={"5"}/>*/}
                </div>
            )}
        </main> 
    );
};

export default LiveTiming;