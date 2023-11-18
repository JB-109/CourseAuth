import { Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

function Appbar() {

    const navigate = useNavigate();
    const[user, setuser] = useState();


    return (
        <div style={{
            display: "flex",
            justifyContent: "space-between"
        }}>
            

            <Typography variant={"h6"} style={{
                color: "white"
            }}>
                {user}
            </Typography>
            <div>
                <button 
                    onClick = {() => {navigate("/Signup");}} 
                    style={{marginRight: "4px"}}> Sign Up
                </button>
                <button 
                    onClick = {() => {navigate("/Signin");}}
                    >Sign In
                </button>
            </div>
        </div>
    )
}

export default Appbar;