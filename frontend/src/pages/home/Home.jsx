import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IconContext } from "react-icons";
import { MdArrowOutward } from "react-icons/md";

import EventCarousel from "../../components/event/EventCarousel";
import LoadingSpinner from "../../components/common/LoadingSpinner";

import { getNextEventRound } from "../../utils/event_utils";
import { getSchedule } from "../../api/season_schedule";
import heroBannerImage from "../../assets/images/common/home_banner_1.png";
import resultsDescImage from "../../assets/images/common/home_results_desc_img_1.png";
import driversTeamsDescImage from "../../assets/images/common/home_drivers_teams_desc_img_1.png";

const ScheduleDescription = ({onClick}) => {
    return (
        <div className="md:border-t-4 md:border-e-4 md:border-gray-800 md:rounded-tr-lg p-4 max-md:text-center">
            <h2 className="max-md:border-b-2 max-md:border-gray-800 px-2 max-md:pb-2 font-f1-bl text-4xl max-lg:text-2xl">
                Never miss a race weekend
            </h2>
            <p className="px-2 py-3 max-md:pt-3 text-lg max-md:text-sm max-lg:text-base">
                Stay updated on the current FORMULA 1 event calendar or revisit race schedules of past seasons.
            </p>
            <button 
                className="max-md:hidden border border-red-600 rounded-lg m-2 p-2 text-white max-md:text-sm bg-red-600"
                onClick={onClick}
            >
                View Schedule {">>"}
            </button>
        </div>
    )
};

const ResultDescription = ({onClick}) => {
    return (
        <div className="md:border-t-4 md:border-s-4 md:border-gray-800 md:rounded-tl-lg p-4 max-sm:px-10 max-md:px-16 max-md:py-16 md:mx-10 my-auto w-2/5 max-md:w-full max-md:text-center max-md:bg-black max-md:bg-opacity-60">
            <h2 className="max-md:border-b-2 max-md:border-red-600 px-2 max-md:pb-2 font-f1-bl text-4xl max-lg:text-2xl">
                Discover the thrills and triumphs of each race
            </h2>
            <p className="px-2 py-3 max-md:pt-3 text-lg max-md:text-sm max-lg:text-base">
                Get up to speed with your favourite drivers' and teams' standings, or relive the excitement of previous races with comprehensive race results.
            </p>
            <button 
                className="border md:border-2 border-black max-md:border-gray-900 rounded-lg m-2 px-4 py-2 text-black max-md:text-white max-md:text-sm bg-slate-200 max-md:bg-gray-700"
                onClick={onClick}
            >
                Results {">>"}
            </button>
        </div>
    )
};

const DriversTeamsDescription = ({onClick}) => {
    return (
        <div className="border-t-4 border-e-4 border-red-600 max-md:border-white rounded-tr-lg w-[45%] max-md:w-7/12 p-4 ms-6 me-10 max-md:ps-3 max-md:mx-6 text-white">
            <h2 className="px-2 py-3 max-md:pb-0 max-md:px-0 font-f1-bl text-4xl max-md:text-xl max-lg:text-2xl">
                Get to know the best of the best
            </h2>
            <p className="px-2 py-3 max-md:pt-1 max-md:px-0 max-lg:pt-2 text-lg max-md:text-sm max-lg:text-base">
                Learn about the talented drivers of FORMULA 1 and the elite teams that partake in the sport.
            </p>
            <div className="flex flex-col justify-center items-start px-2 pb-1 max-md:ps-0 font-f1-b text-base max-lg:text-sm">
                <IconContext.Provider value={ { style: { display: "inline" } } }>       
                    <button
                        className="border-b-2 border-s-2 border-red-600 max-md:border-white rounded-bl-md ps-1 pb-1 mx-1 my-2 w-32 max-md:w-28 text-left hover:w-36 max-md:hover:w-32 transition-all duration-300"
                        onClick={() => onClick("drivers")}
                    >
                        <MdArrowOutward /> Drivers
                    </button>
                    <button
                        className="border-b-2 border-s-2 border-red-600 max-md:border-white rounded-bl-md ps-1 pb-1 mx-1 my-2 w-32 max-md:w-28 text-left hover:w-36 max-md:hover:w-32 transition-all duration-300"
                        onClick={() => onClick("teams")}
                    >
                        <MdArrowOutward /> Teams
                    </button>
                </IconContext.Provider>
            </div>
        </div>
    )
};

const Home = () => {
    const navigate = useNavigate();

    const [season, setSeason] = useState(new Date().getUTCFullYear());
    const [fullSchedule, setFullSchedule] = useState(null);
    const [round, setRound] = useState(null);

    useEffect(() => {
        const loadSchedule = async (year) => {
            setFullSchedule(null);
            const schedule = await getSchedule(year);
            if (!schedule.error) {
                const eventRound = getNextEventRound(schedule.events);
                setRound(eventRound);
                setFullSchedule(schedule.events);
            }
        };
        loadSchedule(season);
    }, [season]);

    const handleSelectViewSchedule = () => {
        navigate("/schedule");
    };

    const handleSelectResults = () => {
        navigate("/results");
    };

    const handleSelectDriverTeam = (path) => {
        navigate(`${path}`);
    };

    return (
        <main className="mb-0">
            <header
                className="mb-20 max-md:mb-10 w-full h-[30rem] max-md:h-72 max-lg:h-80 bg-cover bg-bottom bg-no-repeat"
                style={{
                    'backgroundImage': `url(${heroBannerImage})`
                }}
            >
                <div className="flex justify-start items-center w-full h-full bg-gradient-to-r from-slate-900">
                    <div className="flex flex-col ps-14 py-5 max-md:ps-4 max-lg:ps-9 w-[60%] text-white">
                        <h1 className="ps-4 my-2 font-f1-bl text-6xl max-md:text-2xl max-lg:text-4xl">
                            FastLane
                        </h1>
                        <h2 className="border-t-8 max-md:border-t-4 border-s-8 max-md:border-s-4 border-red-600 rounded-tl-2xl max-md:rounded-tl-xl py-3 ps-3 pe-2 max-md:py-2 max-md:ps-2 w-fit max-w-[40rem] max-md:max-w-64 max-lg:max-w-96 text-2xl max-md:text-sm max-lg:text-lg">
                            Your one-stop portal for all your FORMULA 1 needs.
                        </h2>
                    </div>
                </div>
            </header>

            <div>
                <section className="flex flex-row max-md:flex-col justify-evenly items-center mx-5 my-8">
                    <div className="md:hidden w-[95%]">
                        <ScheduleDescription onClick={() => handleSelectViewSchedule()} />
                    </div>
                    <div className="w-1/2 max-w-[30rem] max-sm:w-4/5 max-md:w-8/12 max-lg:w-[45%] mx-8 px-8">
                        {fullSchedule && <EventCarousel fullSchedule={fullSchedule} round={round} />}
                        {!fullSchedule && <LoadingSpinner width={"100"} height={"100"} color={"#DC2626"} />}
                    </div>
                    <button 
                        className="md:hidden border border-red-600 rounded-lg my-4 p-2 text-white max-md:text-sm bg-red-600"
                        onClick={() => handleSelectViewSchedule()}
                    >
                        View Schedule {">>"}
                    </button>

                    <div className="max-md:hidden w-1/2">
                        <ScheduleDescription onClick={() => handleSelectViewSchedule()} />
                    </div>
                </section>
                <section className="max-md:hidden bg-gray-100 mt-12">
                    <div className="flex flex-row justify-between items-center ps-10 max-lg:ps-5 h-[30rem] max-lg:h-[27rem]">
                        <ResultDescription onClick={() => handleSelectResults()} />
                        <img
                            className="w-1/2 h-full object-cover"
                            src= {resultsDescImage}
                            alt="Image of Sainz's victory at the Singapore Grand Prix 2023"
                        />
                    </div>
                </section>
                <section 
                    className="md:hidden flex justify-center items-center max-lg:[26rem] text-white bg-cover bg-center bg-no-repeat"
                    style={{
                        "backgroundImage": `url(${resultsDescImage})`
                    }}
                >
                    <ResultDescription onClick={() => handleSelectResults()} />
                </section>
                <section
                    className="bg-cover bg-left bg-no-repeat"
                    style={{
                        "backgroundImage": `url(${driversTeamsDescImage})`
                    }}
                >
                    <div className="flex flex-row justify-end items-center py-14 h-[30rem] max-md:h-96 max-lg:h-[27rem] bg-gradient-to-l from-gray-800 max-md:from-red-600 via-50% max-md:via-60% via-gray-800 max-md:via-red-600">
                        <DriversTeamsDescription onClick={handleSelectDriverTeam} />
                    </div>
                </section>
            </div>
        </main>
    );
};

export default Home;