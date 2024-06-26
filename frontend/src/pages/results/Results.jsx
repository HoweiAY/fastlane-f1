import { useState, useEffect } from "react";

import DriverStandings from "../../components/standings/DriverStandings";
import ConstructorStandings from "../../components/standings/ConstructorStandings";
import EventList from "../../components/event/EventList";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import resultsBannerImage from "../../assets/images/common/results_banner_1.png";

import { getDriverStandings, getConstructorStandings } from "../../api/results";
import { getSchedule } from "../../api/season_schedule";

const Results = () => {
    const currentYear = new Date().getUTCFullYear();
    const seasons = Array.from({ length: currentYear - 2018 + 1 }, (_, index) => 2018 + index).reverse();
    const championshipResultTabs = ["Drivers", "Constructors"];

    const [season, setSeason] = useState(new Date().getUTCFullYear());
    const [fullSchedule, setFullSchedule] = useState(null);
    const [driverStandings, setDriverStandings] = useState(null);
    const [constructorStandings, setConstructorStandings] = useState(null);
    const [championshipResultTab, setChampionshipResultTab] = useState(championshipResultTabs[0]);

    useEffect(() => {
        document.title = "Results - FastLane";
    }, []);

    useEffect(() => {
        const loadDriverStandings = async (year) => {
            setDriverStandings(null);
            const standings = await getDriverStandings(year);
            if (!standings.error) {
                setDriverStandings(standings["driverStandings"]);
            }
        };

        const loadConstructorStandings = async (year) => {
            setConstructorStandings(null);
            const standings = await getConstructorStandings(year);
            if (!standings.error) {
                setConstructorStandings(standings["constructorStandings"]);
            }
        };

        switch (championshipResultTab) {
            case championshipResultTabs[0]:
                loadDriverStandings(season);
                break;
            case championshipResultTabs[1]:
                loadConstructorStandings(season);
                break;
            default: break;
        }
    }, [season, championshipResultTab]);

    useEffect(() => {
        const loadSchedule = async (year) => {
            setFullSchedule(null);
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

    const handleSwitchChampionshipResultTab = (resultTab) => {
        setChampionshipResultTab(resultTab);
    };

    const displayChampionshipResultTab = (resultTab) => {
        switch (resultTab) {
            case championshipResultTabs[0]:
                return (<DriverStandings driverStandings={driverStandings} />);
            case championshipResultTabs[1]:
                return (<ConstructorStandings constructorStandings={constructorStandings} />);
            default:
                return (
                    <div className="flex flex-row justify-center items-center w-auto h-60 max-md:h-40">
                        <LoadingSpinner width={"100"} height={"100"} color={"#DC2626"}/>
                    </div>
                );
        }
    };

    return (
        <main className="mb-10">
            <header 
                className="w-full h-72 max-lg:h-56 bg-cover bg-center bg-no-repeat"
                style={{
                    'backgroundImage': `url(${resultsBannerImage})`
                }}
            >
                <div className="flex flex-col justify-center items-center w-full h-full bg-black bg-opacity-60 text-center">
                    <h1 className="rounded-bl-3xl max-md:rounded-bl-2xl border-b-8 max-md:border-b-4 border-s-8 max-md:border-s-4 border-solid border-red-600 px-6 py-4 max-lg:px-3 max-lg:py-2 font-f1-bl text-white text-5xl max-sm:text-2xl max-md:text-3xl max-lg:text-4xl">
                        FORMULA 1 Race Results
                    </h1>
                </div>
            </header>

            <div className="flex flex-row max-md:flex-col justify-around max-md:justify-center mt-4">
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
                
                <div className="mx-6 max-md:mx-auto w-[80%]">
                    <section className="mt-4 mb-8 max-md:mt-3">
                        <h2 className="border-b-4 max-md:border-b-2 border-gray-800 mx-10 pb-3 max-md:m-auto max-md:pb-1 max-lg:pb-2 md:ps-2 w-[92%] font-f1-b text-gray-800 text-4xl max-md:text-xl max-lg:text-2xl max-md:text-center">
                            Championship Standings
                        </h2>
                        <p className="mx-10 pt-5 max-md:mx-5 max-md:py-3 text-gray-500 text-sm max-md:text-xs">
                            Switch between Drivers and Constructors to view results for either championship.
                        </p>
                        <div className="mx-10 my-4 pb-2 max-md:mx-auto max-md:my-2 w-[90%] min-w-80 overflow-y-auto no-scrollbar">
                            <div className="flex flex-row justify-start items-center">
                                {championshipResultTabs.map((resultTab) => (
                                    <button
                                        key={resultTab}
                                        className={`rounded-t-sm px-5 py-2 ${championshipResultTab === resultTab ? "bg-slate-100" : "bg-white"} max-md:text-sm hover:bg-slate-100`}
                                        onClick={() => {
                                            handleSwitchChampionshipResultTab(resultTab);
                                        }}
                                    >{resultTab}</button>
                                ))}
                            </div>
                            <div className="rounded-tr-sm rounded-b-sm pt-2 pb-3 px-2 min-h-60 max-md:min-h-40 bg-slate-100 whitespace-nowrap overflow-x-scroll">
                                {displayChampionshipResultTab(championshipResultTab)}
                            </div>
                        </div>
                    </section>

                    <section className="my-8">
                        <h2 className="border-b-4 max-md:border-b-2 border-gray-800 mx-10 pb-3 max-md:m-auto max-md:pb-1 max-lg:pb-2 md:ps-2 w-[92%] font-f1-b text-gray-800 text-4xl max-md:text-xl max-lg:text-2xl max-md:text-center">
                            Race Results
                        </h2>
                        <p className="mx-10 pt-5 max-md:mx-5 max-md:pt-3 text-gray-500 text-sm max-md:text-xs">
                            Select an event to view race results.
                        </p>
                        <EventList season={season} fullSchedule={fullSchedule} />
                    </section>
                </div>
            </div>
        </main>
    );
};

export default Results;