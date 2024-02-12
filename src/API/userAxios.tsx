import axios from "axios";
import { BASE_URL } from "../../server/config";
import { useRecoilState } from "recoil";
import { currentUser } from "../atoms/user";


export function usefetchUser() {
    const [user, setuser] = useRecoilState(currentUser);

        const fetchData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/admin/me`, {
                    withCredentials: true
                });

                setuser((ex) => ({
                    ...ex,
                    user: response.data.username
                }));
            } catch (err) {
                console.error((err as Error).message);
            } finally {
                setuser((ex) => ({
                    ...ex,
                    isLoading: false
                }));
            }
        };

    return fetchData;
}
