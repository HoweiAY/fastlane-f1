import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import LoadingSpinner from "../common/LoadingSpinner";

import { isEventActive } from "../../utils/event_utils";

const EventLiveCard = ({fullSchedule}) => {
    const [event, setEvent] = useState(null);

    useEffect(() => {
        if (!fullSchedule) return;

        for (const event of fullSchedule) {
            if (event.round === 0) continue;
            if (isEventActive(event)) {
                setEvent(event);
                break;
            }
        }
    }, [fullSchedule]);

    return (
        fullSchedule ? (
                event ? (
                    <div className="border border-gray-800 rounded-2xl px-4 pb-4 m-6 w-2/4 max-sm:w-10/12 max-md:w-8/12 max-lg:w-3/5 text-white bg-gray-800 bg-opacity-95">
                        <h3 className="px-2 pt-2 pb-1 font-f1-b text-xl max-md:text-lg">
                            Live Event
                        </h3>
                        <div className="border-t-4 border-s-4 border-white rounded-tl-lg p-2 me-2">
                            <h3 className="ps-1 pt-2 pb-1 max-md:pt-0 max-lg:pt-1 font-f1-w text-xl max-md:text-base max-lg:text-lg">
                                ROUND {event.round}
                            </h3>
                            <p className="border-t-2 ps-1 pe-3 pt-1 w-fit text-lg max-md:text-sm max-lg:text-base">
                                {event.eventName}
                            </p>
                            <Link 
                                className="border border-red-600 rounded-lg mx-1 my-3 max-md:mb-1 p-2 text-white max-md:text-sm bg-red-600"
                                to="/live-timing"
                            >
                                Live Timing {">>"}
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col justify-center items-center border border-gray-800 rounded-2xl px-10 py-3 m-6 text-white bg-gray-800 bg-opacity-95">
                        <h3 className="px-4 pt-4 pb-1 font-f1-b text-2xl max-md:text-lg max-lg:text-xl text-center">
                            No live events at the moment
                        </h3>
                        <p className="border-t-2 border-white px-2 py-1 text-base max-lg:text-sm text-center">
                            Live timing will be available when a session starts.
                        </p>
                        <Link 
                            className="border border-red-600 rounded-lg mx-1 mt-4 mb-3 max-md:mt-2 p-2 text-white max-md:text-sm bg-red-600"
                            to="/schedule"
                        >
                            View Schedule {">>"}
                        </Link>
                    </div>
                )
        ) : (
            <div className="flex flex-row justify-center items-center border border-gray-800 rounded-2xl px-4 py-4 m-6 w-2/4 max-sm:w-10/12 max-md:w-8/12 max-lg:w-3/5 bg-gray-800 bg-opacity-95">
                <LoadingSpinner width={"75"} height={"75"} color={"#DC2626"} />
            </div>
        )
    )
};

export default EventLiveCard;