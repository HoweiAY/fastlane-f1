import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import SessionSchedule from "../../components/event/SessionSchedule";
import CircuitInfo from "../../components/circuit/CircuitInfo";

import { getEventInfo } from "../../api/gp_event";


const sampleData = {
    "circuitInfo": {
      "Location": {
        "country": "Saudi Arabia",
        "lat": 21.6319,
        "locality": "Jeddah",
        "long": 39.1044
      },
      "circuitId": "jeddah",
      "circuitName": "Jeddah Corniche Circuit",
      "url": "http://en.wikipedia.org/wiki/Jeddah_Street_Circuit"
    },
    "country": "Saudi Arabia",
    "error": false,
    "eventName": "FORMULA 1 STC SAUDI ARABIAN GRAND PRIX 2024",
    "format": "conventional",
    "location": "Jeddah",
    "sessions": {
      "practice1": {
        "day": 7,
        "hour": 13,
        "minute": 30,
        "month": "March",
        "timeFormatted": "2024-03-07T13:30:00"
      },
      "practice2": {
        "day": 7,
        "hour": 17,
        "minute": 0,
        "month": "March",
        "timeFormatted": "2024-03-07T17:00:00"
      },
      "practice3": {
        "day": 8,
        "hour": 13,
        "minute": 30,
        "month": "March",
        "timeFormatted": "2024-03-08T13:30:00"
      },
      "qualifying": {
        "day": 8,
        "hour": 17,
        "minute": 0,
        "month": "March",
        "timeFormatted": "2024-03-08T17:00:00"
      },
      "race": {
        "day": 9,
        "hour": 17,
        "minute": 0,
        "month": "March",
        "timeFormatted": "2024-03-09T17:00:00"
      },
      "sprint": null,
      "sprintShootout": null,
      "testing": null
    }
  }

const Event = () => {
    const { season, round } = useParams();

    const [event, setEvent] = useState(null);
    const [eventBannerSrc, setEventBannerSrc] = useState("");
    const [circuitImgSrc, setCircuitImgSrc] = useState("");

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
        const getEventBanner = async (eventLocation) => {
            const path = `../../assets/images/events/${eventLocation?.replace(/ /g, '_').toLowerCase()}.png`;
            try {
                const module = await import(/* @vite-ignore */path);
                setEventBannerSrc(module.default);
            } catch (error) {
                console.error("Error loading image");
                setEventBannerSrc("");
            }
        };
        const getCircuitImg = async (circuitName) => {
            const path = `../../assets/images/circuits/${circuitName?.replace(/ /g, '_').toLowerCase()}_detail.png`;
            try {
                const module = await import(/* @vite-ignore */path);
                setCircuitImgSrc(module.default);
            } catch (error) {
                console.error("Error loading image");
                setCircuitImgSrc("");
            }
        };
        getEventBanner(event?.location);
        getCircuitImg(event?.location);
    }, [event]);

    return ( 
        event ? 
        <main className="lg:mb-10">
            <header 
                className="w-full h-96 max-md:h-80 bg-cover bg-center bg-no-repeat"
                style={{
                    'backgroundImage': `url(${eventBannerSrc})`
                }}
            >
                <div className="flex flex-col justify-center items-center w-full h-full bg-black bg-opacity-50 text-center">
                    <h1 className="mx-40 max-lg:mx-32 max-md:mx-20 mb-2 font-f1-b text-white text-6xl max-lg:text-4xl">{event.country}</h1>
                    <h1 className="p-2 mx-32 max-lg:mx-20 border-t-4 border-white text-white text-2xl max-lg:text-xl max-md:text-base whitespace-break-spaces">
                        {event.eventName}
                    </h1>
                    <h3 className="w-fit rounded-lg px-2 py-1 max-lg:px-3 mt-2 bg-gray-800 text-base max-lg:text-sm text-white">
                        {event.sessions.testing && `${event.sessions.testing.month} ${event.sessions.testing.day}`}
                        {event.format !== "testing" 
                            && `${event.sessions.practice1.month} ${event.sessions.practice1.day} - ${event.sessions.race.month} ${event.sessions.race.day}`
                        }
                    </h3>
                </div>
            </header>
            
            <div className="flex flex-col justify-center items-around w-full">
                <header className="mx-[10%] mt-5 max-md:mx-10">
                    <h1 className="mt-4 font-f1-bl text-5xl max-md:text-4xl text-start">
                        {event.format === "conventional" ? "RACE WEEKEND " : event.format === "testing" ? "TESTING" : "SPRINT WEEKEND"}
                    </h1>
                    <h2 className="md:mt-2 text-2xl max-md:text-lg">Event schedule</h2>
                </header>

                <section className="flex flex-row max-lg:flex-col justify-start items-start mx-[10%] my-4 max-md:mx-10">
                    <ul className="border-t-[15px] border-e-[15px] rounded-tr-3xl border-red-600 w-[100vw] max-lg:w-full min-w-[340px] max-md:min-w-[300px] pe-10 pt-6 me-10">
                        {event.sessions.testing && <SessionSchedule session={event.sessions.testing} sessionName={"Testing"} />}
                        
                        {event.sessions.practice1 && <SessionSchedule session={event.sessions.practice1} sessionName={"Practice 1"} />}
                        {event.sessions.qualifying && event.format === "sprint" && <SessionSchedule session={event.sessions.qualifying} sessionName={"Qualifying"} />}
                        {event.sessions.practice2 && <SessionSchedule session={event.sessions.practice2} sessionName={"Practice 2"} />}
                        {event.sessions.practice3 && <SessionSchedule session={event.sessions.practice3} sessionName={"Practice 3"} />}

                        {event.sessions.qualifying 
                            && event.format !== "sprint" 
                            && season <= 2023 
                            && <SessionSchedule session={event.sessions.qualifying} sessionName={"Qualifying"} />
                        }

                        {event.sessions.sprintShootout && <SessionSchedule session={event.sessions.sprintShootout} sessionName={"Sprint Shootout"} />}
                        {event.sessions.sprint && <SessionSchedule session={event.sessions.sprint} sessionName={"Sprint"} />}
                        
                        {event.sessions.qualifying 
                            && event.format !== "sprint" 
                            && season > 2023 
                            && <SessionSchedule session={event.sessions.qualifying} sessionName={"Qualifying"} />
                        }

                        {event.sessions.race && <SessionSchedule session={event.sessions.race} sessionName={"Race"} />}
                        <p className="pt-2 pb-4 me-20 max-md:me-10 text-xs text-gray-500">* All event dates are in UTC standard time (UTC+00:00).</p>
                    </ul>
                    <div className="max-lg:hidden flex w-full ms-8 me-2">
                        <CircuitInfo circuitInfo={event.circuitInfo} circuitImgSrc={circuitImgSrc} />
                    </div>
                </section>
            </div>

            <div className="lg:hidden flex flex-row justify-center items-center px-5 pb-5 bg-gray-100">
                <CircuitInfo circuitInfo={event.circuitInfo} circuitImgSrc={circuitImgSrc} />
            </div>
        </main> 
        : 
        <div className="text-center text-6xl">Loading</div>
    )
};

export default Event;