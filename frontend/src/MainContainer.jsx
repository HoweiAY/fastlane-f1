import { Outlet } from "react-router-dom";
import TopNavBar from "./nav-bar/TopNavBar";

const MainContainer = () => {
    return (
        <div>
            <TopNavBar />
            <div>
                <Outlet />
            </div>
        </div>
    );
};

export default MainContainer;