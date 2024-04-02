import { useState, useEffect } from "react";

import LoadingSpinner from "../../components/common/LoadingSpinner";
import LoadingDots from "../../components/common/LoadingDots";
import liveTimingBannerImage from "../../assets/images/common/live_timing_banner_1.png";

const LiveTiming = () => {
    return (
        <main className="pb-10 min-h-[90vh] max-md:min-h-[70vh] bg-gray-800 text-white">
            <header 
                className="w-full h-64 max-md:h-48 bg-cover bg-center bg-no-repeat"
                style={{
                    'backgroundImage': `url(${liveTimingBannerImage})`
                }}
            >
                <div className="flex flex-col justify-center items-center w-full h-full bg-gradient-to-t from-gray-800">
                    <h1 className="border-b-8 max-md:border-b-4 border-s-8 max-md:border-s-4 border-red-600 rounded-bl-3xl max-md:rounded-bl-2xl px-6 py-3 max-lg:px-3 max-lg:py-2 font-f1-bl text-5xl max-sm:text-2xl max-md:text-3xl max-lg:text-4xl">
                        Live Timing
                    </h1>
                </div>
            </header>

            <div className="mx-auto pt-14 max-md:pt-10 w-[95%]">
                <h2 className="px-5 pb-2 max-md:pb-1 font-f1-w text-2xl max-md:text-lg max-lg:text-xl">
                    Round 420
                </h2>
                <h2 className="border-t-8 border-s-8 border-red-600 rounded-tl-3xl ps-4 pe-2 py-3 max-md:ps-3 max-md:py-2 text-2xl max-sm:text-base max-md:text-lg max-lg:text-xl whitespace-break-spaces">
                    FORMULA 1 NINTENDO GAMECUBE PLAYSTATION XBOX WHATEVER RAINBOW ROAD GRAND PRIX 2069
                </h2>
                <h2 className="border-b-4 max-md:border-b-2 border-white mt-16 mb-8 pb-3 max-md:mt-10 max-md:pb-1 max-lg:pb-2 ps-2 max-md:ps-1 w-[90%] font-f1-b text-4xl max-md:text-2xl max-lg:text-3xl">
                    Qualifying
                </h2>
            </div>
            
            {/*<div className="flex flex-row justify-center items-center w-full h-[400px] max-md:h-[300px]">
                <LoadingSpinner width={"100"} height={"100"} color={"#FFFFFF"} />
                <LoadingDots width={"100"} height={"100"} color={"#DC2626"} radius={"5"}/>
            </div>*/}
        </main>
    );
};

export default LiveTiming;