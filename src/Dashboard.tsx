import { Typography } from "@mui/material"
import { currentUser } from "./atoms/user"
import { useRecoilValue } from "recoil";
import React from "react";

function Dashboard() {

    return (
        <div style={{
            backgroundColor: "white",
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

    const loggedInUser = useRecoilValue(currentUser);

    return (
        <div style={{
            backgroundColor: "grey",
            display: "flex",
            justifyContent: "center",
            height: 100,
            padding: 100
        }}>
            <Typography variant="h6">
                Welcome {loggedInUser.user}
            </Typography>
        </div>
    )
}

export default Dashboard;