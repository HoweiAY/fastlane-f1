import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import LoadingSpinner from "../../components/common/LoadingSpinner";
import QualifyingResult from "../../components/results/QualifyingResult";
import RaceResult from "../../components/results/RaceResult";

import { getEventInfo } from "../../api/gp_event";
import { getQualifyingResult, getRaceResult } from "../../api/results";
import { countryCodes } from "../../utils/country_code";
import { isSessionFinished } from "../../utils/event_utils";

const EventResult = () => {
    const sessionTabs = ["Qualifying", "Race"];

    const { season, round } = useParams();

    const [event, setEvent] = useState(null);
    const [countryCode, setCountryCode] = useState("xx");
    const [sessionTab, setSessionTab] = useState(sessionTabs[0]);
    const [qualifyingResult, setQualifyingResult] = useState(null);
    const [raceResult, setRaceResult] = useState(null);
    const [resultUnavailable, setResultUnavailable] = useState(false);
    const [sessionFinished, setSessionFinished] = useState(true);
    const [reloadResult, setReloadResult] = useState(false);

    useEffect(() => {
        document.title = "Event Result - FastLane";
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const eventRound = round;
        const loadEvent = async (year, round) => {
            const event = await getEventInfo(year, round);
            if (!event.error) {
                setEvent(event);
            }
        };
        loadEvent(Number(season), eventRound);
    }, [season, round]);

    useEffect(() => {
        if (event) {
            document.title = `${event.country} ${season} Result - FastLane`;
            setCountryCode(countryCodes[event.country]?.toLowerCase() || "xx");
            switch (event.country) {
                case "Abu Dhabi":
                    setCountryCode("ae");
                    break;
                case "Great Britain":
                    setCountryCode("gb");
                    break;
                case "Russia":
                    setCountryCode("ru");
                    break;
                default: break;
            }
        }
    }, [event]);

    useEffect(() => {
        const loadQualifyingResult = async (year, round) => {
            setQualifyingResult(null);
            const result = await getQualifyingResult(year, round);
            if (!result.error) {
                setQualifyingResult(result.qualifyingResult);
            }
            else setResultUnavailable(true);
        };

        const loadRaceResult = async (year, round) => {
            setRaceResult(null);
            const result = await getRaceResult(year, round);
            if (!result.error) {
                setRaceResult(result.raceResult);
            }
            else setResultUnavailable(true);
        };

        setResultUnavailable(false);
        if (!event) return;
        
        const sessionName = sessionTab.toLowerCase();
        const eventSession = event.sessions[sessionName];

        if (isSessionFinished(eventSession, sessionName)) {
            setSessionFinished(true);
            switch (sessionTab) {
                case sessionTabs[0]:
                    loadQualifyingResult(season, round);
                    break;
                case sessionTabs[1]:
                    loadRaceResult(season, round);
                    break;
                default: break;
            }
        }
        else setSessionFinished(false);
    }, [event, sessionTab, reloadResult]);

    const handleSwitchSessionTab = (sessionTab) => {
        setSessionTab(sessionTab);
    };

    const handleReloadResult = () => {
        setReloadResult(reload => !reload);
    }

    const displaySessionTab = (sessionTab) => {
        if (!resultUnavailable) {
            switch (sessionTab) {
                case sessionTabs[0]:
                    return (<QualifyingResult qualifyingResult={qualifyingResult} />);
                case sessionTabs[1]:
                    return (<RaceResult raceResult={raceResult} />);
                default:
                    return (
                        <div className="flex flex-row justify-center items-center w-auto h-60 max-md:h-40">
                            <LoadingSpinner width={"100"} height={"100"} color={"#DC2626"}/>
                        </div>
                    );
            }
        }

        return (
            <div className="my-24 text-center">
                <h2 className="font-f1-b text-3xl max-md:text-xl">Cannot load results</h2>
                <p className="my-2 max-md:text-sm whitespace-break-spaces">
                    Something went wrong while trying to load results for this session.
                </p>
                <button 
                    className="my-4 max-md:my-3 rounded-md bg-red-600"
                    onClick={() => handleReloadResult()}
                >
                    <p className="px-3 py-2 max-md:px-2 text-sm text-white">Reload</p>
                </button>
            </div>
        );
    };

    return (
        event ? (
            <main className="mb-10">
                <header className="flex flex-row justify-start items-center mx-[5%] my-20 max-md:mt-8 max-md:mb-6 max-lg:mb-12 w-[90%]">
                    <div className="w-[95%] max-md:w-full min-w-[58rem] max-md:min-w-80 max-lg:min-w-[40rem]">
                        <h1 className="mb-4 ps-4 max-md:mb-2 max-lg:mb-3 font-f1-w text-4xl max-md:text-xl max-lg:text-3xl">
                            Round {`${round}`} <span className={`border rounded-md ms-5 max-md:ms-2 max-lg:ms-3 fi fi-${countryCode}`}></span>
                        </h1>
                        <h1 className="border-t-8 border-s-8 border-red-600 rounded-tl-3xl ps-5 pe-2 py-3 max-md:ps-3 max-md:py-2 text-3xl max-sm:text-base max-md:text-lg max-lg:text-xl whitespace-break-spaces">
                            {event.eventName}
                        </h1>
                    </div>
                </header>

                <div className="mx-[5%] w-[90%]">
                    <h2 className="border-b-4 max-md:border-b-2 border-gray-800 pb-3 max-md:m-auto max-md:pb-1 max-lg:pb-2 ps-2 max-md:ps-1 w-full font-f1-b text-gray-800 text-3xl max-md:text-xl max-lg:text-2xl">
                        Event Results
                    </h2>
                    <p className="mx-1 pt-5 max-md:py-3 text-gray-500 text-sm max-md:text-xs">
                        Select Qualifying or Race to view results for that session.
                    </p>
                    <div className="mx-1 my-4 max-md:mx-auto max-md:my-2 md:w-[95%] min-w-80 overflow-scroll">
                        <div className="flex flex-row justify-start items-center">
                            {sessionTabs.map((session) => (
                                <button
                                    key={session}
                                    className={`rounded-t-sm px-5 py-2 ${sessionTab === session ? "bg-slate-100" : "bg-white"} max-md:text-sm hover:bg-slate-100`}
                                    onClick={() => {
                                        handleSwitchSessionTab(session);
                                    }}
                                >{session}</button>
                            ))}
                        </div>
                        <div className="rounded-tr-sm rounded-b-sm pt-2 pb-3 px-2 min-h-60 max-md:min-h-40 bg-slate-100 whitespace-nowrap overflow-scroll">
                            {sessionFinished ? 
                                displaySessionTab(sessionTab)
                                : (
                                    <div className="my-24 text-center">
                                        <h2 className="font-f1-b text-3xl max-md:text-xl">Results unavailable</h2>
                                        <p className="my-2 max-md:text-sm whitespace-break-spaces">
                                            The session you have selected has not finished yet. Please try again later.
                                        </p>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </main>
        ) : (
            <div className="flex flex-row justify-center items-center w-full h-[500px]">
                <LoadingSpinner width={"100"} height={"100"} color={"#6B7280"} />
            </div>
        )
    )
};

export default EventResult;