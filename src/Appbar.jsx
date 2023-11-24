import { Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";


function Appbar() {

    const navigate = useNavigate();
    const [user, setuser] = useState();
    const [isLoading, setisLoading] = useState(true);


    useEffect(() => {
        const fetchData = async () => {
        try {
            console.log("1")
            const response = await axios.get("http://localhost:3000/admin/me", {
                withCredentials: true,
            })
            console.log(user + " before");
            setuser(response.data.username);
        } catch {
            console.error(error.message + " hi error");
        } finally {
            console.log("2");
            setisLoading(false);
        }
    }  
    fetchData();
    }, []);


    if (isLoading) {
        console.log(isLoading);
        return null;
    } else {
        console.log(isLoading);
        console.log(user);
        if(user) {
            console.log("hi user");
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
                        window.location = "/signin"
                    }}>
                        LOG OUT
                    </button>
            </div>
        )
        } else {
            console.log("hii signup")
        return (
        <div style={{
            display: "flex",
            justifyContent: "flex-end"
        }}>
                <button 
                    onClick = {() => {navigate("/Signup");}} 
                    style={{marginRight: "4px"}}> Sign Up
                </button>
                <button 
                    onClick = {() => {navigate("/Signin");}}
                    style = {{marginRight: "4px"}}> Sign In
                </button>
        </div>
    )
}
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

     // useEffect(() => {
    //     try {
    //     const fetchData = async () => {
    //         const response = await axios.get("http://localhost:3000/admin/me", {
    //             withCredentials: true,
    //         })
    //         setuser(response.data.username);
    //     }
    //         fetchData();
    //     } catch (error) {
    //         console.error(error.message);
    //     } finally {
    //         setisLoading(false);
    //     }

    // }, []);