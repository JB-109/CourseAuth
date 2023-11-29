import { atom } from "recoil";

interface userInterface {
    user: string | undefined,
    isLoading: boolean 
}

export const user = atom<userInterface>({
    key: "user",
    default: {
        user: "",
        isLoading: true
    }
});