import { Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

function Appbar() {

    const navigate = useNavigate();
    const[user, setuser] = useState();
    () => {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith(`token=`)) {
                return cookie.substring(token.length + 1);
            }
        }
        return null;
    };

    useEffect(() => {
        fetch("http://localhost:3000/me", {
            method: "GET",
            headers: {
                "content-type": "application/json"
            },
            credentials: "include",
        }).then(response => {
            return response.json()
        }).then(data => {
            console.log(data);
            setuser(data.username);
        });
    }, []);

    if(user) {
        return (
            <div style={{
                display: "flex",
                justifyContent: "space-between"
            }}>
                <Typography variant={"h6"} style={{
                    color: "white",
                    marginLeft: 5,
                }}>
                    {user}
                </Typography>

                <button 
                    onClick = {() => {
                        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                        navigate("/Signup");
                    }}>
                        LOG OUT
                    </button>
            </div>
        )
    }

    return (
        <div style={{
            display: "flex",
            justifyContent: "space-between"
        }}>
            

            <Typography variant={"h6"} style={{
                color: "white"
            }}>{user}
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