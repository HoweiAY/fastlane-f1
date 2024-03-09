import { useNavigate } from "react-router-dom";

const TopNavBar = () => {
    const navigate = useNavigate();

    const pages = [
        {name: "Home", path: "/"}, 
        {name: "Live Timing", path: "/live-timing"}, 
        {name: "Schedule", path: "/schedule"},
        {name: "Results", path: "/results"},
        {name: "Drivers", path: "/drivers"},
        {name: "Teams", path: "/teams"},
    ];

    const handlePageNavigation = (pagePath) => {
        navigate(pagePath);
    };

    return (
        <>
        <nav className="flex flex-row max-lg:flex-col flex-shrink-0 justify-around items-center sticky max-lg:static top-0 h-20 max-lg:h-auto w-full px-10 max-lg:pt-2 bg-red-600 text-lg text-white">
            <div 
                className="flex justify-start max-lg:justify-center items-center w-[30%] min-w-[20%] h-full lg:ps-10 hover:cursor-pointer py-5"
                onClick={() => handlePageNavigation("/")}
            >
                <p className="font-f1-b text-2xl">FastLane</p>
            </div>
            
            <nav className="flex flex-row max-md:flex-col flex-auto justify-center w-[1fr] h-full lg:px-10 max-md:pb-5 lg:mx-10 whitespace-nowrap">
                {pages.map((page, index) => (
                    <button 
                        key={index}
                        className="flex-auto transition-colors duration-800 lg:hover:bg-gray-900 max-lg:hover:underline underline-offset-auto py-5 max-md:py-2 max-lg:pt-2 px-4"
                        onClick={() => handlePageNavigation(page.path)}
                    >
                        {page.name}
                    </button>
                ))}
            </nav>
        </nav>
        </>
    );
};

export default TopNavBar;