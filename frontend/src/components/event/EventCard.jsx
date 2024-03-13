import { useState, useEffect } from "react";

import { countryCodes } from "../../utils/country_code";

const EventCard = ({event}) => {
    const [countryCode, setCountryCode] = useState("xx");
    
    useEffect(() => {
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
    }, [event]);

    return (
        <div 
            className="col-span-1 min-w-52 max-lg:min-w-48 h-full border shadow-md shadow-gray-300 rounded-lg mx-3 bg-gray-50 hover:scale-105 hover:cursor-pointer transition-all duration-500 z-0"
            onClick={() => {}}
        >
            <h2 className="mx-4 mt-2 font-f1-w text-base whitespace-nowrap overflow-hidden">
                {event.format !== "testing" ? `ROUND ${event.round}` : "TESTING"}
            </h2>
            <h3 className="w-fit border rounded-lg px-3 mx-4 bg-gray-800 text-sm text-white">
                {event.startDate.month.slice(0, 3)} {event.startDate.day} 
                {event.format !== "testing" && ` - ${event.endDate.month.slice(0, 3)} ${event.endDate.day}`}
            </h3>

            <div className="flex flex-row justify-around items-start h-28 border-t-4 border-e-4 border-solid border-gray-800 rounded-tr-lg pt-1 px-2 m-2 overflow-hidden text-ellipsis">
                <h3 className="w-[75%] pe-1 text-xs whitespace-break-spaces">
                    <span className="font-f1-b text-red-600 text-sm">{`${event.country}\n`}</span>
                    {event.eventName}
                </h3>
                <img 
                    className="self-center w-[25%] h-fit border rounded-md"
                    src={`../../../node_modules/flag-icons/flags/4x3/${countryCode}.svg`}
                    alt={`${event.country} national flag`}
                />
            </div>

            <div className="flex justify-center border border-solid rounded-md mx-2 mt-1 mb-2">---</div>
            
        </div>
    )
};

export default EventCard;