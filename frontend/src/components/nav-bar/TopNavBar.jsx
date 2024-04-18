import { Link } from "react-router-dom";

const TopNavBar = () => {
    const pages = [
        {name: "Home", path: "/"}, 
        {name: "Live Timing", path: "/live-timing"}, 
        {name: "Schedule", path: "/schedule"},
        {name: "Results", path: "/results"},
        {name: "Drivers", path: "/drivers"},
        {name: "Teams", path: "/teams"},
    ];

    return (
        <nav className="flex flex-row max-lg:flex-col flex-shrink-0 justify-around items-center sticky max-md:static top-0 min-h-[10vh] max-lg:h-auto w-full px-10 max-lg:pt-2 max-lg:divide-y-2 bg-red-600 text-xl text-white z-10">
            <div className="flex justify-start max-lg:justify-center items-center w-[30%] min-w-[20%] h-full lg:ps-10 py-5">
                <h1 className="font-f1-b text-2xl">FastLane</h1>
            </div>
            
            <nav className="flex flex-row max-md:flex-col flex-auto justify-center md:w-full max-md:w-[1fr] h-full lg:px-10 lg:mx-10 max-lg:px-5 max-md:pb-5 whitespace-nowrap">
                {pages.map((page, index) => (
                    <Link 
                        key={index}
                        className="flex-auto md:hover:bg-gray-900 max-md:hover:underline underline-offset-auto px-4 py-7 max-md:py-2 max-lg:py-5 max-lg:text-base text-center transition-colors duration-800"
                        to={page.path}
    
                    >
                        {page.name}
                    </Link>
                ))}
            </nav>
        </nav>
    );
};

export default TopNavBar;