import { useNavigate } from "react-router-dom";

import LoadingSpinner from "../common/LoadingSpinner";

import { countryCodes } from "../../utils/country_code";

const EventList = ({season, fullSchedule}) => {
    const navigate = useNavigate();

    const handleSelectEvent = (event) => {
        const round = event.round;
        const location = event.location.replace(/ /g, '_');
        navigate(`/results/${season}/${round}/${location}`);
    };

    return (
        fullSchedule ? (
            <ol className="mx-10 mt-8 max-md:mx-auto max-md:mt-2 w-[85%] min-w-80">
                {fullSchedule.map((event) => {
                    let countryCode = "xx";
                    switch (event.country) {
                        case "Abu Dhabi":
                            countryCode = "ae";
                        break;
                        case "Great Britain":
                            countryCode = "gb";
                            break;
                        case "Russia":
                            countryCode = "ru";
                            break;
                        default: countryCode = countryCodes[event.country]?.toLowerCase();
                    }

                    return event.round > 0 && (
                        <li 
                            key={event.round}
                            className="flex flex-row max-md:flex-col justify-between items-center max-md:items-start max-md:justify-around border shadow-md shadow-gray-300 rounded-lg bg-gray-50 my-4 h-20 max-md:h-16 hover:scale-105 hover:cursor-pointer transition-transform duration-500 z-0"
                            onClick={() => {handleSelectEvent(event)}}
                        >
                            <div className="ms-2 max-md:px-2 px-4 max-md:mt-2 w-[70%] max-md:w-[95%] text-lg max-md:text-xs">
                                <h3 className="whitespace-nowrap text-ellipsis overflow-hidden">
                                    <span className="border-e-2 border-red-600 pe-3 me-3 font-f1-w">{event.round}</span>
                                    <span className={`px-2 fi fi-${countryCode}`}></span>
                                    <span className="ms-3 text-base max-lg:text-sm max-md:text-xs">{event.eventName}</span>
                                </h3>
                            </div>
                            <div className="max-md:border-t-2 max-md:border-s-2 max-md:border-red-600 rounded-tl-md md:flex md:flex-row md:justify-end mx-2 ps-1 pe-3 max-md:mb-1 w-[95%] md:text-end">
                                <h3 className="md:border-t-2 md:border-e-2 md:rounded-tr-md md:border-red-600 me-2 px-2 max-md:pt-1 max-md:ps-1 w-fit font-f1-bl max-lg:text-sm max-md:text-xs whitespace-break-spaces">
                                    {event.startDate.month.slice(0, 3)} {event.startDate.day} 
                                    {event.format !== "testing" && ` - ${event.endDate.month.slice(0, 3)} ${event.endDate.day}`}
                                </h3>
                            </div>
                        </li>
                    )
                })}
            </ol>
        ) : (
            <div className="flex flex-row justify-center items-center w-auto h-60 max-md:h-40">
                <LoadingSpinner width={"100"} height={"100"} color={"#DC2626"}/>
            </div>
        )
    )
};

export default EventList;