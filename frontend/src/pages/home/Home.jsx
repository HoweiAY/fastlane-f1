import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import EventCarousel from "../../components/event/EventCarousel";
import LoadingSpinner from "../../components/common/LoadingSpinner";

import { getNextEventRound } from "../../utils/event_utils";
import { getSchedule } from "../../api/season_schedule";
import heroBannerImage from "../../assets/images/common/home_banner_1.png";

const ScheduleDescription = ({onClick}) => {
    return (
        <div className="p-4 max-md:text-center md:border-t-4 md:border-e-4 md:border-gray-800 md:rounded-tr-lg">
            <h2 className=" max-md:border-b-2 max-md:border-gray-800 px-2 max-md:pb-2 font-f1-bl text-4xl max-lg:text-2xl">
                Never miss a race weekend
            </h2>
            <p className="px-2 py-3 max-md:pt-3 text-lg max-md:text-sm max-lg:text-base">
                View the entire FORMULA 1 event calendar of the current season as well as past seasons of F1.
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

    return (
        <main className="mb-10">
            <header
                className="mb-20 max-md:mb-14 w-full h-[30rem] max-md:h-60 max-lg:h-80 bg-cover bg-bottom bg-no-repeat"
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

            <div className="m-5">
                <section className="flex flex-row max-md:flex-col justify-evenly items-center my-8">
                    <div className="md:hidden w-[95%]">
                        <ScheduleDescription onClick={() => handleSelectViewSchedule()} />
                    </div>
                    <div className="w-[50%] max-w-[30rem] max-md:w-[80%] max-lg:w-[45%] mx-8 px-8">
                        {fullSchedule && <EventCarousel fullSchedule={fullSchedule} round={round} />}
                        {!fullSchedule && <LoadingSpinner width={"100"} height={"100"} color={"#DC2626"} />}
                    </div>
                    <button 
                        className="md:hidden border border-red-600 rounded-lg my-4 p-2 text-white max-md:text-sm bg-red-600"
                        onClick={() => handleSelectViewSchedule()}
                    >
                        View Schedule {">>"}
                    </button>

                    <div className="max-md:hidden w-[50%]">
                        <ScheduleDescription onClick={() => handleSelectViewSchedule()} />
                    </div>
                </section>
                <section>

                </section>
            </div>
        </main>
    );
};

export default Home;