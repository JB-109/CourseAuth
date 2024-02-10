import { atom } from "recoil";
import { userInterface } from "../Interface/currentUser";

export const currentUser = atom<userInterface>({
    key: "currentUser",
    default: {
        user: "",
        isLoading: true
    }
});