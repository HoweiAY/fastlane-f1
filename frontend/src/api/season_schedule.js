import axios from "axios";

import { baseURL } from "./path";

const api = axios.create({
    baseURL: `${baseURL}`,
});

export const getSchedule = async (year) => {
    try {
        const response = await api.get(`schedule/get_schedule/${year}`);
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