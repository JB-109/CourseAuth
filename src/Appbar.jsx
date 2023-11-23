import { Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";

function Appbar() {

    const navigate = useNavigate();
    const [user, setuser] = useState();
    const [isLoading, setisLoading] = useState(true);


    useEffect(() => {
        try {
        const fetchData = async () => {
            const response = await axios.get("http://localhost:3000/admin/me", {
                withCredentials: true,
            })
            setuser(response.data.username);
        }
            fetchData();
        } catch (error) {
            console.error(error.message);
        } finally {
            setisLoading(false);
        }

    }, []);

    if (isLoading) {
        return null;
    }
        {
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
                        window.location.reload();
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
}

export default Appbar;

// FOR PARSING THE COOKIE 
// () => {
    //     const cookies = document.cookie.split(';');
    //     for (let i = 0; i < cookies.length; i++) {
    //         const cookie = cookies[i].trim();
    //         if (cookie.startsWith(`token=`)) {
    //             return cookie.substring("token".length + 1);
    //         }
    //     }
    //     return null;
    // };