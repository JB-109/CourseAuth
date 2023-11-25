import { atom } from "recoil";
import { BASE_URL } from "../config";
import axios from "axios";
import { sCredentials } from "../selectors/sCredentials";


export const userDetails = atom({
    key: "userDetails",
    default: ""
});
