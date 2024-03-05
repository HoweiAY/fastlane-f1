import { Outlet } from "react-router-dom";
import TopNavBar from "./navBar/TopNavBar";

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