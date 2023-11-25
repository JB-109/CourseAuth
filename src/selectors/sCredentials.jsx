import { selector } from "recoil";
import axios from "axios";
import { BASE_URL } from "../config.js"

export const sCredentials = selector({
    key: "sCredentials",
    get: async () => {
        try {
        const response = await axios.get(`${BASE_URL}/admin/me`, {
            withCredentials: "include"
        });
        return response.data.username;
    } catch (error) {
        console.error(error.message);
    }
    }
});