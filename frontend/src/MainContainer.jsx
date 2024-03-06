import { Outlet } from "react-router-dom";
import TopNavBar from "./components/nav-bar/TopNavBar";

const MainContainer = () => {
    return (
        <>
        <TopNavBar />
        <div>
            <Outlet />
        </div>
        </>
    );
};

export default MainContainer;