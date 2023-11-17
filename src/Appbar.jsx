import { Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";

function Appbar() {
    const navigate = useNavigate();

    return (
        <div style={{
            display: "flex",
            justifyContent: "space-between"
        }}>
            <Typography variant={"h6"} style={{
                color: "white"
            }}>
                Tunnel
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