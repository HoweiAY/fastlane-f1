import { Outlet, useLocation } from "react-router-dom";
import TopNavBar from "./components/nav-bar/TopNavBar";
import ErrorBoundary from "./components/error/ErrorBoundary";

const MainContainer = () => {
    const location = useLocation();
    return (
        <>
        <TopNavBar />
        <div>
            <ErrorBoundary key={location.pathname}>
                <Outlet />
            </ErrorBoundary>
        </div>
        </>
    );
};

export default MainContainer;