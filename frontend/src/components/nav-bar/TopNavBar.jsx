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
        <nav className="grid grid-flow-col grid-cols-10 items-center justify-around sticky h-15 w-full bg-red-600 text-lg text-white">
            <div 
                className="flex flex-shrink justify-center col-span-2 ps-20 min-w-40 overflow-x-visible hover:cursor-pointer" 
                onClick={() => handlePageNavigation("/")}
            >
                <p className="font-f1-b text-2xl">FastLane</p>
            </div>
            
            <nav className="flex justify-start items-center col-start-4 col-span-6 h-full px-20 whitespace-nowrap overflow-x-auto">
                {pages.map((page, index) => (
                    <button 
                        key={index}
                        className="flex-auto transition-colors duration-800 hover:bg-gray-900 py-5 px-4"
                        onClick={() => handlePageNavigation(page.path)}
                    >
                        {page.name}
                    </button>
                ))}
            </nav>
        </nav>

        <style>
            {`
            @media (max-width: 640px) {
                nav.grid {
                    grid-template-columns: 1fr;
                    padding-bottom: 1.25rem;
                    position: static;
                }

                div.flex {
                    grid-column: 1 / span 1;
                    font-size: 2rem;
                    padding: 1.5rem;
                }

                nav.flex {
                    grid-column: 1 / span 1;
                    display: grid;
                    grid-auto-flow: row;
                    grid-template-rows: repeat(${pages.length}, 1fr);
                    justify-content: center;
                }

                nav.flex button {
                    padding-top: 0.5rem;
                    padding-bottom: 0.75rem;
                }

                nav.flex button:hover {
                    background-color: transparent;
                    text-decoration-line: underline;
                    text-underline-offset: auto;
                }

            }
            `}
        </style>
        </>
    );
};

export default TopNavBar;