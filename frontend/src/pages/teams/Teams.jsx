import { useEffect } from "react";

import UnfinishedPage from "../error/UnfinishedPage";

const Teams = () => {
    useEffect(() => {
        document.title = "Teams - FastLane";
    }, [])

    return (
        <UnfinishedPage />
    );
};

export default Teams;