import { useEffect } from "react";

import UnfinishedPage from "../error/UnfinishedPage";

const Drivers = () => {
    useEffect(() => {
        document.title = "Drivers - FastLane";
    }, [])

    return (
        <UnfinishedPage />
    );
};

export default Drivers;