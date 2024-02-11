import axios from "axios";
import { BASE_URL } from "../../server/config";
import { useRecoilState } from "recoil";
import { currentUser } from "../atoms/user";

export async function fetchUser() {

    const [user, setuser] = useRecoilState(currentUser);

    try  {
    await axios.get(`${BASE_URL}/admin/me`, {
        withCredentials: true
    }).then(response => {
        setuser((ex) => { return {
            ...ex,
            user: response.data.username
        }});
    });
    } catch (err) {
        console.error((err as Error).message);
    } finally {
        setuser((ex) => { return {
            ...ex,
            isLoading: false
        }});
    }
}   