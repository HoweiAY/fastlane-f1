import { Outlet, useLocation } from "react-router-dom";

import TopNavBar from "./components/nav-bar/TopNavBar";
import Footer from "./components/footer/Footer";
import ErrorBoundary from "./components/error/ErrorBoundary";

const MainContainer = () => {
    const location = useLocation();
    return (
        <>
        <TopNavBar />
        <div>
            <ErrorBoundary key={location.pathname}>
                <Outlet />
                <Footer />
            </ErrorBoundary>
        </div>
        </>
    );
};

export default MainContainer;