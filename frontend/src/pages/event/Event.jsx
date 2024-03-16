import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

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

const SessionItem = ({session, sessionName}) => {
  return (
      <li 
      key={`${sessionName}`}
      className="flex flex-row justify-start items-center rounded-md p-4 my-1 bg-gray-50"
      >
          <div className="w-52 max-md:w-36 border-e-2 border-red-600 pe-4 me-8">
              <h3 className=" font-f1-b text-2xl max-md:text-base">
                  {session.month} {session.day}
              </h3>
              <h3 className="text-base max-md:text-sm">{sessionName}</h3>
          </div>
          <div className="text-base max-md:text-sm">
              <h3>
                  {session.hour}:{session.minute === 0 ? "00" : session.minute} 
                  {sessionName !== "Race" && ` - ${session.hour + 1}:${session.minute === 0 ? "00" : session.minute}`}
              </h3>
          </div>
      </li>
  )
};

const Event = () => {
    const { season, round } = useParams();

    const [event, setEvent] = useState(null);
    const [eventBannerSrc, setEventBannerSrc] = useState("");

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
        getEventBanner(event?.location);
    }, [event]);

    return ( 
        event ? 
        <main className="mb-10">
            <header 
                className="w-full h-96 bg-cover bg-center bg-no-repeat"
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
                    <ul className="border-t-[15px] border-e-[15px] rounded-tr-3xl border-red-600 w-[70%] max-lg:w-full min-w-[480px] max-md:min-w-[300px] pe-10 pt-6 me-10">
                        {event.sessions.testing && <SessionItem session={event.sessions.testing} sessionName={"Testing"} />}
                        
                        {event.sessions.practice1 && <SessionItem session={event.sessions.practice1} sessionName={"Practice 1"} />}
                        {event.sessions.qualifying && event.format === "sprint" && <SessionItem session={event.sessions.qualifying} sessionName={"Qualifying"} />}
                        {event.sessions.practice2 && <SessionItem session={event.sessions.practice2} sessionName={"Practice 2"} />}
                        {event.sessions.practice3 && <SessionItem session={event.sessions.practice3} sessionName={"Practice 3"} />}

                        {event.sessions.qualifying 
                            && event.format !== "sprint" 
                            && season <= 2023 
                            && <SessionItem session={event.sessions.qualifying} sessionName={"Qualifying"} />
                        }

                        {event.sessions.sprintShootout && <SessionItem session={event.sessions.sprintShootout} sessionName={"Sprint Shootout"} />}
                        {event.sessions.sprint && <SessionItem session={event.sessions.sprint} sessionName={"Sprint"} />}
                        
                        {event.sessions.qualifying 
                            && event.format !== "sprint" 
                            && season > 2023 
                            && <SessionItem session={event.sessions.qualifying} sessionName={"Qualifying"} />
                        }

                        {event.sessions.race && <SessionItem session={event.sessions.race} sessionName={"Race"} />}
                        <p className="pt-2 pb-4 me-20 max-md:me-10 text-xs text-gray-500">* All event dates are in UTC standard time (UTC+00:00).</p>
                    </ul>
                    <div className=" max-lg:hidden mt-6 mx-16"></div>
                </section>
            </div>

            <div className="lg:hidden"></div>
        </main> 
        : 
        <div className="text-center text-6xl">Loading</div>
    )
};

export default Event;