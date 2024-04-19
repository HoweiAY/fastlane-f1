import axios from "axios";

import { baseURL } from "./path";

const api = axios.create({
    baseURL: `${baseURL}`,
});

export const getEventInfo = async (year, round, includeCircuitInfo = true) => {
    try {
        const response = await api.get(`event/get_event_info/${year}/${round}?includeCircuitInfo=${includeCircuitInfo}`);
        if (response.status !== 200) {
            throw new Error(response.statusText);
        }
        console.log("Received: ", response.data)
        return response.data;
    } catch (error) {
        console.error(`Request failed: ${error.message} (${error.code})`);
        return { "error": true };
    }
}