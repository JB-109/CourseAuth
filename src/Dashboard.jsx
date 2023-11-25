import { Typography } from "@mui/material"
import { user } from "./atoms/user"
import { useRecoilValue } from "recoil";

function Dashboard() {

    return (
        <div style={{
            backgroundColorcolor: "#032d5e",
            height: "100vh",
            width: "100vw",
            margin: 0,
            padding: 0
        }}>
            <GreyTopper/>
        </div>
    )
}

function GreyTopper() {

    const loggedInUser = useRecoilValue(user);

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            height: 90
        }}>
            <Typography variant="h6">
                Welcome {loggedInUser.user}
            </Typography>
        </div>
    )
}

export default Dashboard;