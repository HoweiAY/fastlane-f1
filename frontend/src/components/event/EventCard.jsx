import { useState, useEffect } from "react";

import { countryCodes } from "../../utils/country_code";

const EventCard = ({event}) => {

    const fakeData = {
        "country": "Japan",
        "endDate": {
          "day": 7,
          "hour": 5,
          "minute": 0,
          "month": "April",
          "timeFormatted": "2024-04-07T05:00:00"
        },
        "eventName": "FORMULA 1 MSC CRUISES JAPANESE GRAND PRIX 2024",
        "format": "conventional",
        "round": 4,
        "startDate": {
          "day": 5,
          "hour": 2,
          "minute": 30,
          "month": "April",
          "timeFormatted": "2024-04-05T02:30:00"
        }
      };

    const [countryCode, setCountryCode] = useState(countryCodes[event.country]?.toLowerCase());
    
    useEffect(() => {
        switch (event.country) {
            case "Abu Dhabi":
                setCountryCode("ae");
                break;
            case "Great Britain":
                setCountryCode("gb");
                break;
            default: break;
        }
    }, []);

    return (
        <div 
            className="col-span-1 h-full shadow-md shadow-gray-300 rounded-lg mx-3 hover:scale-105 hover:cursor-pointer transition-all duration-500 z-0"
            onClick={() => {}}
        >
            <h2 className="mx-4 font-f1-w text-lg max-lg:text-base">{event.format !== "testing" ? `ROUND ${event.round}` : "TESTING"}</h2>
            <h3 className="mx-4 max-lg:text-sm text-gray-600">
                {event.startDate.month.slice(0, 3)} {event.startDate.day} 
                {event.format !== "testing" && ` - ${event.endDate.month.slice(0, 3)} ${event.endDate.day}`}
            </h3>
            <div className="flex flex-row justify-around items-start h-32 border-t-4 border-e-4 border-solid border-gray-800 rounded-tr-lg pt-1 px-2 m-2 overflow-hidden">
                <h3 className="w-[75%] text-sm whitespace-break-spaces text-ellipsis">
                    <span className="font-f1-b">{`${event.country}\n`}</span>
                    {event.eventName}
                </h3>
                <img className="self-center w-[25%] h-fit border rounded-md" src={`../../../node_modules/flag-icons/flags/4x3/${countryCode}.svg`} alt={`${event.country} flag`}/>
            </div>
            <div className="flex justify-center border border-solid rounded-md mx-2 mt-1 mb-2">---</div>
            
        </div>
    )
};

export default EventCard;