import axios from "axios";

import { baseURL } from "./path";

const api = axios.create({
    baseURL: `${baseURL}`,
});

export const getLiveDriverData = async (sessionType) => {
    try {
        const response = await api.get(`live_timing/get_live_driver_data/${sessionType}`);
        if (response.status !== 200) {
            throw new Error(response.statusText);
        }
        console.log("Received: ", response.data)
        return response.data;
    } catch (error) {
        console.error(`Request failed: ${error.message} (${error.code})`);
        return { "error": true };
    }
};

export const getLiveFlag = async (session) => {
    try {
        const response = await api.get(`live_timing/get_live_flag/${session}`);
        if (response.status !== 200) {
            throw new Error(response.statusText);
        }
        console.log("Received: ", response.data)
        return response.data;
    } catch (error) {
        console.error(`Request failed: ${error.message} (${error.code})`);
        return { "error": true };
    }
};

export const getLiveSafetyCar = async () => {
    try {
        const response = await api.get("live_timing/get_live_safety_car");
        if (response.status !== 200) {
            throw new Error(response.statusText);
        }
        console.log("Received: ", response.data)
        return response.data;
    } catch (error) {
        console.error(`Request failed: ${error.message} (${error.code})`);
        return { "error": true };
    }
};