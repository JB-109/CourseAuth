import { atom } from "recoil";

export const user = atom({
    key: "user",
    default: {
        user: "",
        isLoading: true
    }
});