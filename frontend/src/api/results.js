import axios from "axios";

import { baseURL } from "./path";

const api = axios.create({
    baseURL: `${baseURL}`,
});

export const getDriverStandings = async (year) => {
    try {
        const response = await api.get(`results/get_driver_standings/${year}`);
        if (response.status !== 200) {
            throw new Error(response.statusText);
        }
        console.log("Received: ", response.data);
        return response.data;
    }
    catch (error) {
        console.error(`Request failed: ${error.message} (${error.code})`);
        return { "error": true };
    }
};

export const getConstructorStandings = async (year) => {
    try {
        const response = await api.get(`results/get_constructor_standings/${year}`);
        if (response.status !== 200) {
            throw new Error(response.statusText);
        }
        console.log("Received: ", response.data);
        return response.data;
    }
    catch (error) {
        console.error(`Request failed: ${error.message} (${error.code})`);
        return { "error": true };
    }
};

export const getQualifyingResult = async (year, round) => {
    try {
        const response = await api.get(`results/get_qualifying_result/${year}/${round}`);
        if (response.status !== 200) {
            throw new Error(response.statusText);
        }
        console.log("Received: ", response.data);
        return response.data;
    }
    catch (error) {
        console.error(`Request failed: ${error.message} (${error.code})`);
        return { "error": true };
    }
};

export const getRaceResult = async (year, round) => {
    try {
        const response = await api.get(`results/get_race_result/${year}/${round}`);
        if (response.status !== 200) {
            throw new Error(response.statusText);
        }
        console.log("Received: ", response.data);
        return response.data;
    }
    catch (error) {
        console.error(`Request failed: ${error.message} (${error.code})`);
        return { "error": true };
    }
};