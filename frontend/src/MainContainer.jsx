import { Outlet, useLocation } from "react-router-dom";

import TopNavBar from "./components/nav-bar/TopNavBar";
import Footer from "./components/footer/Footer";
import ErrorBoundary from "./components/error/ErrorBoundary";

const MainContainer = () => {
    const location = useLocation();
    return (
        <>
        <TopNavBar />
        
        <ErrorBoundary key={location.pathname}>
            <div className="flex flex-col min-h-[90vh]">
                <Outlet />
                <Footer />
            </div>
        </ErrorBoundary>
        
        </>
    );
};

export default MainContainer;