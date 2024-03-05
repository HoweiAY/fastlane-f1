import { useNavigate, useLocation } from "react-router-dom";

const TopNavBar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const pages = [
        {name: "Home", path: ""}, 
        {name: "Live Timing", path: ""}, 
        {name: "Schedule", path: ""},
        {name: "Results", path: ""},
        {name: "Drivers", path: ""},
        {name: "Teams", path: ""},
    ];

    return (
        <nav className="grid grid-flow-col grid-cols-7 items-center sticky h-15 w-full bg-red-600 px-40 text-lg text-white font-f1-r">
            <div className="flex col-span-2 justify-start">
                <p className="ms-10">Logo</p>
            </div>

            <div className="flex col-span-5 justify-end space-x-5 h-full">
                {pages.map((page, index) => (
                    <button 
                        key={index}
                        className="transition-colors duration-800 hover:bg-gray-900 p-5"
                        onClick={() => {alert(page.name + " clicked.")}}
                    >
                        {page.name}
                    </button>
                ))}
            </div>
        </nav>
    )
};

export default TopNavBar;